import React,{useRef,useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ForgetPassword = () => {
    const emailRef = useRef();

    const {resetPassword,currentUser} = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser) {
            return navigate('/') 
        }
    })

    async function handleSubmit(e){
        e.preventDefault();
        
        try{ 
            setError('')
            await resetPassword(emailRef.current.value)
            return setSuccess('Password reset link has been sent to your email.')
        }catch{
            return setError('Password Reset Failed')
        }

    }
    return (
        <div>
           <h2 className="text-3xl mb-10 font-bold ">Reset your password</h2>             
            {error ? <p className="font-semibold my-8 text-center text-white p-2 rounded bg-red-500 text-sm">{error}</p> : ''}
            {success ? <p className="font-semibold my-8 text-center text-white p-2 rounded bg-green-500 text-sm">{success}</p> : ''}
               <label htmlFor="email" className="text-gray-500 mt-4 mb-3 block">Email Address</label>
               <input ref={emailRef} type='email' id="email" required className="block bg-transparent border-2 w-full rounded border-blue-800 p-2 focus:outline-none" />
               <button onClick={handleSubmit} className="mt-5 text-white bg-blue-700 hover:bg-blue-900 px-6 py-2 rounded w-full">Send Link</button>
               
                <Link to="/login" className="bg-gray-800 text-white text-center px-4 py-2 rounded mt-16 block">Back to Login</Link>
        </div>
    )
}

export default ForgetPassword