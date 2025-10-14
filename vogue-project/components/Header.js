'use client';
import { Heart, Search, ShoppingBag, Menu, X } from 'lucide-react';
import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-orange-500 tracking-wide">VOGUE</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/collection" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Collections</Link>
              <Link href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Beauty</Link>
              <Link href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Lifestyle</Link>
              <Link href="#" className="text-orange-500 hover:text-orange-600 transition-colors font-medium">Sale</Link>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors hidden sm:block" />
              <Heart className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors hidden sm:block" />
              <div className="relative">
                <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </div>
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
              <div className="pt-4 flex space-x-4">
                <Search className="w-5 h-5 cursor-pointer" />
                <Heart className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </nav>
  )
}

export default Header