import React from 'react';
import { UserAuth } from './UserAuthContext';
import { Navigate } from 'react-router';

export default function ProtectedRoute({ children }) {
    const { user } = UserAuth();

    if (!user) {
        return <Navigate to='/login' />
    }
    return (children)
}
