import React from "react";
import {useFirebaseApp,useUser} from 'reactfire'
import {BrowserRouter as Router,Switch,Route,Link, Redirect} from "react-router-dom";
import Wall from '../Components/Wall';
import Login from '../Components/Login';
import Register from "../Components/Register";
import Post from "../Components/Post";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import 'firebase/auth';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const styles={
    ul:{
        listStyleType:'none',
        margin: 0,
        padding: 0,
        overflow:'hidden'
    },
    li:{
        float:"left"
    },
    link:{
        display:'block',
        color: 'white',
        textaling:'center',
        padding: '8px 16px',
        textDecoration: 'none',
        textAlign:"center",
        ':hover':{
            backgroundColor: '#111'
        }
    }
  }
export default function App() {
   const firebase= useFirebaseApp();
   const user=useUser();
   const classes = useStyles();
   const logout= async ()=>{
    await firebase.auth().signOut();
    }
  return (
      <div>
        <Router>
            <Redirect from='/' to='/home'></Redirect>
             <div  className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start"  color="inherit" aria-label="menu">
                        </IconButton>
                        <Typography variant="h6" className={classes.title} >
                        Muro interactivo
                        </Typography>
                        <ul style={styles.ul}>
                            <li style={styles.li}><Link to={"/home"} style={styles.link}>Home</Link></li>
                            { !user &&
                               <li style={styles.li}><Link to={"/login"} style={styles.link}>Inicio de session</Link></li>  
                            }
                            {!user &&
                            <li style={styles.li}> <Link to={"/register"} style={styles.link}>Registrarse</Link></li>                                
                            }
                            {user &&
                                <li style={styles.li}><Link to={"/home"} onClick={logout} style={styles.link}>Cerrar sesion</Link></li> 
                            }
                        </ul>
                    </Toolbar>
                </AppBar>
                {user &&
                  <Post/>
                }
             </div>
            <Switch>
            <Route path="/home">
               <Wall/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/register">
                <Register/>
            </Route>
            </Switch>
        </Router>
    </div>
  );
}
