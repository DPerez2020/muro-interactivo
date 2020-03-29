import React, { useState } from 'react';
//import firebase from 'firebase';
import 'firebase/auth';
import {useFirebaseApp,useUser} from 'reactfire'
import {Link} from "react-router-dom";

export default (prop)=>{
    const firebase= useFirebaseApp();
    const user=useUser();

    
    const goToLogin=()=>{
        window.location.hash = "login";
    }

    return (
        <h1></h1>
    )
}
/*        <div>
            {!user &&
            <div>
              <button onClick={goToLogin}>Iniciar session</button>
            </div>
            }
            {
                user &&
                <button onClick={logout}>Cerrar sesion</button>
            }
        </div>*/