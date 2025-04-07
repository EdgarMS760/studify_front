import { Navigate } from 'react-router-dom';
 const PublicOnlyRoute = ({ children }) => {
  const token = localStorage.getItem('token_studify');

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (!isExpired) {
        return <Navigate to="/" replace />;
      } else {
        localStorage.removeItem('token_studify');
        localStorage.removeItem('user_studify');
      }
    } catch {
      localStorage.removeItem('token_studify');
      localStorage.removeItem('user_studify');
    }
  }

  return children;
};
export default PublicOnlyRoute;