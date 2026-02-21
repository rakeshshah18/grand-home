import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './style.css';
import './responsive.css';

// Recursive component to render navigation items with children
const NavItem = ({ item, level = 0, isFirst = false, parentPath = '' }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const handleToggle = (e) => {
        if (hasChildren) {
            e.preventDefault();
            setIsExpanded(!isExpanded);
        }
    };

    // Fix: Use the last part of the URL as a slug for nested items to prevent duplication (Synced with SidebarSetting.js)
    let slug = item.url || item.name.toLowerCase().replace(/\s+/g, '-');
    if (level > 0 && slug.includes('/') && !slug.startsWith('http')) {
        const parts = slug.split('/').filter(x => x);
        slug = parts[parts.length - 1] || slug;
    }

    const fullPath = (level === 0
        ? (slug.startsWith('/') ? slug : `/${slug}`)
        : `${parentPath}/${slug.replace(/^\//, '')}`
    ).replace(/\/+/g, '/');

    return (
        <>
            <li className={isFirst ? 'active' : ''}>
                <Link
                    to={hasChildren ? '#' : fullPath}
                    onClick={handleToggle}
                    style={{ paddingLeft: `${level * 20 + 15}px`, textDecoration: 'none' }}
                    className={hasChildren ? 'has-children d-flex align-items-center' : 'd-flex align-items-center'}
                >
                    <span className="mr-1"></span>
                    {item.name}
                    {hasChildren && (
                        <span className={`dropdown-toggle-icon ml-auto ${isExpanded ? 'expanded' : ''}`}>
                            <i className={`fa fa-chevron-${isExpanded ? 'down' : 'right'}`}></i>
                        </span>
                    )}
                </Link>
            </li>
            {hasChildren && isExpanded && (
                <ul className="list-unstyled sub-menu">
                    {item.children.map((child, index) => (
                        <NavItem
                            key={child._id || index}
                            item={child}
                            level={level + 1}
                            isFirst={false}
                            parentPath={fullPath}
                        />
                    ))}
                </ul>
            )}
        </>
    );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [navTabs, setNavTabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNavTabs = async () => {
            try {
                const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
                const url = `${baseUrl}/api/navtab/`;
                console.log('Fetching from:', url);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch navigation tabs: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                console.log('API Response:', result);

                // Extract the data array from the nested response
                if (result.success && result.data) {
                    setNavTabs(result.data);
                } else {
                    setNavTabs([]);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching nav tabs:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchNavTabs();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* Hamburger button for mobile */}
            <button
                className="hamburger-btn"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                <i className="fa fa-bars"></i>
            </button>

            {/* Desktop toggle button - outside sidebar */}
            <button
                type="button"
                className={`desktop-toggle-btn ${isOpen ? 'sidebar-is-open' : 'sidebar-is-closed'}`}
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                <i className="fa fa-bars"></i>
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <nav id="sidebar" className={isOpen ? 'sidebar-open' : 'sidebar-closed'}>
                <div className="p-4 h-100 d-flex flex-column">
                    <div className="flex-grow-1 text-white">
                        <div className="mb-4">
                            <h1>
                                <Link to="/" className="logo">
                                    Dashboard <span>Admin</span>
                                </Link>
                            </h1>
                        </div>
                        <ul className="list-unstyled components mb-5">
                            {loading ? (
                                <li>Loading...</li>
                            ) : error ? (
                                <li>Error: {error}</li>
                            ) : (
                                navTabs.map((tab, index) => (
                                    <NavItem
                                        key={tab._id || index}
                                        item={tab}
                                        level={0}
                                        isFirst={index === 0}
                                    />
                                ))
                            )}
                        </ul>
                    </div>

                    <div className="footer mt-auto pt-3 border-top" style={{ fontSize: '0.8rem', opacity: '0.8' }}>
                        <div className="d-flex align-items-center justify-content-between mb-3 px-2">
                            <Link to="/sidebar-setting" className="text-white" title="Settings">
                                <i className="fa fa-cog" style={{ fontSize: '1.2rem' }}></i>
                            </Link>

                            {/* <div className="d-flex align-items-center text-white">
                                <i className="fa fa-user-circle mr-2" style={{ fontSize: '1.2rem' }}></i>
                                <span className="text-truncate" style={{ maxWidth: '80px' }}>{user?.username || 'User'}</span>
                            </div> */}

                            <button
                                onClick={handleLogout}
                                className="btn btn-link p-0 text-danger"
                                title="Logout"
                                style={{ textDecoration: 'none' }}
                            >
                                <i className="fa fa-sign-out" style={{ fontSize: '1.2rem' }}></i>
                            </button>
                        </div>
                        <p className="mb-0 text-muted">
                            &copy; {new Date().getFullYear()} Grand Home
                        </p>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;