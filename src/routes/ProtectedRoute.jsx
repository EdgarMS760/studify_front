import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token_studify');

    if (!token) {
        return <Navigate to="/auth" replace />;
    }

    // validar expiración del token
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
            localStorage.removeItem('token_studify');
            localStorage.removeItem('user_studify');
            return <Navigate to="/auth" replace />;
        }
    } catch {
        localStorage.removeItem('token_studify');
        localStorage.removeItem('user_studify');
        return <Navigate to="/auth" replace />;
    }

    return children;
};
export default ProtectedRoute;