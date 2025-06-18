import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, AuthForm, CategoryFilter, ProductForm, ProductList } from './components';

const App = () => {
  // Authentication state
  const [showLogin, setShowLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  // Register form state
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  // Products state
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    title: '', 
    description: '', 
    imageBase64: null, 
    imageFile: null, 
    category: 'Electronics' 
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [editProduct, setEditProduct] = useState({ 
    title: '', 
    description: '', 
    imageBase64: null, 
    imageFile: null, 
    category: 'Electronics' 
  });
  const [imagePreview, setImagePreview] = useState('');
  const [editImagePreview, setEditImagePreview] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Constants
  const API_URL = 'http://localhost:5000/api';
  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports & Fitness'];
  const categoryColors = {
    'Electronics': '#667eea',
    'Fashion': '#667eea', 
    'Home & Garden': '#667eea',
    'Sports & Fitness': '#667eea'
  };

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Test image loading function
  const testImageLoad = async (imagePath) => {
    try {
      const response = await fetch(`http://localhost:5000${imagePath}`);
      if (response.ok) {
        console.log('✅ Image accessible:', imagePath);
        return true;
      } else {
        console.error('❌ Image not accessible:', imagePath, 'Status:', response.status);
        return false;
      }
    } catch (error) {
      console.error('❌ Error testing image:', imagePath, error);
      return false;
    }
  };

  // Test backend connectivity
  const testBackendConnection = async () => {
    try {
      console.log('Testing backend connection...');
      const response = await axios.get(`${API_URL}/health`);
      console.log('✅ Backend connection successful:', response.data);
      
      // Test if uploads directory is accessible
      try {
        const uploadsTest = await fetch('http://localhost:5000/uploads/products/');
        console.log('📁 Uploads directory status:', uploadsTest.status);
        if (uploadsTest.status === 403 || uploadsTest.status === 200) {
          console.log('✅ Uploads directory is accessible');
        }
      } catch (uploadError) {
        console.warn('⚠️ Could not test uploads directory:', uploadError.message);
      }
      
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      setError('Cannot connect to server. Please check if backend is running.');
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchProfile();
    }
    
    // Test backend connectivity
    testBackendConnection();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/profile`);
      setUser(response.data.user);
      setIsAuthenticated(true);
      fetchProducts();
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Fetched products:', response.data.products);
      // Debug: Log image paths
      response.data.products.forEach(product => {
        if (product.image || product.imageBase64) {
          console.log(`Product "${product.title}" image path:`, product.image);
          console.log(`Product "${product.title}" base64:`, product.imageBase64 ? 'Present' : 'None');
          if (product.image) {
            console.log(`Full image URL: http://localhost:5000${product.image}`);
          }
        }
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Attempting login with:', loginData);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, loginData);
      console.log('Login response:', response.data);
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      fetchProducts();
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      setError(error.response?.data?.message || 'Login failed');
    }
    
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Attempting registration with:', registerData);

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password
      });
      
      console.log('Registration response:', response.data);
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      fetchProducts();
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      setError(error.response?.data?.message || 'Registration failed');
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
    setProducts([]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    console.log('Attempting to add product:', newProduct);
    console.log('Current token:', localStorage.getItem('token'));
    
    // Basic validation
    if (!newProduct.title.trim()) {
      setError('Product title is required');
      return;
    }
    
    if (newProduct.title.trim().length < 3) {
      setError('Product title must be at least 3 characters long');
      return;
    }
    
    if (!newProduct.description.trim()) {
      setError('Product description is required');
      return;
    }
    
    if (newProduct.description.trim().length < 10) {
      setError('Product description must be at least 10 characters long');
      return;
    }
    
    try {
      // Convert image to base64 if present
      let imageBase64 = null;
      if (newProduct.imageFile) {
        imageBase64 = await convertToBase64(newProduct.imageFile);
      }

      const productData = {
        title: newProduct.title,
        description: newProduct.description,
        category: newProduct.category,
        imageBase64: imageBase64
      };

      const response = await axios.post(`${API_URL}/products`, productData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      console.log('Add product response:', response.data);
      setProducts([...products, response.data.product]);
      setNewProduct({ title: '', description: '', imageBase64: null, imageFile: null, category: 'Electronics' });
      setImagePreview('');
      setShowAddForm(false);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error adding product:', error);
      console.error('Error response:', error.response?.data);
      setError(error.response?.data?.message || 'Failed to add product');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    
    console.log('Attempting to update product:', editProduct);
    
    // Basic validation
    if (!editProduct.title.trim()) {
      setError('Product title is required');
      return;
    }
    
    if (editProduct.title.trim().length < 3) {
      setError('Product title must be at least 3 characters long');
      return;
    }
    
    if (!editProduct.description.trim()) {
      setError('Product description is required');
      return;
    }
    
    if (editProduct.description.trim().length < 10) {
      setError('Product description must be at least 10 characters long');
      return;
    }
    
    try {
      // Convert image to base64 if new image is selected
      let imageBase64 = editingProduct.imageBase64; // Keep existing image
      if (editProduct.imageFile) {
        imageBase64 = await convertToBase64(editProduct.imageFile);
      }

      const productData = {
        title: editProduct.title,
        description: editProduct.description,
        category: editProduct.category,
        imageBase64: imageBase64
      };

      const response = await axios.put(`${API_URL}/products/${editingProduct.id}`, productData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      console.log('Update product response:', response.data);
      
      // Update the product in the list
      setProducts(products.map(p => 
        p.id === editingProduct.id ? response.data.product : p
      ));
      
      setEditingProduct(null);
      setEditProduct({ title: '', description: '', imageBase64: null, imageFile: null, category: 'Electronics' });
      setEditImagePreview('');
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error updating product:', error);
      console.error('Error response:', error.response?.data);
      setError(error.response?.data?.message || 'Failed to update product');
    }
  };

  const startEditProduct = (product) => {
    setEditingProduct(product);
    setEditProduct({ 
      title: product.title, 
      description: product.description, 
      category: product.category || 'Electronics',
      imageFile: null 
    });
    setEditImagePreview(product.imageBase64 || ''); // Show existing image if any
    setShowAddForm(false); // Close add form if open
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setEditProduct({ title: '', description: '', imageBase64: null, imageFile: null, category: 'Electronics' });
    setEditImagePreview('');
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // If authenticated, show products page
  if (isAuthenticated) {
    return (
      <div style={{ 
        background: '#ffffff',
        minHeight: '100vh'
      }}>
        <Header user={user} onLogout={handleLogout} />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
          {/* Add Product Button */}
          <div style={{ marginBottom: '30px' }}>
            <button 
              onClick={() => {
                setShowAddForm(!showAddForm);
                if (!showAddForm) {
                  // Cancel any ongoing edit when starting to add
                  setEditingProduct(null);
                  setEditProduct({ title: '', description: '', category: 'Electronics' });
                }
              }}
              style={{ 
                padding: '14px 28px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.2s'
              }}
            >
              {showAddForm ? '✕ Cancel' : '+ Add New Product'}
            </button>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            products={products}
            categoryColors={categoryColors}
          />

          {/* Error Display */}
          {error && (
            <div style={{ 
              background: 'rgba(220, 38, 38, 0.2)', 
              border: '1px solid rgba(220, 38, 38, 0.5)',
              padding: '10px', 
              borderRadius: '8px',
              marginBottom: '20px',
              color: '#fca5a5'
            }}>
              {error}
            </div>
          )}

          {/* Add Product Form */}
          {showAddForm && (
            <ProductForm
              isEditing={false}
              product={newProduct}
              setProduct={setNewProduct}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              categories={categories}
              onSubmit={handleAddProduct}
              onCancel={() => setShowAddForm(false)}
              convertToBase64={convertToBase64}
            />
          )}

          {/* Edit Product Form */}
          {editingProduct && (
            <ProductForm
              isEditing={true}
              product={editProduct}
              setProduct={setEditProduct}
              editingProduct={editingProduct}
              imagePreview={editImagePreview}
              setImagePreview={setEditImagePreview}
              categories={categories}
              onSubmit={handleUpdateProduct}
              onCancel={cancelEdit}
              convertToBase64={convertToBase64}
            />
          )}

          <ProductList
            products={products}
            selectedCategory={selectedCategory}
            categoryColors={categoryColors}
            onEditProduct={startEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onShowAddForm={() => setShowAddForm(true)}
          />
        </div>
      </div>
    );
  }

  // Login/Register page
  return (
    <AuthForm 
      showLogin={showLogin}
      setShowLogin={setShowLogin}
      loginData={loginData}
      setLoginData={setLoginData}
      registerData={registerData}
      setRegisterData={setRegisterData}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      loading={loading}
      error={error}
    />
  );
};

export default App;
