import React,{Component} from 'react';
import Firebase from 'firebase/app';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
require('firebase/storage');

class Wall extends Component{
    constructor(){
        super()
        
        this.state={
            currentPost:'',
            postKeys:[],
            allPost:[]
        };

    }
     
    componentDidMount(){
        //Obtiene todos los datos de firebase y los carga en el state
        const nameref=Firebase.database().ref('Posts');
        nameref.on('value',(snapshop)=>{
            let alldata=[];
            let allkeys=[];
            let data= snapshop.val();

            for (let item in data){  
                
                alldata.push(snapshop.child(item).val());
                allkeys.push(item);
            }
            this.setState({
                allPost:alldata
            });
        });   
    }
    render(){
        const allPost=this.state.allPost;
        var iterator=1;
        const messageList =allPost.map(data=>{     
            iterator++;          
            return (
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '30vh',paddingTop:'30px' }}>
                    <Card key={iterator} style={{backgroundColor:'#62617B',alignContent:'center'}} >
                        <CardHeader
                            title={`Publicado: ${data.date}`}
                            style={{color:'white'}}
                            ></CardHeader>
                        <CardContent>
                            {data.imgUrl&&
                            <div>
                                <img src={data.imgUrl} alt="" width="600px" height="300px"/>
                            </div>
                            }
                            <Typography variant="body2" color="textSecondary" component="p">
                                <p style={{color:'white'}}>
                                    {data.post}
                                </p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )

        })
        return(
            <div>
                <div>
                    {messageList}
                </div>
            </div>
        )
    }
}
export default Wall;