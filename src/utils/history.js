import { createBrowserHistory } from 'history';

const userRole = 'admin'; // Replace with the actual logic to determine the role

let basename = ''; // Default basename

if (userRole === 'admin') {
    basename = '/admin';
} else if (userRole === 'alumni') {
    basename = '/alumni';
} else if (userRole === 'company') {
    basename = '/company';
}

export default createBrowserHistory({ basename });
