const express = require('express');
const users = require('./app/users');
const mongoose = require("mongoose");
const cors = require('cors');
const {nanoid} = require('nanoid');
const exitHook = require('async-exit-hook');
const dayjs = require("dayjs");
const Chat = require('./models/Chat');
const config = require("./config");
const User = require("./models/User");
const app = express();

require('express-ws')(app);

const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/users', users);

const activeConnections = {};
let activeUsers = [];

app.ws('/chat', async (ws, req) => {
  const user = await User.findOne(req.query);
  let username = user.username;

  const id = nanoid();

  activeConnections[id] = ws;
  activeUsers.push({
    username,
    connectionId: id,
  }, );

  console.log('client connected id=' + id);

  activeUsers.sort((a, b) => {
    const nameA = a.username.toLowerCase();
    const nameB = b.username.toLowerCase();

    if (nameA < nameB) return -1

    if (nameA > nameB) return 1

    return 0
  });

  console.log(activeUsers);
  const messages = await Chat.find().sort({datetime: 1}).limit(30).populate('user', 'username');

  ws.send(JSON.stringify({
    type: 'CONNECTED',
    messages,
    activeUsers,
  }));

  ws.on('message', async msg => {
    const decoded = JSON.parse(msg);

    switch (decoded.type) {
      case 'CREATE_MESSAGE':
        const date = dayjs (new Date());

        const createMessage = {
          message: decoded.message,
          user: user._id,
          datetime: date,
        };

        const message = new Chat(createMessage);
        try {
          await message.save();
          console.log('was saved');
        } catch (e) {
          console.log(e);
        }

        const newMessage = await Chat.findOne({datetime: date}).populate('user', 'username');

        Object.keys(activeConnections).forEach(key => {
          const connection = activeConnections[key];
          console.log(key, connection);
          connection.send(JSON.stringify({
            type: 'NEW_MESSAGE',
            message: newMessage,
            activeUsers,
          }));
        });
        break;
      default:
        console.log('Unknown Type: ', decoded.type);
        break;
    }
  });

  ws.on('close', () => {
    delete activeConnections[id];
    activeUsers = activeUsers.filter(user => user.username !== username);
    console.log('Client was disconnected id = ' + id);
    console.log('Users: ', activeUsers);
  });

});

const run = async () => {
  await mongoose.connect(config.db.url);

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });

  exitHook(() => {
    console.log('Mongo Exiting...');
    mongoose.disconnect();
  });
};

run().catch(e => console.error(e));