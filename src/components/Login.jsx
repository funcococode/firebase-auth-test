import React,{useRef,useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SocialSignon from './SocialSignon';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const {login,currentUser} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
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
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            navigate('/')
        }catch{
            setError('Login failed')
        }
        setLoading(false)

    }
    return (
        <div>
           <h2 className="text-3xl mb-10 font-bold">Login</h2>             
           <SocialSignon />
            {error ? <p className="font-semibold my-8 text-center text-white p-2 rounded bg-red-500 text-sm ">{error}</p> : ''}
           <form onSubmit={handleSubmit}>
               <label htmlFor="email" className="text-gray-500 mt-4 mb-3 block">Email Address</label>
               <input ref={emailRef} type='email' id="email" required className="block bg-transparent border-2 w-full rounded border-blue-800 p-2 focus:outline-none" />

               <label htmlFor="password" className="text-gray-500 mt-4 mb-3 block">Password</label>
               <input ref={passwordRef} type='password' id="password" required className="block w-full bg-transparent rounded border-2 border-blue-800 p-2 focus:outline-none" />

                <p className="mt-5"><Link to="/passwordreset" className="w-full">Forgot Password?</Link></p>
               <button disabled={loading} type="submit" className="mt-5 text-white bg-blue-700 hover:bg-blue-900 px-6 py-2 rounded w-full">Login</button>
           </form>
           <p className="mt-10">Looking for a new account?<br/> <Link to="/signup" className="rounded w-full text-center block mt-5 py-2 bg-green-500 hover:bg-green-700 text-white">Register Here</Link></p>
        </div>
    )
}

export default Login
