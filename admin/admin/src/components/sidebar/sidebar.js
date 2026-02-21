import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                    <div className="flex-grow-1">
                        <h1>
                            <a href="/" className="logo">
                                Dashboard <span>Admin</span>
                            </a>
                        </h1>
                        <ul className="list-unstyled components mb-5 text-white">
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

                    <div className="footer mt-3 mb-2 text-center" style={{ fontSize: '0.8rem', opacity: '0.7' }}>
                        <p className="mb-0">
                            Copyright &copy; {new Date().getFullYear()} All rights reserved by Grand Home
                        </p>
                        <div className="d-flex align-items-center justify-content-between">
                            <Link to="/sidebar-setting" className="d-flex align-items-center text-white text-decoration-none py-2 px-3" style={{ borderRadius: '8px', transition: 'all 0.3s' }}>
                                <span>
                                    <i className="fa fa-cog mr-3" style={{ fontSize: '1.2rem' }}></i>
                                </span>
                            </Link>
                            <div className="d-flex align-items-center text-white text-decoration-none py-2 px-3" style={{ borderRadius: '8px', transition: 'all 0.3s' }}>
                                <span>
                                    <i className="fa fa-user mr-3" style={{ fontSize: '1.2rem' }}></i>
                                </span>
                                User
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;