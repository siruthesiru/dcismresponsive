// import {
//     newExpense, editExpense, deleteExpense,
//     setExpensesError, newExpenseError, editExpenseError, deleteExpenseError
// } from '../app/expensesSlice';
// import { toast } from 'react-toastify';

// const ToastMiddleware = () => next => action => {
//     switch (action.type) {
//         case newExpense.type:
//             toast.success('New expense added successfully');
//             break
//         case editExpense.type:
//             toast.success('Expense  edited successfully');
//             break;
//         case deleteExpense.type:
//             toast.success('Expense deleted successfully');
//             break
//         case setExpensesError.type:
//             toast.error('Error loading expenses');
//             break;
//         case newExpenseError.type:
//             toast.error('Error adding new expense');
//             break;
//         case editExpenseError.type:
//             toast.error('Error editing expense');
//             break;
//         case deleteExpenseError.type:
//             toast.error('Error deleting expense');
//             break;
//         default:
//             break;
//     }
//     return next(action);

// }
// export default ToastMiddleware;


import {
    addEvent, editEvent, deleteEvent, addEventError, editEventError, deleteEventError, getAllEvents, getAllEventsError
} from '../app/eventsSlice';
import { toast } from 'react-toastify';

const ToastMiddleware = () => next => action => {
    switch (action.type) {
        case addEvent.type:
            toast.success('New Event added successfully');
            break
        case editEvent.type:
            toast.success('Event  edited successfully');
            break;
        case deleteEvent.type:
            toast.success('Event deleted successfully');
            break
        case getAllEventsError.type:
            toast.error('Error loading expenses');
            break;
        case addEventError.type:
            toast.error('Error adding new event');
            break;
        case editEventError.type:
            toast.error('Error editing the event');
            break;
        case deleteEventError.type:
            toast.error('Error deleting the event');
            break;
        default:
            break;
    }
    return next(action);

}
export default ToastMiddleware;