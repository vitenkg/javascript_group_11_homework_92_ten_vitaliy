import React from 'react';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <Button component={Link} to="/chat">Chat</Button>
        </div>
    );
};

export default MainPage;