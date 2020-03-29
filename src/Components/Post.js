import React,{Component} from 'react';
import Firebase from 'firebase/app';
import { TextField } from 'material-ui';
import { Button } from 'material-ui';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'
require('firebase/database');
require('firebase/storage');

class Post extends Component{
    constructor(){
        super();
        this.state={
            currentPost:'',
            uploadValue:0,
            imgUrl:'',
            allPost:[]
        };
        this.handleUpload=this.handleUpload.bind(this);
    }

    updateMessage(e){
        e.preventDefault();
        this.setState({currentPost:e.target.value});
    }
    
    handleUpload(event){
        const file=event.target.files[0];
        if(file){
            const storageRef=Firebase.storage().ref(`/pictures/${file.name}`);
            const task =storageRef.put(file);
            
            task.on('state_changed',snapshop=>{
                let porcentaje=(snapshop.bytesTransferred/snapshop.totalBytes)*100;
                this.setState({
                    uploadValue:porcentaje
                });     
            },err=>{
                console.log(err.message);
            },()=>{
                task.snapshot.ref.getDownloadURL().then((downloadUrl)=>{
                    this.setState({
                        imgUrl:downloadUrl
                    })
                });
            });

        }
    }

    componentDidMount(){
        //Obtiene todos los datos de firebase y los carga en el state
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
        if(this.state.currentPost!==''){
            //Obtenemos un Id que representara el del sistema
            const systemID= new Date().getTime();        
            //Se obtiene y se formatea la fecha
            const date = new Date()
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear();
            let fullDate;
            if(month < 10){
            fullDate=`${day}-0${month}-${year}`;
            }else{
                fullDate=`${day}-${month}-${year}`;
            }
    
            //Inserta los datos en firebase
            Firebase.database().ref().child(`Posts/${systemID}/`).set({
                userId:Firebase.auth().currentUser.uid,
                post:this.state.currentPost,
                date:fullDate,
                imgUrl:this.state.imgUrl
            }).then(()=>{
                window.location.href='/home';
            })
            .catch(err=>{
                alert(err);
            });
        }
        else{
            alert("Debe introducir un post para publicar.");
        }
    }
    render(){
        return(
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '30vh',paddingTop:'30px' }}>
            <Container style={{padding:' 1em 1em 1em 1em',margin:' 1em 1em 1em 1em'}}>
            <CssBaseline />
                <label style={{width:'100%',color:'white',fontSize:'70px',textAlign:'center'}}>
                    Publica tu  post!
                </label>
            <div style={{position:'auto', display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                <form  style={{ width: '100%'}}>
                    <TextareaAutosize
                        size="medium"
                        multiLine
                        rows={10}
                        onChange={this.updateMessage.bind(this)} 
                        value={this.state.currentPost} placeholder="Introduzca un nuevo post"
                        style={{
                            width:'50%',
                            fontSize: '18px',
                            fontFamily: 'Arial, Verdana',
                            paddingLeft: '7px',
                            paddingRight: '7px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            borderRadius: '4px',
                            background: '#FFFFFF',
                            background: 'linear-gradient(left, #FFFFFF, #F7F9FA)',
                            background: '-moz-linear-gradient(left, #FFFFFF, #F7F9FA)',
                            background: '-webkit-linear-gradient(left, #FFFFFF, #F7F9FA)',
                            background: '-o-linear-gradient(left, #FFFFFF, #F7F9FA)',
                            color: '#2E3133',
                        }} 
                        /><br/>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{color:'white',backgroundColor:'#2E2EFE',width:'25%',margin:'1em 1em 1em 1em'}}
                        onClick={this.handleSubmit.bind(this)}
                        >
                        Publicar
                    </Button>
                            <label  style={{
                                color:'white',fontSize: '14px',
                                fontWeight: 600,
                                backgroundColor: '#106BA0',
                                display: 'inline-block',
                                transition: 'all .5s',
                                cursor: 'pointer',
                                padding: '15px 40px !important',
                                textTransform: 'uppercase',
                                width: 'fit-content',
                                textAlign: 'center',
                                margin:'1em 1em 1em 1em'}} >
                                Subir foto
                            <input
                                style={{color:'white', width: '0.1px',
                                height: '0.1px',
                                opacity: '0',
                                overflow: 'hidden',
                                position: 'absolute',
                                zIndex: '-1'}}
                                type="file"
                                onChange={this.handleUpload}
                            />
                            </label>
                            <CircularProgress variant="determinate" value={this.state.uploadValue} />
                        <br/>
                    </form>
                </div>
            </Container>
        </Grid>
        )
    }
}
export default Post;