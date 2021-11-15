import React, {useEffect,useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {addData,getData, updateData} from "../firestore";
import { genUsername } from '../utils/utilities';

const Dashboard = () => {
    const {currentUser,logout,updateDetails} = useAuth();
    const [usernames,setUsernames] = useState('');
    const [username,setUsername] = useState('');

    const usernameRef = useRef();
    const fullnameRef = useRef();
    const emailRef = useRef();

    const navigate = useNavigate();
    useEffect(()=>{
        if(!currentUser){
            return navigate('/signup')
        }

        getData(currentUser.email).then((data) => {
            const {firstname,lastname,email} = data || ''; 
            const {username} = data || ''
            setUsername(username)
        })

    },[]) 
    function handleUpdate(){
        if(fullnameRef.current.value){
            updateDetails(fullnameRef.current.value);

            let [firstname,lastname] = fullnameRef.current.value.split(" ");
            addData({firstname,lastname,email:currentUser.email})
            usernameRef && updateUsername(usernameRef.current.value);
        }else{
            alert("update failed");
            return;
        }
    }
    function handleUsernames(){
        let generated_usernames = genUsername(currentUser.displayName);
        let [fn,ln] = currentUser.displayName.split(' ');

        let filter = generated_usernames.filter(val => {
            if(val.startsWith(fn[0]) || val.startsWith(ln[0]) || val.startsWith('_')){
                return val;
            }
        })
        setUsernames(filter)
    }

    function updateUsername(username){
        updateData(currentUser.email,username)
        .then(_ => {
            document.getElementById('genUsernames_container').innerHTML = ''
            setUsername(username);
        });
    }


    return (
        <div>
            {
                (currentUser && currentUser.photoURL) ? 
                <div className='mb-5 w-full grid place-items-center'>
                    <img className="rounded-full" src={currentUser.photoURL} alt="Profile Picture"/>
                </div> : null
            }

            <label htmlFor="email" className="text-gray-500 mt-16 mb-3 block">Email Address</label>
            <input disabled ref={emailRef} type='email' id="email" required className="block bg-transparent border-2 w-full rounded border-gray-700 p-2 focus:outline-none text-gray-700" defaultValue={currentUser && currentUser.email}/>
            
            <label htmlFor="fullname" className="text-gray-500 mt-4 mb-3 block text-blue-900">Fullname</label>
            <input ref={fullnameRef} type='text' id="fullname" required className="block bg-transparent border-2 w-full rounded border-blue-800 text-blue-900 p-2 focus:outline-none" defaultValue={currentUser && currentUser.displayName}/>

            <label htmlFor="Username" className="text-gray-500 mt-4 mb-3 block text-blue-900">Username</label>
            <input ref={usernameRef} type='text' id="Username" required className="block bg-transparent border-2 w-full rounded border-blue-800 text-blue-900 p-2 focus:outline-none" defaultValue={username}/>

            <button onClick={handleUpdate} className="px-6 py-2 rounded bg-yellow-500 text-yellow-50 block mt-10 w-full">Update Profile</button>
            <button onClick={handleUsernames} className="px-6 py-2 rounded bg-green-500 text-yellow-50 block mt-2 w-full">Generate Username</button>

            <ul id="genUsernames_container" className="grid grid-cols-2 auto-cols-auto gap-2 mt-2">
                {usernames ? usernames.map(username => <li key={username} onClick={() => updateUsername(username)} className="px-3 py-2 text-xs rounded bg-gray-300 hover:bg-black hover:text-white cursor-pointer">{username}</li>) : null}
                
                
            </ul>

            <button onClick={logout} className="px-6 py-2 rounded bg-red-500 text-white block mt-10 w-full">Logout</button>

        </div>
    )
}

export default Dashboard
