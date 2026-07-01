"use client"
import React from 'react'
import { useState, useEffect } from "react";
import Link from "next/link"; // Imported Next.js Link component

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Updated to an array of objects to map names to your requested paths
  const NAV_LINKS = [
    { name: "Chat", path: "/chat" },
    { name: "Upload", path: "/upload" },
    // { name: "Contact", path: "/contact" }
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: "70px", zIndex: 100, background: "#FFFFFF",
      borderBottom: scrolled ? "1px solid #f3f3f3" : "none",
      transition: "all 0.3s ease", padding: "0 5vw",
    }}>
      <div style={{
        maxWidth: 1600, margin: "0 auto",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "70px",
      }}>
        {/* Added route to home page for the logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "Gerbil, serif", fontWeight: 400,
            fontSize: "24px", color: "#000", cursor: "pointer",
          }}>PDF Query</span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: "flex", gap: "40px", alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            <Link 
              key={l.name} 
              href={l.path} 
              style={{
                fontFamily: "Satoshi, sans-serif", fontWeight: 500,
                fontSize: "16px", color: "#000000", textDecoration: "none", transition: "all 0.3s ease",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              {l.name}
            </Link>
          ))}
          <Link href="/contact">
            <button style={{
              background: "#000", color: "#fff", border: "none",
              borderRadius: "999px", padding: "11px 24px",
              fontFamily: "Satoshi, sans-serif", fontWeight: 500,
              fontSize: "15px", cursor: "pointer", transition: "0.3s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "#333"}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "#111"}
            >
              Get in touch
            </button>
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button onClick={() => setOpen(!open)} style={{
          display: "none", background: "none", border: "none",
          cursor: "pointer", padding: 4,
        }} className="hamburger">
          <div style={{ width: 24, height: 2, background: "#111", margin: "5px 0", transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px,5px)" : "" }} />
          <div style={{ width: 24, height: 2, background: "#111", margin: "5px 0", opacity: open ? 0 : 1, transition: "all 0.3s" }} />
          <div style={{ width: 24, height: 2, background: "#111", margin: "5px 0", transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "" }} />
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {open && (
        <div style={{ padding: "20px 5vw 28px", borderTop: "1px solid #f0f0f0", background: "#fff" }}>
          {NAV_LINKS.map(l => (
            <Link 
              key={l.name} 
              href={l.path} 
              onClick={() => setOpen(false)} // Closes menu on link click
              style={{
                display: "block", fontFamily: "'DM Sans', sans-serif",
                fontSize: 16, color: "#333", textDecoration: "none",
                padding: "10px 0", borderBottom: "1px solid #f5f5f5",
              }}
            >
              {l.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}>
            <button style={{
              marginTop: 16, background: "#000", color: "#fff", border: "none",
              borderRadius: "999px", padding: "11px 24px",
              fontFamily: "Satoshi, sans-serif", fontWeight: 500,
              fontSize: "15px", cursor: "pointer", width: "100%",
            }}>
              Get in touch
            </button>
          </Link>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .hamburger { display: block !important; } }
      `}</style>
    </nav>
  );
};

export default Navbar;