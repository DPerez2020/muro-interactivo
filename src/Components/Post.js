import React,{Component} from 'react';
import Firebase from 'firebase/app';
import { TextField } from 'material-ui';
import { Button } from 'material-ui';

require('firebase/database');
var firebaseConfig = {
    apiKey: "AIzaSyCzx7TRGdsYxAFYTksX2btrtQgQ_5bZQ6o",
    authDomain: "muro-interactivo-7af36.firebaseapp.com",
    databaseURL: "https://muro-interactivo-7af36.firebaseio.com",
    projectId: "muro-interactivo-7af36",
    storageBucket: "muro-interactivo-7af36.appspot.com",
    messagingSenderId: "920853230787",
    appId: "1:920853230787:web:a8065ede0821b74da31e76"
  };
  // Initialize Firebase
  Firebase.initializeApp(firebaseConfig);

class Post extends Component{
    constructor(){
        super();
        this.state={
            currentPost:'',
            allPost:[]
        };
    }

    updateMessage(e){
        e.preventDefault();
        this.setState({currentPost:e.target.value});
    }
    
    componentDidMount(){
        const nameref=Firebase.database().ref('Posts');
        nameref.on('value',(snapshop)=>{
            let alldata=[];
            let data= snapshop.val();
            for (let item in data){  
                alldata.push(snapshop.child(item).val());
            }
            this.setState({
                allPost:alldata
            });
        });   
    }

    handleSubmit(e){
        e.preventDefault();
        const systemID= new Date().getTime();        
        const date= new Date().getDate();
        Firebase.database().ref().child(`Posts/${systemID}/`).set({
            userId:'',
            post:this.state.currentPost,
            date:date
        });
    }

    render(){

        const allPost=this.state.allPost;
        //console.log(allPost);
        const messageList =allPost.map(Message=>{   
            
            return <li>{Message.date}</li>
        })
        return(
            <div>
                <ol>
                    {messageList}
                </ol>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <TextField type="text" onChange={this.updateMessage.bind(this)} value={this.state.currentPost}/>
                    <Button>Enviar</Button>
                </form>
            </div>
        )
    }
}

export default Post;