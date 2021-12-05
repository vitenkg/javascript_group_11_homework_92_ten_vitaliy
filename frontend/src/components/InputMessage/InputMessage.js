import React from 'react';
import './InputMessage.css';
import FormElement from "../Form/FormElement";

const InputMessage = ({newMessage, onChangeInput, onSubmitForm}) => {

    return (
        <div className="WriteMessage">
            <form onSubmit={onSubmitForm}>
                <fieldset>
                    <legend>Отправить Сообщение</legend>
                    <FormElement
                        id="InputPost"
                        type="text"
                        value={newMessage}
                        onChange={onChangeInput}
                        required
                    />
                    <button type="submit">Отправить</button>
                </fieldset>
            </form>
        </div>
    );
};

export default React.memo(InputMessage);