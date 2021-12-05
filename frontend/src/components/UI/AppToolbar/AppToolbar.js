import React from 'react';
import {AppBar, Grid, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import UserMenu from "./MenuUser/UserMenu";
import AnonMenu from "./MenuUser/AnonMenu";

const useStyles = makeStyles(theme => ({
  mainLink: {
    color: "inherit",
    textDecoration: 'none',
    '$:hover': {
      color: 'inherit'
    }
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const AppToolbar = () => {
  const classes = useStyles();
  const user = useSelector(state => state.users.user)
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              <Link to="/chat" className={classes.mainLink}>Chat</Link>
            </Typography>
            <Grid>
              {
                user ? <UserMenu user={user}/> : <AnonMenu/>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;