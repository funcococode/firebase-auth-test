import React,{useContext,useState,useEffect} from 'react'
import {app} from '../firebase';
import {updateProfile,GoogleAuthProvider} from 'firebase/auth'
import { addData } from '../firestore';
const auth = app.auth();
const AuthContext = React.createContext();


export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState()
    const [loading,setLoading] = useState(true);
    function signup(email,password){
        auth.createUserWithEmailAndPassword(email,password);
        addData({firstname:null,lastname:null,email});
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }

    function logout(){
        return auth.signOut();
    }

    function updateDetails(name){
        if(name){
            updateProfile(auth.currentUser,{
                 displayName:name
            }).then(()=>{
                alert('Profile Updated Successfully')
            }).catch(err => {
                return err;
            })
        }

    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }


    function signOnWithGoogle(){
        console.log("heloo")
        const provider = new GoogleAuthProvider();
        return auth.signInWithPopup(provider)
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        });
        return unsubscribe;
    },[])
    
    

    const value = {
        currentUser,
        signup,
        login,
        logout,
        updateDetails,
        resetPassword,
        signOnWithGoogle
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}