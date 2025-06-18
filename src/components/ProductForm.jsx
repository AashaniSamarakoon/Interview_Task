import React from 'react';

const ProductForm = ({ 
  isEditing,
  showAddForm,
  categories,
  product,
  setProduct,
  imagePreview,
  setImagePreview,
  onSubmit,
  onCancel,
  setProduct: setProductProp // Allow both setNewProduct and setEditProduct
}) => {
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the file temporarily for processing
      setProduct({...product, imageFile: file});
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => setImagePreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProduct({...product, imageFile: null});
    setImagePreview('');
  };

  if (!showAddForm && !isEditing) {
    return null;
  }

  return (
    <div style={{ 
      background: '#f8f9fa', 
      padding: '35px', 
      borderRadius: '20px',
      marginBottom: '35px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header with gradient background */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '4px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}></div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '1px solid #e9ecef'
      }}>
        <h3 style={{ 
          color: '#1f2937', 
          fontSize: '26px', 
          fontWeight: '700',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {isEditing ? '✏️ Edit Product' : '➕ Add New Product'}
        </h3>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {isEditing ? 'Editing Mode' : 'Create Mode'}
        </div>
      </div>

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Title Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ 
            color: '#374151', 
            fontWeight: '600',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            📝 Product Title
          </label>
          <input 
            type="text" 
            placeholder="Enter product title (minimum 3 characters)" 
            value={product.title}
            onChange={(e) => setProduct({...product, title: e.target.value})}
            required
            style={{ 
              padding: '14px 16px', 
              borderRadius: '12px', 
              border: '1px solid #dee2e6', 
              outline: 'none',
              fontSize: '15px',
              transition: 'all 0.2s',
              backgroundColor: '#ffffff'
            }} 
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 2px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#dee2e6';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Description Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ 
            color: '#374151', 
            fontWeight: '600',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            📄 Product Description
          </label>
          <textarea 
            placeholder="Enter detailed product description (minimum 10 characters)" 
            value={product.description}
            onChange={(e) => setProduct({...product, description: e.target.value})}
            required
            rows="4"
            style={{ 
              padding: '14px 16px', 
              borderRadius: '12px', 
              border: '1px solid #dee2e6', 
              outline: 'none',
              resize: 'vertical',
              fontSize: '15px',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
              backgroundColor: '#ffffff'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 2px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#dee2e6';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Category Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ 
            color: '#374151', 
            fontWeight: '600',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            🏷️ Category
          </label>
          <select 
            value={product.category}
            onChange={(e) => setProduct({...product, category: e.target.value})}
            style={{ 
              padding: '14px 16px', 
              borderRadius: '12px', 
              border: '1px solid #dee2e6', 
              outline: 'none',
              backgroundColor: '#ffffff',
              color: '#374151',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 2px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#dee2e6';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = 'none';
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Image Upload */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ 
            color: '#374151', 
            fontWeight: '600',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            📷 Product Image
          </label>
          
          <div style={{
            border: '1px dashed #ced4da',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.target.style.borderColor = '#667eea';
            e.target.style.backgroundColor = '#f8f9ff';
          }}
          onDragLeave={(e) => {
            e.target.style.borderColor = '#ced4da';
            e.target.style.backgroundColor = '#ffffff';
          }}>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              style={{ 
                width: '100%',
                padding: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#6b7280'
              }} 
            />
            <p style={{
              margin: '8px 0 0 0',
              color: '#9ca3af',
              fontSize: '13px'
            }}>
              Drag & drop an image or click to browse
            </p>
          </div>

          {imagePreview && (
            <div style={{ 
              textAlign: 'center',
              padding: '15px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e9ecef'
            }}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ 
                  maxWidth: '200px', 
                  maxHeight: '150px', 
                  borderRadius: '8px',
                  objectFit: 'cover',
                  border: '1px solid #dee2e6'
                }} 
              />
              <br />
              <button 
                type="button"
                onClick={handleRemoveImage}
                style={{ 
                  marginTop: '12px',
                  padding: '6px 12px', 
                  background: '#ef4444', 
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                🗑️ Remove Image
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing ? (
          <div style={{ 
            display: 'flex', 
            gap: '15px',
            marginTop: '10px'
          }}>
            <button 
              type="submit"
              style={{ 
                padding: '14px 24px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '15px',
                flex: 1,
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
            >
              ✨ Update Product
            </button>
            <button 
              type="button"
              onClick={onCancel}
              style={{ 
                padding: '14px 24px', 
                background: '#f3f4f6',
                color: '#374151',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                flex: 1,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e5e7eb';
                e.target.style.borderColor = '#d1d5db';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
                e.target.style.borderColor = '#e5e7eb';
              }}
            >
              ❌ Cancel
            </button>
          </div>
        ) : (
          <button 
            type="submit"
            style={{ 
              padding: '14px 24px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '15px',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              marginTop: '10px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
            }}
          >
            ✨ Add Product
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
