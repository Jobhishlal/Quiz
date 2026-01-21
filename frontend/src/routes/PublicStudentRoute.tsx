import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const PublicStudentRoute = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/student/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicStudentRoute;
