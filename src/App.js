import React,{Component} from 'react';
import Post from './Components/Post';
import {AppBar, Toolbar } from 'material-ui';
import Typography from 'material-ui/Typography';

class App extends Component{
    render(){
        return (   
          <div className="App">
              <AppBar>
                  <Toolbar>
                      <Typography>
                          Muro interactivo
                      </Typography>
                  </Toolbar>
              </AppBar>
              <Post/> 
          </div>
        )
    }
}

export default App;