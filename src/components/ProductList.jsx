import React from 'react';

const ProductList = ({ 
  products, 
  selectedCategory, 
  categoryColors, 
  onEditProduct, 
  onDeleteProduct, 
  onShowAddForm 
}) => {
  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  );

  return (
    <div style={{ marginBottom: '40px' }}>
      {/* Section Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '2px solid #e5e7eb'
      }}>
        <h3 style={{ 
          color: '#111827', 
          fontSize: '22px', 
          fontWeight: '700',
          margin: '0'
        }}>
          {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Products`}
        </h3>
        <div style={{ 
          background: selectedCategory === 'All' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : categoryColors[selectedCategory] || '#6b7280',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {filteredProducts.length} items
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '24px' 
      }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{ 
            background: '#ffffff', 
            padding: '24px', 
            borderRadius: '16px',
            color: '#374151',
            border: '2px solid #e5e7eb',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
          }}
          >
            {/* Category Badge */}
            <div style={{ 
              position: 'absolute',
              top: '0',
              right: '0',
              background: categoryColors[product.category] || '#6b7280',
              color: 'white',
              padding: '8px 16px',
              borderBottomLeftRadius: '12px',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {product.category || 'Uncategorized'}
            </div>

            {/* Product Image */}
            {(product.imageBase64 || product.image) ? (
              <div style={{ 
                marginBottom: '20px', 
                marginTop: '15px',
                textAlign: 'center',
                backgroundColor: '#f9fafb',
                padding: '15px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <img 
                  src={product.imageBase64 || `http://localhost:5000${product.image}`}
                  alt={product.title}
                  onError={(e) => {
                    console.error('❌ Image failed to load for product:', product.title);
                    console.error('  - Image source:', e.target.src);
                    
                    // Hide the broken image and show fallback
                    e.target.style.display = 'none';
                    const fallback = e.target.nextElementSibling;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                  onLoad={(e) => {
                    console.log('✅ Image loaded successfully for product:', product.title);
                    // Hide fallback if image loads
                    const fallback = e.target.nextElementSibling;
                    if (fallback) {
                      fallback.style.display = 'none';
                    }
                  }}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '220px', 
                    width: '100%',
                    height: '220px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    border: '1px solid #e5e7eb',
                    display: 'block'
                  }} 
                />
                {/* Fallback for failed images */}
                <div style={{ 
                  display: 'none',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '220px',
                  color: '#9ca3af',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ 
                    fontSize: '48px', 
                    marginBottom: '12px',
                    opacity: '0.5'
                  }}>
                    🖼️
                  </div>
                  <div style={{ 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#6b7280'
                  }}>
                    Image not available
                  </div>
                  <div style={{ 
                    fontSize: '12px',
                    color: '#9ca3af',
                    marginTop: '4px'
                  }}>
                    Failed to load image
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ 
                marginBottom: '20px', 
                marginTop: '15px',
                textAlign: 'center',
                backgroundColor: '#f9fafb',
                padding: '50px 15px',
                borderRadius: '12px',
                border: '2px dashed #d1d5db'
              }}>
                <div style={{ 
                  fontSize: '56px', 
                  opacity: '0.3',
                  marginBottom: '12px'
                }}>
                  🖼️
                </div>
                <div style={{ 
                  color: '#9ca3af', 
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  No image uploaded
                </div>
              </div>
            )}

            {/* Product Details */}
            <h3 style={{ 
              margin: '0 0 12px 0', 
              color: '#111827', 
              fontSize: '20px', 
              fontWeight: '700',
              lineHeight: '1.3'
            }}>
              {product.title}
            </h3>
            <p style={{ 
              margin: '0 0 20px 0', 
              color: '#6b7280', 
              lineHeight: '1.6',
              fontSize: '15px'
            }}>
              {product.description}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => onEditProduct(product)}
                style={{ 
                  padding: '6px 12px', 
                  background: '#64748b', 
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  flex: 1,
                  fontWeight: '600',
                  fontSize: '12px',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => e.target.style.background = '#475569'}
                onMouseLeave={(e) => e.target.style.background = '#64748b'}
              >
                ✏️ Edit
              </button>
              <button 
                onClick={() => onDeleteProduct(product.id)}
                style={{ 
                  padding: '6px 12px', 
                  background: '#e11d48', 
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  flex: 1,
                  fontWeight: '600',
                  fontSize: '12px',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => e.target.style.background = '#be185d'}
                onMouseLeave={(e) => e.target.style.background = '#e11d48'}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          color: '#6b7280', 
          marginTop: '60px',
          padding: '60px 40px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRadius: '20px',
          border: '2px dashed #cbd5e1'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px', opacity: '0.4' }}>
            {selectedCategory === 'All' ? '📦' : 
             selectedCategory === 'Electronics' ? '📱' :
             selectedCategory === 'Fashion' ? '👗' :
             selectedCategory === 'Home & Garden' ? '🏡' :
             selectedCategory === 'Sports & Fitness' ? '🏃‍♂️' : '📦'
            }
          </div>
          <h3 style={{ 
            color: '#374151', 
            marginBottom: '12px',
            fontSize: '24px',
            fontWeight: '700'
          }}>
            No products found
          </h3>
          <p style={{ 
            fontSize: '16px',
            lineHeight: '1.5',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            {selectedCategory === 'All' 
              ? 'Add your first product to get started!' 
              : `No products in ${selectedCategory} category yet. Add some products to this category!`
            }
          </p>
          {selectedCategory !== 'All' && (
            <button
              onClick={onShowAddForm}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                background: categoryColors[selectedCategory] || '#f97316',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.2s'
              }}
            >
              Add {selectedCategory} Product
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
