import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
const SocialSignon = () => {
    const {signOnWithGoogle} = useAuth();
    return (
        <div className="flex gap-2 items-center mb-12">
            <button onClick={signOnWithGoogle} className='flex-1 py-2 rounded border border-gray-800 hover:border-transparent hover:bg-red-800 hover:text-white hover:shadow-lg' ><FontAwesomeIcon icon={faGoogle}/></button>
            <button className='flex-1 py-2 rounded border border-gray-800 hover:border-transparent hover:bg-blue-800 hover:text-white hover:shadow-lg' ><FontAwesomeIcon icon={faFacebookF}/></button>
            <button className='flex-1 py-2 rounded border border-gray-800 hover:bg-gray-800 hover:text-white hover:shadow-lg' ><FontAwesomeIcon icon={faGithub}/></button>
        </div>
    )
}

export default SocialSignon
