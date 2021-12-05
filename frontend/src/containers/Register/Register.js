import React, {useState} from 'react';
import {Avatar, Button, Container, Grid, Link, makeStyles, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {registerUser} from "../../store/Actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.registerError);

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setUser(prevState => ({...prevState, [name]: value}));
  };

  const submitFormHandler = e => {
    e.preventDefault();
    dispatch(registerUser({...user}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  return (
    <Container component="section" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h6">
          Sign up
        </Typography>
        <Grid
          component="form"
          container
          className={classes.form}
          onSubmit={submitFormHandler}
          spacing={2}
        >
          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              label="Username"
              name="username"
              value={user.username}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('username'))}
              helperText={getFieldError('username')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              name="password"
              value={user.password}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('password'))}
              helperText={getFieldError('password')}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
            </Button>
          </Grid>

          <Grid item container justifyContent="flex-end">
            <Link component={RouterLink} variant="body2" to="/login">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Register;