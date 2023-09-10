import Cookies from 'js-cookie';

const isauthenticated = () => {
    return Cookies.get('access_token') ? true : false;
};

const getUserRole = () => {
    return Cookies.get('user_role');
}

const AuthService = {
    isauthenticated,
    getUserRole
};

export default AuthService;
