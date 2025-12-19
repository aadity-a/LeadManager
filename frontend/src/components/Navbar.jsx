import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Home } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            borderBottom: '1px solid #e5e7eb'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary-color)', borderRadius: '8px' }}></div>
                    ProjectManager
                </Link>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <Link to="/" className={`btn ${location.pathname === '/' ? 'btn-primary' : ''}`} style={{ color: location.pathname === '/' ? 'white' : 'inherit' }}>
                        <Home size={18} style={{ marginRight: '8px' }} />
                        Home
                    </Link>
                    <Link to="/admin" className={`btn ${location.pathname === '/admin' ? 'btn-primary' : ''}`} style={{ color: location.pathname === '/admin' ? 'white' : 'inherit' }}>
                        <LayoutDashboard size={18} style={{ marginRight: '8px' }} />
                        Admin Panel
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
