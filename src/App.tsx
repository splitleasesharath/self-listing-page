import React, { useState } from 'react';
import { SelfListingPage } from './components/SelfListingPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'self-listing' | 'create-duplicate'>('self-listing');

  return (
    <div className="app">
      {/* Simple navigation for demo purposes */}
      <nav style={{
        padding: '1rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        marginBottom: '0',
        display: 'flex',
        gap: '1rem'
      }}>
        <button
          onClick={() => setCurrentPage('self-listing')}
          style={{
            padding: '0.5rem 1.5rem',
            background: currentPage === 'self-listing' ? '#ffffff' : 'transparent',
            color: currentPage === 'self-listing' ? '#764ba2' : '#ffffff',
            border: '2px solid #ffffff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          Self Listing Page
        </button>
        <button
          onClick={() => setCurrentPage('create-duplicate')}
          style={{
            padding: '0.5rem 1.5rem',
            background: currentPage === 'create-duplicate' ? '#ffffff' : 'transparent',
            color: currentPage === 'create-duplicate' ? '#764ba2' : '#ffffff',
            border: '2px solid #ffffff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          Create Duplicate Listings
        </button>
      </nav>

      {currentPage === 'self-listing' && <SelfListingPage />}
      {currentPage === 'create-duplicate' && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Create Duplicate Listings</h2>
          <p>This feature is coming soon...</p>
        </div>
      )}
    </div>
  );
}

export default App;
