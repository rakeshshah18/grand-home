import React, { useState, useEffect } from 'react';
import './style.css';
import './responsive.css';

// Recursive component to render navigation items with children
const NavItem = ({ item, level = 0, isFirst = false }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const handleToggle = (e) => {
        if (hasChildren) {
            e.preventDefault();
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <>
            <li className={isFirst ? 'active' : ''}>
                <a
                    href={item.url || '#'}
                    onClick={handleToggle}
                    style={{ paddingLeft: `${level * 20 + 15}px` }}
                    className={hasChildren ? 'has-children' : ''}
                >
                    <span className="mr-1"></span>
                    {item.name}
                    {hasChildren && (
                        <span className={`dropdown-toggle-icon ${isExpanded ? 'expanded' : ''}`}>
                            <i className={`fa fa-chevron-${isExpanded ? 'down' : 'right'}`}></i>
                        </span>
                    )}
                </a>
            </li>
            {hasChildren && isExpanded && (
                <ul className="list-unstyled sub-menu">
                    {item.children.map((child, index) => (
                        <NavItem
                            key={child._id || index}
                            item={child}
                            level={level + 1}
                            isFirst={false}
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
                <div className="p-4">
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


                    <div className="footer" style={{ position: "absolute", bottom: "0", left: "0", right: "0", textAlign: "center" }}>
                        <p>
                            Copyright &copy;
                            <script>
                                document.write(new Date().getFullYear());
                            </script>
                            All rights reserved
                        </p>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;