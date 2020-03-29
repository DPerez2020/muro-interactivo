import React, { useState } from 'react';
import {useFirebaseApp} from 'reactfire'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'firebase/auth';

const useStyles = makeStyles((theme) => ({
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
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

export default (prop)=>{
    const firebase= useFirebaseApp();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const submit= async (event)=>{
        event.preventDefault();
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
            firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
                window.location.href="/home";
            }).catch((err)=>{
                console.log(err)
                switch (err.code) {
                    case 'auth/invalid-email':
                        alert('El usuario no existe');
                        break;
                    case 'auth/wrong-password':
                        alert('La contraseña no es valida');
                        break;
                    default:
                        alert(err);
                        break;
            }
            });
        }).then(()=>{
            console.log(firebase.auth().currentUser);
        });
    }
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs" style={{color:'white'}}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
           Iniciar session
          </Typography>
          <form className={classes.form} noValidate>
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
              style={{color:'white',backgroundColor:'white'}}
              onChange={(event)=>{setEmail(event.target.value)}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              style={{color:'white',backgroundColor:'white'}}
              onChange={(event)=>{setPassword(event.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submit}
            >
              Iniciar session
            </Button>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    )
}