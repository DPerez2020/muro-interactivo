import React,{Suspense} from 'react';
import {render} from 'react-dom';
import App from './App';
import firebaseConfig from './/firebase-config'
import {FirebaseAppProvider} from 'reactfire';
import spinner from './Components/Spinner';

render (
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={spinner}>
      <App/>
    </Suspense>
  </FirebaseAppProvider>,
    document.getElementById('root')
);