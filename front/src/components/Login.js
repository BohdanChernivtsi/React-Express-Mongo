import React from 'react'
import './Login.css'

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { login } from '../App'

export default class Login extends React.Component {

    state = {
        username: '',
        email: ''
    }

    render() {
        return (
            <form className="login-form" noValidate onSubmit={(event) => {
                event.preventDefault();
                login(this.state);
                this.props.history.push('/')
            }}>
                <Typography variant="h3" component="h3">
                    Registration
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="username"
                    type="username"
                    id="username"
                    autoComplete="current-username"
                    onKeyPress={(event) => this.setState({ username: event.target.value })}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onKeyPress={(event) => this.setState({ email: event.target.value })}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Grid container className="btn-container">
                    <Grid item>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign In
              </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign Up
              </Button>
                    </Grid>
                </Grid>
            </form>
        )
    }

}