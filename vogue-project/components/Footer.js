import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h4 className="text-2xl font-bold text-orange-500 mb-6">VOGUE</h4>
                        <p className="text-gray-400 mb-4">
                            Your destination for fashion, beauty, and lifestyle essentials at accessible prices.
                        </p>
                        <div className="flex space-x-4">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                                <span className="text-white text-sm font-bold">f</span>
                            </div>
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                                <span className="text-white text-sm font-bold">t</span>
                            </div>
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                                <span className="text-white text-sm font-bold">i</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h5 className="font-bold mb-4 text-white">Shop</h5>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Fashion</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Beauty</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Lifestyle</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Sale Items</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold mb-4 text-white">Support</h5>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Size Guide</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Shipping Info</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Returns & Exchanges</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold mb-4 text-white">Company</h5>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Press</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 mb-4 md:mb-0">© 2025 Vogue. All rights reserved.</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <span>Secure Payment</span>
                            <span>•</span>
                            <span>Free Shipping Over $50</span>
                            <span>•</span>
                            <span>30-Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer