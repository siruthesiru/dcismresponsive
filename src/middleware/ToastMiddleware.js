import { toast } from 'react-toastify';

import { addAlumni, addAlumniError, deleteAlumni, deleteAlumniError, editAlumni, editAlumniError, getAllAlumniError } from '../app/alumniSlice';
import { rejectCompany, rejectCompanyError, verifyCompany, verifyCompanyError } from '../app/companiesSlice';

const ToastMiddleware = () => (next) => (action) => {
    switch (action.type) {
        // alumni
        case addAlumni.type:
            toast.success('New Alumni added successfully');
            break;
        case editAlumni.type:
            toast.success('Alumna updated successfully');
            break;
        case deleteAlumni.type:
            toast.success('Alumna deleted successfully');
            break;
        case getAllAlumniError.type:
            toast.error('Error loading alumni');
            break;
        case addAlumniError.type:
        case editAlumniError.type:
        case deleteAlumniError.type:
            toast.error(action.payload);
            break;

        // Company
        case verifyCompany.type:
            toast.success('Company updated successfully');
            break;
        case rejectCompany.type:
            toast.success('Company deleted successfully');
            break;
        case rejectCompanyError.type:
        case verifyCompanyError.type:
            toast.error(action.payload);
            break;


        default:
            break;
    }
    return next(action);
};

export default ToastMiddleware;
