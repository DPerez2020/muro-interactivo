import React,{Component} from 'react';
import firebase from 'firebase';
require('firebase/storage');

class UploadImages extends Component{
    constructor(){
        super();
        this.state={
            uploadValue:0,
            picture:null
        };
        this.handleUpload=this.handleUpload.bind(this);
    }

    handleUpload(event){
        const file=event.target.files[0];
        const storageRef=firebase.storage().ref(`/pictures/${file.name}`);
        const task =storageRef.put(file);
        task.on('state_changed',snapshop=>{
            let porcentaje=(snapshop.bytesTransferred/snapshop.totalBytes)*100;
            this.setState({
                uploadValue:porcentaje
            });
        },err=>{
            console.log(err.message);
        },()=>{
            this.setState({
                uploadValue:100,
                picture:task.snapshot.downloadURL
            });
        });
    }

    render () {
        return (
            <div>
                <progress value={this.state.uploadValue} max="100"></progress>
                <br/>
                <input type="file" onChange={this.handleUpload}/>
                <br/>
                <img src={this.state.picture} alt=""/>
            </div>
        )
    }
}


export default UploadImages;