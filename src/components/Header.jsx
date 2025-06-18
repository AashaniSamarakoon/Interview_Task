import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px 0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ 
            fontSize: '28px',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#1f2937',
            padding: '10px 14px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}>
            PM
          </span>
          Product Management
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '16px' }}>Welcome, {user?.name}</span>
          <button 
            onClick={onLogout}
            style={{ 
              padding: '10px 20px', 
              background: 'rgba(255,255,255,0.15)', 
              color: 'white',
              border: '2px solid rgba(255,255,255,0.25)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
