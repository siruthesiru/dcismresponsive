// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
// import React, { useState } from 'react'
// import { SignUpGoogleAlumni } from '../../services/authentication'
// import { useDispatch } from 'react-redux'
// import GoogleAuthForm from './GoogleAuthForm'; // Import the GoogleAuthForm component

// const GoogleAuth = () => {
//     const dispatch = useDispatch();
//     const [selectedRole, setSelectedRole] = useState(''); // Initialize with an empty string
//     const [showAuthForm, setShowAuthForm] = useState(false); // State to control when to show the form
//     const [credential, setCredential] = useState(''); 
//     console.log("1",selectedRole);
//     const handleGoogleLogin = async (credentialResponse) => {
//         // When the Google authentication succeeds, store the selected role in state
//         setSelectedRole(credentialResponse.credential ? selectedRole : '');
//         // Show the form once the role is selected
//         setCredential(credentialResponse);
//         setShowAuthForm(true);
//     };

//     const handleGoogleAuth = async () => {
//         console.log(credential);
//         console.log(selectedRole);
//         try {
//             // Check if a role is selected
//             if (selectedRole) {
//                 // Perform Google authentication and get the token
//                 const credentialResponse = credential;
//                 console.log(credentialResponse.credential);
//                 console.log("2",selectedRole);
//                 // Call SignUpGoogle with the token and selected role
//                 await SignUpGoogleAlumni(dispatch, credential.credential, selectedRole);
//             } else {
//                 console.log('Please select a role.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             // Handle authentication errors here
//         }
//     };

//     return (
//         <div className='flex w-full rounded-md shadow-md justify-center border'>
//             <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
//                 <div className='p-2'>
//                     <GoogleLogin
//                         onSuccess={handleGoogleLogin}
//                         onError={() => {
//                             console.log('Login Failed');
//                         }}
//                     />
//                     {showAuthForm && (
//                         <GoogleAuthForm handleGoogleAuth={handleGoogleAuth} />
//                     )}
//                 </div>
//             </GoogleOAuthProvider>
//         </div>
//     )
// }

// export default GoogleAuth;

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { SignUpGoogleAlumni } from '../../services/authentication'
import { useDispatch } from 'react-redux'
const role = "ALUMNI";
const GoogleAuth = () => {
    const dispatch = useDispatch();
    return (
        <div className='flex w-full rounded-md shadow-md justify-center border'>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                <div className='p-2'>
                    
                <GoogleLogin
                     onSuccess={credentialResponse => SignUpGoogleAlumni(dispatch, credentialResponse.credential, role)}
                    // onSuccess={credentialResponse => {
                    //     console.log(credentialResponse);
                    //   }}
                    onError={() => {
                        console.log('Login Failed');
                        
                    }}
                />
                </div>
            </GoogleOAuthProvider>
        </div>

    )
}

export default GoogleAuth
