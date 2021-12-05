import './DisplayMessages.css';
import dayjs from "dayjs";
import React, {useEffect, useRef} from "react";

const DisplayMessages = ({messages, user}) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    return (
        <div className="ContainerMessages">
            <div className="Message">
                {messages.map(mess => {
                    if (mess.user._id === user._id) {
                        return (
                            <fieldset
                                key={mess._id}
                                className={['MessField Owner', mess.id].join(' ')}
                            >
                                <legend>{mess.username}</legend>
                                <p className="Mess">{mess.message}</p>
                                <p className="Time">{dayjs(mess.datetime).format('DD-MMM HH:mm')}</p>
                            </fieldset>
                        )
                    } else {
                        return (
                            <fieldset
                                key={mess._id}
                                className={['MessField Foreign', mess._id].join(' ')}
                            >
                                <legend>{mess.user.username}</legend>
                                <p className="Mess">{mess.message}</p>
                                <p className="Time">{dayjs(mess.datetime).format('DD-MMM HH:mm')}</p>
                            </fieldset>
                        )
                    }
                }

                )}
            </div>
            <div ref={messagesEndRef} />
        </div>
    );
};
export default DisplayMessages;
