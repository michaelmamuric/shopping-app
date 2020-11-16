import React, { useState } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import * as actions from '../../store/actions/index';
import classes from './Login.module.css';

const Login = (props) => {

    // Destructure for easier referencing
    const { isAuthenticated, hasCheckedOut, loginUser, isLoading } = props;

    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handler when user clicks login
    const loginHandler = (event) => {
        event.preventDefault();
        loginUser(email, password);
    }

    // Alert Message
    let alert = null;

    // Display alert message if user has checked out, and has not authenticated yet
    if(hasCheckedOut && !isAuthenticated) {
        alert= (
            <React.Fragment>
                <Alert className={classes.ErrorMsg} severity="error">
                    In order to complete your shopping, please log in with your e-mail address
                    and password.
                </Alert>
                <br />
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
        {alert}
        <Card className={classes.LoginCard}>
            <form onSubmit={loginHandler}>
            <Grid container className={classes.FormGrid} spacing={1}>
                <Grid className={classes.FormGridElement} item xs={12}>
                    <TextField variant="outlined"
                        label="E-mail Address"
                        type="email"
                        size="small"
                        value={email}
                        InputProps={{
                            inputProps: {
                                autoComplete: 'username'
                            }
                        }}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Grid>
                <Grid className={classes.FormGridElement} item xs={12}>
                    <TextField variant="outlined"
                        label="Password"
                        type="password"
                        size="small"
                        value={password}
                        InputProps={{
                            inputProps: {
                                autoComplete: 'current-password'
                            }
                        }}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Grid>
                <Grid className={classes.FormGridElement} item xs={12}>
                    <Button variant="contained" type="submit" onClick={loginHandler}>
                        { isLoading ? <CircularProgress size={25} /> : 'Login' }
                    </Button>
                </Grid>
            </Grid>
            </form>
        </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        hasCheckedOut: state.shopping.hasCheckedOut,
        isLoading: state.auth.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (email, password) => dispatch(actions.loginUser(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);