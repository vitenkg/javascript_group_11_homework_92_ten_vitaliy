import React, {useEffect, useRef, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from "react-redux";
import DisplayMessages from "../../components/DisplayMessages/DisplayMessages";
import InputMessage from "../../components/InputMessage/InputMessage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
}));

const Chat = () => {
    const ws = useRef(null);
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [activeUsers, setActiveUsers] = useState('');
    const users = useSelector(state => state.users.user);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8000/chat?token=' + users.token);

        ws.current.onmessage = event => {
            const decode = JSON.parse(event.data);

            if (decode.type === 'NEW_MESSAGE') {
                setMessages(prev => [
                    ...prev,
                    decode.message]);
                console.log('NEW MESSAGE');
                setActiveUsers(decode.activeUsers.map(user => {
                    console.log(user.username);
                    return user.username;
                }));
            }

            if (decode.type === 'CONNECTED') {
                setMessages(decode.messages);
                setActiveUsers(decode.activeUsers.map(user => {
                    return user.username;
                }));
                console.log('CONNECTED');
            }

            if (decode.type === 'DISCONNECTED') {
                console.log('Disconnected');
                setActiveUsers(decode.activeUsers.map(user => {
                    return user.username;
                }));
            }

            if (decode.type === 'UPDATE_USERS') {
                console.log('UPDATE_USERS');
                setActiveUsers(decode.activeUsers.map(user => {
                    return user.username;
                }));
            }

        };

        ws.current.onclose = function(event) {
            if (event.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
                    console.log('потеря соединения');
            }
        };

    }, []);

    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                {activeUsers && activeUsers.map((text, index) => (
                    <ListItem button key={index}>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </div>
    );

    const inputSubmitForm = async (e) => {
        e.preventDefault();
        ws.current.send(JSON.stringify({
            type: 'CREATE_MESSAGE',
            message,
        }));
        setMessage('');
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </nav>
            <main className={classes.content}>
                <DisplayMessages
                    messages={messages}
                    user={users}
                />
                <InputMessage
                    onSubmitForm={(e) => inputSubmitForm(e)}
                    newMessage={message}
                    onChangeInput={e => setMessage(e.target.value)}
                />
            </main>
        </div>
    );
};


export default Chat;