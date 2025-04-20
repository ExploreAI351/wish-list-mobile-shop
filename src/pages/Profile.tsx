
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, User, Heart, LogOut } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container px-4 py-8 mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-wishlist-accent rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-wishlist-primary" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
                <p className="text-gray-500">{currentUser?.email}</p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full border-wishlist-primary text-wishlist-primary hover:bg-wishlist-primary hover:text-white"
                  onClick={() => navigate('/wishlist')}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  My Wishlist
                </Button>
                
                <Button 
                  variant="default" 
                  className="w-full bg-gray-800 hover:bg-gray-700"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
