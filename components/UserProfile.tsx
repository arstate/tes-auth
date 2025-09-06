
import React from 'react';
import type { FirebaseUser } from '../types';

interface UserProfileProps {
    user: FirebaseUser;
    onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-2xl w-full max-w-sm text-center animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-white">Profile</h2>
            <img
                src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`}
                alt="User profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-600"
            />
            <h3 className="text-xl font-medium text-white">{user.displayName}</h3>
            <p className="text-gray-400 mb-6">{user.email}</p>
            <button
                onClick={onLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition-colors duration-300"
            >
                Logout
            </button>
        </div>
    );
};

export default UserProfile;
