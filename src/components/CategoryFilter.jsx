import React from 'react';

const CategoryFilter = ({ categories, categoryColors, selectedCategory, setSelectedCategory, products }) => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ 
          color: '#1f2937', 
          fontSize: '32px', 
          fontWeight: '800',
          marginBottom: '12px'
        }}>
          Product Categories
        </h2>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '18px',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Explore our products organized across 4 main categories. Click on any category to view products or browse all.
        </p>
      </div>

      {/* Category Filter Cards */}
      <div style={{ 
        display: 'flex',
        gap: '16px',
        marginBottom: '30px',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setSelectedCategory('All')}
          style={{
            padding: '16px 20px',
            minWidth: '180px',
            background: selectedCategory === 'All' 
              ? 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)' 
              : '#ffffff',
            color: selectedCategory === 'All' ? 'white' : '#374151',
            border: selectedCategory === 'All' ? 'none' : '2px solid #e5e7eb',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '14px',
            transition: 'all 0.3s',
            boxShadow: selectedCategory === 'All' 
              ? '0 6px 20px rgba(107, 114, 128, 0.3)' 
              : '0 3px 10px rgba(0, 0, 0, 0.06)',
            textAlign: 'center',
            minHeight: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transform: selectedCategory === 'All' ? 'translateY(-1px)' : 'none',
            flexShrink: 0
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '6px' }}>🏪</div>
          <div style={{ fontSize: '14px', marginBottom: '2px' }}>All Categories</div>
          <div style={{ 
            fontSize: '12px', 
            opacity: '0.8',
            fontWeight: '600'
          }}>
            {products.length} products
          </div>
        </button>

        {categories.map(category => {
          const categoryCount = products.filter(p => p.category === category).length;
          const categoryIcons = {
            'Electronics': '📱',
            'Fashion': '👗',
            'Home & Garden': '🏡',
            'Sports & Fitness': '🏃‍♂️'
          };

          const gradientColors = {
            'Electronics': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'Fashion': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'Home & Garden': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'Sports & Fitness': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          };

          const shadowColors = {
            'Electronics': 'rgba(102, 126, 234, 0.4)',
            'Fashion': 'rgba(102, 126, 234, 0.4)',
            'Home & Garden': 'rgba(102, 126, 234, 0.4)',
            'Sports & Fitness': 'rgba(102, 126, 234, 0.4)'
          };

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '16px 20px',
                minWidth: '180px',
                background: selectedCategory === category 
                  ? gradientColors[category]
                  : '#ffffff',
                color: selectedCategory === category ? 'white' : '#374151',
                border: selectedCategory === category ? 'none' : '2px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '14px',
                transition: 'all 0.3s',
                boxShadow: selectedCategory === category 
                  ? `0 6px 20px ${shadowColors[category]}` 
                  : '0 3px 10px rgba(0, 0, 0, 0.06)',
                textAlign: 'center',
                minHeight: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transform: selectedCategory === category ? 'translateY(-1px)' : 'none',
                flexShrink: 0
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>
                {categoryIcons[category]}
              </div>
              <div style={{ fontSize: '14px', marginBottom: '2px' }}>{category}</div>
              <div style={{ 
                fontSize: '12px', 
                opacity: '0.8',
                fontWeight: '600'
              }}>
                {categoryCount} product{categoryCount !== 1 ? 's' : ''}
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Selection Indicator */}
      <div style={{ 
        textAlign: 'center',
        padding: '15px',
        background: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <span style={{ color: '#64748b', fontWeight: '500' }}>
          Currently viewing: 
        </span>
        <span style={{ 
          color: selectedCategory === 'All' ? '#667eea' : categoryColors[selectedCategory],
          fontWeight: '700',
          marginLeft: '8px'
        }}>
          {selectedCategory === 'All' ? 'All Categories' : selectedCategory}
        </span>
        <span style={{ color: '#64748b', marginLeft: '8px' }}>
          ({products.filter(product => selectedCategory === 'All' || product.category === selectedCategory).length} products)
        </span>
      </div>
    </div>
  );
};

export default CategoryFilter;
