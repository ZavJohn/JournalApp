import React, { useEffect, useState } from 'react';
import {
    Routes,
    BrowserRouter,
    Route,
    Navigate
  } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { LoginScreen } from '../components/auth/LoginScreen';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);



    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( (user) => {

            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);
        });
        
    }, [ dispatch, setChecking, setIsLoggedIn ])


    if ( checking ) {
        return (
            <h1>Espere...</h1>
        )
    }

    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element= { 
                    <PublicRoute isLoggedIn={ isLoggedIn }> 
                        <AuthRouter />
                    </PublicRoute> 
                } />
                
                <Route path="/journal" element= { 
                    <PrivateRoute isLoggedIn={ isLoggedIn }> 
                        <JournalScreen />
                    </PrivateRoute> 
                } />

                <Route path="/*" element= { 
                    <PublicRoute isLoggedIn={ isLoggedIn }> 
                        <AuthRouter />
                    </PublicRoute> 
                } />

            </Routes>
        </BrowserRouter>
    )
}
