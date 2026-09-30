import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

export default function ProtectedRoute({ role }) {
    const { user, sessionChecked } = useAuth()
    if (!sessionChecked) return <div className="loading-state">Loading your portal...</div>
    if (!user) return <Navigate to="/login" replace />
    if (role && user.role !== role) {
        return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
    }
    return <Outlet />
}
