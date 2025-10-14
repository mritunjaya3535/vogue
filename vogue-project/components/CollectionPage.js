'use client';
import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, Star, Filter, Grid, List, ChevronDown, ArrowLeft } from 'lucide-react';

const CollectionPage = () => {
    const [currentStep, setCurrentStep] = useState('brands'); // brands -> categories -> products
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('featured');

    const brands = [
        {
            id: 1,
            name: "Zara",
            logo: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Zara_logo.svg",
            description: "Contemporary fashion for modern lifestyles",
            productCount: 234,
            image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&h=200&q=80"
        },
        {
            id: 2,
            name: "H&M",
            logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/H%26M-Logo.svg",
            description: "Trendy and affordable fashion",
            productCount: 189,
            image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&h=200&q=80"
        },
        {
            id: 3,
            name: "Nike",
            logo: "https://images.unsplash.com/photo-1561948958-8e5c8b0f5b8d?auto=format&fit=crop&w=300&h=200&q=80",
            description: "Athletic wear and lifestyle",
            productCount: 156,
            image: "https://images.unsplash.com/photo-1469398715555-76331a6c7fa0?auto=format&fit=crop&w=300&h=200&q=80"
        },
        {
            id: 4,
            name: "Adidas",
            logo: "https://images.unsplash.com/photo-1561948958-8e5c8b0f5b8d?auto=format&fit=crop&w=300&h=200&q=80",
            description: "Sports and streetwear",
            productCount: 142,
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&h=200&q=80"
        },
        {
            id: 5,
            name: "Uniqlo",
            logo: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=300&h=200&q=80",
            description: "Essential basics and innovation",
            productCount: 98,
            image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=300&h=200&q=80"
        },
        {
            id: 6,
            name: "Mango",
            logo: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=300&h=200&q=80",
            description: "Mediterranean-inspired fashion",
            productCount: 87,
            image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=300&h=200&q=80"
        }
    ];


    const categories = [
        {
            id: 1,
            name: "T-Shirts",
            icon: "👕",
            productCount: 45,
            image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=250&h=300&q=80"
        },
        {
            id: 2,
            name: "Jeans",
            icon: "👖",
            productCount: 32,
            image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=250&h=300&q=80"
        },
        {
            id: 3,
            name: "Dresses",
            icon: "👗",
            productCount: 28,
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&h=300&q=80"
        },
        {
            id: 4,
            name: "Sneakers",
            icon: "👟",
            productCount: 38,
            image: "https://images.unsplash.com/photo-1469398715555-76331a6c7fa0?auto=format&fit=crop&w=250&h=300&q=80"
        },
        {
            id: 5,
            name: "Bags",
            icon: "👜",
            productCount: 24,
            image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=250&h=300&q=80"
        },
        {
            id: 6,
            name: "Jackets",
            icon: "🧥",
            productCount: 19,
            image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=250&h=300&q=80"
        },
        {
            id: 7,
            name: "Accessories",
            icon: "⌚",
            productCount: 31,
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&h=300&q=80"
        },
        {
            id: 8,
            name: "Shoes",
            icon: "👠",
            productCount: 27,
            image: "https://images.unsplash.com/photo-1469398715555-76331a6c7fa0?auto=format&fit=crop&w=250&h=300&q=80"
        }
    ];

    const products = [
        {
            id: 1,
            name: "Classic Cotton T-Shirt",
            brand: selectedBrand?.name || "Zara",
            price: 29.99,
            originalPrice: 39.99,
            image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&h=400&q=80",
            rating: 4.5,
            reviews: 234,
            colors: ['#000000', '#FFFFFF', '#FF6B35'],
            sizes: ['XS', 'S', 'M', 'L', 'XL']
        },
        {
            id: 2,
            name: "Relaxed Fit Denim",
            brand: selectedBrand?.name || "Zara",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&h=400&q=80",
            rating: 4.3,
            reviews: 189,
            colors: ['#4A5568', '#2D3748', '#1A202C'],
            sizes: ['28', '30', '32', '34', '36']
        },
        {
            id: 3,
            name: "Summer Maxi Dress",
            brand: selectedBrand?.name || "Zara",
            price: 69.99,
            originalPrice: 89.99,
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&h=400&q=80",
            rating: 4.7,
            reviews: 156,
            colors: ['#FF6B35', '#4299E1', '#38B2AC'],
            sizes: ['XS', 'S', 'M', 'L']
        },
        {
            id: 4,
            name: "Athletic Running Shoes",
            brand: selectedBrand?.name || "Zara",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1469398715555-76331a6c7fa0?auto=format&fit=crop&w=300&h=400&q=80",
            rating: 4.6,
            reviews: 298,
            colors: ['#000000', '#FFFFFF', '#FF6B35'],
            sizes: ['7', '8', '9', '10', '11']
        },
        {
            id: 5,
            name: "Leather Crossbody Bag",
            brand: selectedBrand?.name || "Zara",
            price: 159.99,
            originalPrice: 199.99,
            image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=300&h=400&q=80",
            rating: 4.4,
            reviews: 87,
            colors: ['#8B4513', '#000000', '#D2691E'],
            sizes: ['One Size']
        },
        {
            id: 6,
            name: "Denim Jacket",
            brand: selectedBrand?.name || "Zara",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=300&h=400&q=80",
            rating: 4.5,
            reviews: 167,
            colors: ['#4A5568', '#2D3748'],
            sizes: ['XS', 'S', 'M', 'L', 'XL']
        }
    ];

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        setCurrentStep('categories');
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentStep('products');
    };

    const goBack = () => {
        if (currentStep === 'categories') {
            setCurrentStep('brands');
            setSelectedBrand(null);
        } else if (currentStep === 'products') {
            setCurrentStep('categories');
            setSelectedCategory(null);
        }
    };

    const renderBrandSelection = () => (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-light text-gray-900 mb-4">Choose Your Brand</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover your favorite brands and explore their latest collections
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {brands.map((brand, index) => (
                    <div
                        key={index}
                        onClick={() => handleBrandSelect(brand)}
                        className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-medium text-gray-900">{brand.name}</h3>
                                <span className="text-sm text-orange-600 font-medium">{brand.productCount} items</span>
                            </div>
                            <p className="text-gray-600 text-sm">{brand.description}</p>
                            <div className="mt-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                    Explore Collection
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCategorySelection = () => (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
                <button
                    onClick={goBack}
                    className="flex items-center text-gray-600 hover:text-orange-600 transition-colors mr-6"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Brands
                </button>
            </div>

            <div className="text-center mb-12">
                <h1 className="text-4xl font-light text-gray-900 mb-4">
                    What are you looking for from <span className="text-orange-600">{selectedBrand?.name}</span>?
                </h1>
                <p className="text-lg text-gray-600">
                    Browse by product category to find exactly what you need
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => handleCategorySelect(category)}
                        className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div className="relative h-56 overflow-hidden">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <div className="text-2xl mb-2">{category.icon}</div>
                                <h3 className="text-lg font-medium">{category.name}</h3>
                                <p className="text-sm opacity-90">{category.productCount} items</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderProductCatalog = () => (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center mb-8 text-sm">
                <button
                    onClick={goBack}
                    className="flex items-center text-gray-600 hover:text-orange-600 transition-colors mr-6"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Categories
                </button>
                <nav className="flex items-center space-x-2 text-gray-500">
                    <span className="cursor-pointer hover:text-orange-600" onClick={() => setCurrentStep('brands')}>
                        Brands
                    </span>
                    <span>/</span>
                    <span className="text-orange-600">{selectedBrand?.name}</span>
                    <span>/</span>
                    <span className="text-orange-600">{selectedCategory?.name}</span>
                </nav>
            </div>

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-light text-gray-900 mb-2">
                        {selectedBrand?.name} {selectedCategory?.name}
                    </h1>
                    <p className="text-gray-600">{selectedCategory?.productCount} products found</p>
                </div>

                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-400'}`}
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-400'}`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </div>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
                }`}>
                {products.map((product) => (
                    <div key={product.id} className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''
                        }`}>
                        <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[3/4]'
                            }`}>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <button className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors">
                                <Heart className="w-4 h-4 text-gray-600" />
                            </button>
                            {product.originalPrice && (
                                <div className="absolute top-3 left-3 px-2 py-1 bg-orange-600 text-white text-xs rounded">
                                    Sale
                                </div>
                            )}
                        </div>

                        <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-orange-600 font-medium">{product.brand}</span>
                                <div className="flex items-center">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-gray-600 ml-1">{product.rating} ({product.reviews})</span>
                                </div>
                            </div>

                            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                            <div className="flex items-center space-x-2 mb-3">
                                {product.colors.map((color, index) => (
                                    <div
                                        key={index}
                                        className="w-4 h-4 rounded-full border border-gray-300"
                                        style={{ backgroundColor: color }}
                                    ></div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-gray-900">${product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                                    )}
                                </div>
                                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            {currentStep === 'brands' && renderBrandSelection()}
            {currentStep === 'categories' && renderCategorySelection()}
            {currentStep === 'products' && renderProductCatalog()}
        </div>
    );
};

export default CollectionPage;