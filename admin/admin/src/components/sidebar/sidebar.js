import React, { useState, useEffect } from 'react';
import './style.css';

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

const Sidebar = () => {
    const [navTabs, setNavTabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

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

    const handleToggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            <nav id="sidebar" className={isCollapsed ? 'active' : ''}>
                <div className="custom-menu">
                    <button
                        type="button"
                        id="sidebarCollapse"
                        className="btn btn-primary"
                        onClick={handleToggleSidebar}
                    >
                        <i className="fa fa-bars"></i>
                        <span className="sr-only">Toggle Menu</span>
                    </button>
                </div>
                <div className="p-4">
                    <h1>
                        <a href="/" className="logo"
                        >Dashboard <span>Admin</span></a
                        >
                    </h1>
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

                    <div className="mb-5">
                        <h3 className="h6 mb-3">Subscribe for newsletter</h3>
                        <form action="#" className="subscribe-form">
                            <div className="form-group d-flex">
                                <div className="icon"><span className="icon-paper-plane"></span></div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Email Address"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="footer">
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
        </div>
    );
};

export default Sidebar; 