'use client';
import { Heart, Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const router = useRouter();
  const { userSession, isLoggedIn, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    router.push('/');
  };

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-orange-500 tracking-wide">VOGUE</h1>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button className="flex-shrink-0 cursor-pointer" onClick={() => router.push('/')}>
              <h1 className="text-2xl font-bold text-orange-500 tracking-wide">VOGUE</h1>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/collection" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Collections</Link>
              <Link href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Beauty</Link>
              <Link href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Lifestyle</Link>
              <Link href="#" className="text-orange-500 hover:text-orange-600 transition-colors font-medium">Sale</Link>
            </div>

            {/* Icons & Login Button */}
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors hidden md:block" />
              
              {/* Show Shopping Bag only if logged in */}
              {isLoggedIn && (
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
                </div>
              )}

              {/* User Profile Avatar - Desktop */}
              {isLoggedIn && userSession && (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    {userSession?.profileUrl ? (
                      <Image
                        src={userSession.profileUrl}
                        alt={userSession?.name || 'Profile'}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                      <div className="p-4 border-b border-gray-100">
                        <p className="font-semibold text-gray-800">{userSession?.name}</p>
                        <p className="text-sm text-gray-600">{userSession?.email}</p>
                      </div>
                      <div className="py-2">
                        <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 transition-colors">
                          My Profile
                        </Link>
                        <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 transition-colors">
                          My Orders
                        </Link>
                        <Link href="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 transition-colors">
                          Wishlist
                        </Link>
                        <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 transition-colors">
                          Settings
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Show Login button only if not logged in */}
              {!isLoggedIn && (
                <Link 
                  href="/login" 
                  className="hidden md:inline-block px-4 py-2 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition-colors"
                >
                  Login
                </Link>
              )}

              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link href="/collection" className="block text-gray-700 font-medium">Collections</Link>
              <Link href="#" className="block text-gray-700 font-medium">Beauty</Link>
              <Link href="#" className="block text-gray-700 font-medium">Lifestyle</Link>
              <Link href="#" className="block text-orange-500 font-medium">Sale</Link>
              
              <div className="pt-4 flex flex-col space-y-4 border-t border-gray-100">
                <Search className="w-5 h-5 cursor-pointer" />
                
                {/* Mobile Shopping Bag */}
                {isLoggedIn && (
                  <div className="relative inline-block">
                    <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
                  </div>
                )}

                {/* Mobile User Profile */}
                {isLoggedIn && userSession && (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white overflow-hidden">
                        {userSession?.profileUrl ? (
                          <Image
                            src={userSession.profileUrl}
                            alt={userSession?.name || 'Profile'}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{userSession?.name}</p>
                        <p className="text-xs text-gray-600">{userSession?.email}</p>
                      </div>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 rounded transition-colors">
                      My Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 rounded transition-colors">
                      My Orders
                    </Link>
                    <Link href="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 rounded transition-colors">
                      Wishlist
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 rounded transition-colors">
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full mt-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-colors font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}

                {/* Mobile Login Button */}
                {!isLoggedIn && (
                  <Link 
                    href="/login" 
                    className="block px-4 py-2 bg-orange-500 text-white font-medium rounded text-center hover:bg-orange-600 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
  )
}

export default Header