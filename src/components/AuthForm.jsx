import React from 'react';

const AuthForm = ({ 
  showLogin, 
  setShowLogin, 
  loginData, 
  setLoginData, 
  registerData, 
  setRegisterData, 
  handleLogin, 
  handleRegister, 
  loading, 
  error 
}) => {
  return (
    <div style={{ 
      background: `url('https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh'
    }}>
      <div style={{ 
        maxWidth: '450px', 
        margin: '0 auto', 
        padding: '20px 20px'
      }}>
        {/* Logo and Title Section */}
        <div style={{ 
          textAlign: 'center',
          marginBottom: '25px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '15px',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <span style={{ 
              fontSize: '28px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}>
              PM
            </span>
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: '700',
              margin: '0',
              color: '#1f2937'
            }}>
              Product Management
            </h1>
          </div>
          <p style={{ 
            margin: '0',
            color: '#6b7280',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Welcome! Please sign in to continue
          </p>
        </div>
        
        {error && (
          <div style={{ 
            background: '#fef2f2', 
            border: '1px solid #fecaca',
            padding: '12px', 
            borderRadius: '10px',
            marginBottom: '20px',
            color: '#dc2626',
            textAlign: 'center',
            fontWeight: '600'
          }}>
            {error}
          </div>
        )}

        {showLogin ? (
          <div style={{ 
            background: '#ffffff', 
            padding: '25px', 
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              color: '#1f2937',
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '6px',
              textAlign: 'center'
            }}>
              Welcome Back
            </h2>
            <p style={{ 
              color: '#6b7280',
              fontSize: '14px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              Sign in to your account
            </p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="email" 
                placeholder="Email (try: admin@example.com)" 
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
                style={{ 
                  padding: '16px', 
                  borderRadius: '10px', 
                  border: '2px solid #e5e7eb', 
                  outline: 'none',
                  fontSize: '16px',
                  transition: 'border-color 0.2s',
                  color: '#374151'
                }} 
              />
              <input 
                type="password" 
                placeholder="Password (try: password)" 
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
                style={{ 
                  padding: '16px', 
                  borderRadius: '10px', 
                  border: '2px solid #e5e7eb', 
                  outline: 'none',
                  fontSize: '16px',
                  transition: 'border-color 0.2s',
                  color: '#374151'
                }} 
              />
              <button 
                type="submit"
                disabled={loading}
                style={{ 
                  padding: '16px',
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '700',
                  fontSize: '16px',
                  boxShadow: loading ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.2s'
                }}
              >
                {loading ? 'Signing in...' : '🔐 Sign In'}
              </button>
            </form>
            <p style={{ 
              marginTop: '15px', 
              textAlign: 'center',
              color: '#6b7280'
            }}>
              Don't have an account?{' '}
              <button 
                onClick={() => setShowLogin(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#8b5cf6', 
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: '600',
                  fontSize: '16px'
                }}
              >
                Create Account
              </button>
            </p>
          </div>
        ) : (
          <div style={{ 
            background: '#ffffff', 
            padding: '25px', 
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              color: '#1f2937',
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '6px',
              textAlign: 'center'
            }}>
              Create Account
            </h2>
            <p style={{ 
              color: '#6b7280',
              fontSize: '14px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              Join us to manage your products
            </p>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={registerData.name}
                onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                required
                style={{ 
                  padding: '16px', 
                  borderRadius: '10px', 
                  border: '2px solid #e5e7eb', 
                  outline: 'none',
                  fontSize: '16px',
                  transition: 'border-color 0.2s',
                  color: '#374151'
                }} 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                required
                style={{ 
                  padding: '16px', 
                  borderRadius: '10px', 
                  border: '2px solid #e5e7eb', 
                  outline: 'none',
                  fontSize: '16px',
                  transition: 'border-color 0.2s',
                  color: '#374151'
                }} 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                required
                style={{ 
                  padding: '16px', 
                  borderRadius: '10px', 
                  border: '2px solid #e5e7eb', 
                  outline: 'none',
                  fontSize: '16px',
                  transition: 'border-color 0.2s',
                  color: '#374151'
                }} 
              />
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                required
                style={{ 
                  padding: '16px', 
                  borderRadius: '10px', 
                  border: '2px solid #e5e7eb', 
                  outline: 'none',
                  fontSize: '16px',
                  transition: 'border-color 0.2s',
                  color: '#374151'
                }} 
              />
              <button 
                type="submit"
                disabled={loading}
                style={{ 
                  padding: '12px', 
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '700',
                  fontSize: '16px',
                  boxShadow: loading ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.2s'
                }}
              >
                {loading ? 'Creating Account...' : '🚀 Create Account'}
              </button>
            </form>
            <p style={{ 
              marginTop: '15px', 
              textAlign: 'center',
              color: '#6b7280'
            }}>
              Already have an account?{' '}
              <button 
                onClick={() => setShowLogin(true)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#8b5cf6', 
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: '600',
                  fontSize: '16px'
                }}
              >
                Sign In
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
