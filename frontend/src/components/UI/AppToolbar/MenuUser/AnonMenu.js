import React from 'react';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const AnonMenu = () => {
    return (
        <>
            <Button component={Link} to="/register" color="inherit">Sign Up</Button>
            <Button component={Link} to="/" color="inherit">Sign In</Button>
        </>
    );
};

export default AnonMenu;