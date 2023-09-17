import { authenticationError, userAuthenticated } from '../app/authenticationSlice';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Auth`,
});

export const SignUpAlumni = async (dispatch, credentials) => {
    try {
        const data = await axiosInstance.post('/signup/company', credentials);
        //const { data } = response;
        console.log(data.token);
      //  if (response.data === 201) {
            dispatch(userAuthenticated(data));
      //  }

    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.response?.data || 'An error occurred while signing up.';
        dispatch(authenticationError(errorMessage))
    }
}

export const SignUpAlumni = async (dispatch, credentials) => {
    try {
        const data = await axiosInstance.post('/signup/alumni', credentials);
        //const { data } = response;
        console.log(data.token);
      //  if (response.data === 201) {
            dispatch(userAuthenticated(data));
      //  }

    } catch (error) {
        console.log('Error:', error);
        const errorMessage = error.response?.data || 'An error occured while signing up';
        dispatch(authenticationError(errorMessage));
    }
}

export const SignIn = async (dispatch, credentials) => {
    try {
        const data = await axiosInstance.post('/signin', credentials);
        console.log(data.data);

        dispatch(userAuthenticated(data.data));
        // const { data } = response;

        // if (response.status === 201) {
        //     dispatch(userAuthenticated(data));
        // }
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.response?.data || 'An error occurred while signing in.';
        dispatch(authenticationError(errorMessage))
    }
}

export const SignUpGoogle = async (dispatch, token) => {
    try {
        // api call        
        const { data } = await axiosInstance.post(`/google?token=${token}`);
        dispatch(userAuthenticated(data));
    } catch {
        console.log('Error!')
    }
}


