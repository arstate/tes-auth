
import React, { useState, useEffect } from 'react';
// FIX: Removed modular imports from 'firebase/auth' which were causing errors.
// Functionality is now accessed via the 'auth' object from './services/firebase'.
import { auth } from './services/firebase';
import type { FirebaseUser } from './types';
import Login from './components/Login';
import UserProfile from './components/UserProfile';

const App: React.FC = () => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // FIX: Switched to auth.onAuthStateChanged (v8 compat API) and removed the explicit User type annotation to fix the error.
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            // FIX: Switched to auth.signOut() (v8 compat API) to fix the error.
            await auth.signOut();
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };
    
    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center text-gray-400">
                    <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Authenticating...</span>
                </div>
            );
        }

        if (user) {
            return <UserProfile user={user} onLogout={handleLogout} />;
        }

        return <Login />;
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 font-sans">
             <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Firebase Authentication</h1>
                    <p className="text-gray-400">Google Sign-In Test</p>
                </div>
                {renderContent()}
            </div>
        </main>
    );
};

export default App;
