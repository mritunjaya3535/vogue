'use client';
import React, { useState } from 'react';
import { Search, ShoppingBag, ChevronRight, Star, Heart } from 'lucide-react';
import Link from 'next/link';

const VogueLandingPage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Floral Summer Dress",
      price: "$89",
      originalPrice: "$120",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&crop=center",
      rating: 4,
      category: "Fashion"
    },
    {
      id: 2,
      name: "Glow Serum Set",
      price: "$65",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=500&fit=crop&crop=center",
      rating: 5,
      category: "Beauty"
    },
    {
      id: 3,
      name: "Minimalist Watch",
      price: "$199",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop&crop=center",
      rating: 5,
      category: "Lifestyle"
    },
    {
      id: 4,
      name: "Silk Scarf Collection",
      price: "$45",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop&crop=center",
      rating: 4,
      category: "Fashion"
    }
  ];

  const categories = [
    { 
      name: "Fashion", 
      description: "Trendy & affordable styles",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop&crop=center",
      itemCount: "2,340 items"
    },
    { 
      name: "Beauty", 
      description: "Skincare & cosmetics",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=500&fit=crop&crop=center",
      itemCount: "890 items"
    },
    { 
      name: "Lifestyle", 
      description: "Home & wellness essentials",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=500&fit=crop&crop=center",
      itemCount: "1,520 items"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      comment: "Love the quality and affordable prices. My go-to for everyday essentials!",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      comment: "Fast shipping and beautiful packaging. The beauty products are amazing.",
      rating: 5
    },
    {
      name: "Jennifer Kim",
      comment: "Great customer service and trendy items. Highly recommend!",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Discover Your
                <span className="block text-orange-500">Perfect Style</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Fashion, beauty, and lifestyle essentials at prices that make sense. 
                Curated collections for the modern you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
                  BROWSE COLLECTIONS
                </button>
                <button className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-200">
                  Watch Our Story
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop&crop=center" 
                alt="Fashion Model"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden lg:block">
                <p className="text-sm font-semibold text-gray-900">🔥 Trending Now</p>
                <p className="text-xs text-gray-600">Summer Collection 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated collections designed for every aspect of your lifestyle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-gray-900">{category.name}</h4>
                    <ChevronRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-gray-600 mb-2">{category.description}</p>
                  <p className="text-sm text-orange-500 font-semibold">{category.itemCount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked favorites from our latest collections
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {product.category}
                    </span>
                  </div>
                  <Heart className="absolute top-3 right-3 w-5 h-5 text-white hover:text-orange-500 transition-colors cursor-pointer" />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < product.rating ? 'text-orange-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({product.rating}.0)</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <button className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              BROWSE ALL COLLECTIONS
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
            <p className="text-lg text-gray-600">Join thousands of happy customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-orange-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay in the Loop</h3>
          <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
            Get exclusive access to new arrivals, special offers, and styling tips delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-orange-300 font-medium"
            />
            <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-lg">
              SUBSCRIBE
            </button>
          </div>
          <p className="text-sm text-orange-200 mt-4">
            Join 50,000+ subscribers • Unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default VogueLandingPage;