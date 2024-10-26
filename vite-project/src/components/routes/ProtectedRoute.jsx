import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import { CircularProgress } from '@mui/material';

const ProtectedRoute = ({ isAdminRoute }) => {
    const { isAdmin, userToken, loading } = useStateContext();

    if (loading) {
        return <div className="flex justify-center items-center h-72">
        <CircularProgress />
      </div>;
    }

    if (!userToken) {
        return <Navigate to="/login" />;
    }

    if (isAdminRoute && !isAdmin) {
        return <Navigate to="/news" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
