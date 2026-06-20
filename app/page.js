"use client"
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div style={{ 
      backgroundColor: '#FFFFFF', 
      minHeight: '100vh', 
      color: '#000000',
      fontFamily: 'Satoshi, sans-serif'
    }}>
      {/* Imported Navbar Component */}
      {/* <Navbar /> */}

      {/* Main Hero Section */}
      <main style={{
        padding: '30px 5vw 40px',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        
        {/* Subtle Feature Tag */}
        <div style={{
          background: '#f5f5f5',
          border: '1px solid #e5e5e5',
          padding: '6px 16px',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: 500,
          marginBottom: '24px',
          letterSpacing: '-0.01em'
        }}>
          Next-Gen Document Intelligence
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontFamily: 'Gerbil, serif',
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 400,
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          maxWidth: '850px',
          margin: '0 0 24px 0',
          color: '#000000'
        }}>
          Chat with your PDFs <br />
          <span style={{ color: '#666666' }}>and find answers instantly.</span>
        </h1>

        {/* Hero Subtitle */}
        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          fontWeight: 400,
          color: '#555555',
          maxWidth: '600px',
          lineHeight: '1.5',
          margin: '0 0 40px 0'
        }}>
          Upload your documents and let our engine extract insights, summarize data, and answer complex queries in real-time.
        </p>

        {/* Primary Call to Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Link href="/upload">
            <button style={{
              background: '#000000',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '999px',
              padding: '16px 36px',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#222222'}
            onMouseLeave={e => e.currentTarget.style.background = '#000000'}
            >
              Get Started for Free
            </button>
          </Link>

          <Link href="/chat">
            <button style={{
              background: 'transparent',
              color: '#000000',
              border: '1px solid #E5E5E5',
              borderRadius: '999px',
              padding: '16px 36px',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#f9f9f9';
              e.currentTarget.style.borderColor = '#adadad';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = '#E5E5E5';
            }}
            >
              Open Active Chat
            </button>
          </Link>
        </div>

        {/* Dynamic Feature Preview Block */}
        <div style={{
          marginTop: '80px',
          width: '100%',
          maxWidth: '1000px',
          background: '#FAFAFA',
          border: '1px solid #ECECEC',
          borderRadius: '24px',
          padding: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          textAlign: 'left'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 10px 0' }}>1. Upload PDFs</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>Drop your manuals, research papers, or legal financial sheets securely into our drive.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 10px 0' }}>2. Smart Processing</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>Our context engine instantly reads, vectorizes, and map-indexes your uploaded information.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 10px 0' }}>3. Ask Anything</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>Get comprehensive, deeply accurate contextual text answers backed directly by citations.</p>
          </div>
        </div>

      </main>
    </div>
  );
}