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
