import { adminDashboard, adminDashboardError } from '../app/adminDashboardSlice';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
});

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const getStatistics = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Statistics');
        console.log(response);
        console.log(response.data);
        dispatch(
            adminDashboard({
                totalAlumni: response.data.totalAlumni,
                totalCompany: response.data.totalCompany,
                sumOfUsers: response.data.sumOfUsers,
                message: response.data.message,
                
                firstData: response.data.firstData,
                secondData: response.data.secondData,
                thirdData: response.data.thirdData,
                fourthData: response.data.fourthData,
                fifthData: response.data.fifthData,
                sixData: response.data.sixData,
                sevenData: response.data.sevenData,
            })
        );
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.response?.data || 'There is something wrong when fetching a data';
        dispatch(adminDashboardError({ message: errorMessage }));
    }
}