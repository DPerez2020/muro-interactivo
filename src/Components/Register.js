import React,{ useState } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database'
import {useFirebaseApp,useUser} from 'reactfire'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default (prop)=>{
    const classes = useStyles();
    const firebase= useFirebaseApp();
    //const user=useUser();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [usuario,setUsuario]=useState('');
    const [nombre,setNombre]=useState('');
    const [apellido,setApellido]=useState('');

    const submit= async (event)=>{
        event.preventDefault();
        if(nombre!=="" && apellido!=="" ){
            await firebase.auth().createUserWithEmailAndPassword(email,password).then(currentUser=>{
                currentUser.additionalUserInfo.username=usuario;
                firebase.database().ref('Users/').push({
                    Nombre:nombre,
                    Apellido:apellido,
                    Email:email
                }).then(()=>{
                    window.location.href="/home";
                }).catch((err)=>{
                    alert(err);
                })
            }).catch((err)=>{
                switch (err.code) {
                    case "auth/invalid-email":
                        alert('Correo invalido');
                        break;
                        
                        case "auth/weak-password":
                            alert('La contraseña no es correcta, debe introducir mas de 6 caracteres');
                            break;
                            
                            case "auth/email-already-in-use":
                                alert('El correo introducido ya esta en uso');
                                break;
                                default:
                                    console.log(err.code);           
                                    break;
                                }      
                            });
                }else{
                    alert('Debe completar todos los campos');
                }
    }

    return (
<Container component="main" maxWidth="xs" style={{color:'white'}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrate
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                style={{color:'white',backgroundColor:'white'}}
                onChange={(event)=>setNombre(event.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                style={{color:'white',backgroundColor:'white'}}
                onChange={(event)=>setApellido(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="usuario"
                label="Usuario"
                name="usuario"
                autoComplete="user"
                style={{color:'white',backgroundColor:'white'}}
                onChange={(event)=>setUsuario(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                style={{color:'white',backgroundColor:'white'}}
                onChange={(event)=>setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                style={{color:'white',backgroundColor:'white'}}
                onChange={(event)=>setPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Registrarse
          </Button>
        </form>
      </div>
    </Container>
    )
}