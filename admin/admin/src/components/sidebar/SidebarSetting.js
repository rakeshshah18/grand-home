import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SidebarSetting = () => {
    const [navTabs, setNavTabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal States
    const [showTabModal, setShowTabModal] = useState(false);
    const [editingNode, setEditingNode] = useState(null); // { node, rootId, parentId }
    const [isCreating, setIsCreating] = useState(false); // Creating new vs editing
    const [modalData, setModalData] = useState({ name: '', url: '', order: 0, isActive: true });
    const [modalContext, setModalContext] = useState(null); // { parentId, rootId }

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

    const getHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };
    };

    useEffect(() => {
        fetchNavTabs();
    }, []);

    const fetchNavTabs = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/navtab/`);
            const result = await response.json();
            if (result.success) {
                setNavTabs(result.data);
            } else {
                setError(result.message);
            }
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleOpenModal = (node = null, parentId = null, rootId = null) => {
        if (node) {
            // Edit mode
            setIsCreating(false);
            setEditingNode(node);
            setModalData({
                name: node.name,
                url: node.url || '',
                order: node.order || 0,
                isActive: node.isActive !== undefined ? node.isActive : true
            });
            setModalContext({ parentId, rootId });
        } else {
            // Create mode
            setIsCreating(true);
            setEditingNode(null);
            setModalData({ name: '', url: '', order: 0, isActive: true });
            setModalContext({ parentId, rootId });
        }
        setShowTabModal(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isCreating) {
                if (!modalContext.parentId) {
                    // Create Root Tab
                    response = await fetch(`${baseUrl}/api/navtab/`, {
                        method: 'POST',
                        headers: getHeaders(),
                        body: JSON.stringify(modalData)
                    });
                } else {
                    // Create Child (at any level)
                    response = await fetch(`${baseUrl}/api/navtab/${modalContext.parentId}/children`, {
                        method: 'POST',
                        headers: getHeaders(),
                        body: JSON.stringify(modalData)
                    });
                }
            } else {
                // Update Node (parentId in URL is actually the rootId for deep update)
                // If it's a root tab, childId and parentId are the same
                const rootId = modalContext.rootId || editingNode._id;
                response = await fetch(`${baseUrl}/api/navtab/${rootId}/children/${editingNode._id}`, {
                    method: 'PUT',
                    headers: getHeaders(),
                    body: JSON.stringify(modalData)
                });
            }

            const result = await response.json();
            if (result.success) {
                if (isCreating && !modalContext.parentId) {
                    setNavTabs([...navTabs, result.data]);
                } else {
                    // result.data is the updated root document
                    setNavTabs(navTabs.map(tab => tab._id === result.data._id ? result.data : tab));
                }
                setShowTabModal(false);
            } else {
                alert(result.message);
            }
        } catch (err) {
            alert('Operation failed: ' + err.message);
        }
    };

    const handleDelete = async (nodeId, rootId = null) => {
        if (!window.confirm('Are you sure? This will delete this item and ALL its nested children.')) return;

        try {
            let response;
            const headers = getHeaders();
            if (!rootId) {
                // Delete Root Tab
                response = await fetch(`${baseUrl}/api/navtab/${nodeId}`, {
                    method: 'DELETE',
                    headers
                });
            } else {
                // Delete Child at any level
                response = await fetch(`${baseUrl}/api/navtab/${rootId}/children/${nodeId}`, {
                    method: 'DELETE',
                    headers
                });
            }

            const result = await response.json();
            if (result.success) {
                if (!rootId) {
                    setNavTabs(navTabs.filter(t => t._id !== nodeId));
                } else {
                    setNavTabs(navTabs.map(tab => tab._id === result.data._id ? result.data : tab));
                }
            }
        } catch (err) {
            alert('Deletion failed: ' + err.message);
        }
    };

    // Recursive component for rendering levels
    const NavNode = ({ node, level = 0, rootId = null, parentPath = '' }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const hasChildren = node.children && node.children.length > 0;
        const currentRootId = rootId || node._id;

        // Fix: Use the last part of the URL as a slug for nested items to prevent duplication
        let slug = node.url || node.name.toLowerCase().replace(/\s+/g, '-');
        if (level > 0 && slug.includes('/') && !slug.startsWith('http')) {
            const parts = slug.split('/').filter(x => x);
            slug = parts[parts.length - 1] || slug;
        }

        const fullPath = (level === 0
            ? (slug.startsWith('/') ? slug : `/${slug}`)
            : `${parentPath}/${slug.replace(/^\//, '')}`
        ).replace(/\/+/g, '/');

        return (
            <div className={`node-item mb-2 ${level > 0 ? 'ml-4 pl-3 border-left' : ''}`} style={{ transition: 'all 0.3s' }}>
                <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '12px', border: level === 0 ? '1px solid #e2e8f0' : 'none', background: level % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <div className="card-body p-3 d-flex align-items-center justify-content-between">
                        <div
                            className="d-flex align-items-center flex-grow-1"
                            style={{ cursor: (hasChildren || level < 4) ? 'pointer' : 'default' }}
                            onClick={() => (hasChildren || level < 4) && setIsExpanded(!isExpanded)}
                        >
                            <div className="mr-3 text-muted font-weight-bold" style={{ width: '20px' }}>{node.order}</div>
                            {hasChildren || level < 4 ? (
                                <div className="mr-2 text-dark">
                                    <i className={`fa ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ width: '15px' }}></i>
                                </div>
                            ) : <div className="mr-2" style={{ width: '15px' }}></div>}

                            <div className="d-flex flex-column">
                                <span className="font-weight-bold" style={{ fontSize: level === 0 ? '1.1rem' : '0.95rem' }}>
                                    {node.name}
                                    {!node.isActive && <span className="badge badge-secondary ml-2 small" style={{ fontSize: '0.6rem' }}>HIDDEN</span>}
                                </span>
                                <code className="small text-primary" style={{ fontSize: '0.7rem', opacity: 0.8 }}>{fullPath}</code>
                            </div>
                        </div>

                        <div className="actions d-flex align-items-center">
                            {/* Page Content Builder Link - Only for nested leaf nodes (part of a hierarchy) */}
                            {(!hasChildren && level > 0) && (
                                <Link
                                    to={`/page-builder?path=${encodeURIComponent(fullPath)}&name=${encodeURIComponent(node.name)}&id=${currentRootId}`}
                                    className="btn btn-sm btn-outline-info mr-2"
                                    style={{ borderRadius: '8px' }}
                                    title="Design Page Content"
                                >
                                    <i className="fa fa-paint-brush"></i> <span className="d-none d-md-inline ml-1">Design</span>
                                </Link>
                            )}

                            {/* Add Child - limit to 5 levels (0 to 4) */}
                            {level < 4 && (
                                <button className="btn btn-sm btn-outline-primary mr-2" style={{ borderRadius: '8px' }} onClick={() => handleOpenModal(null, node._id, currentRootId)}>
                                    <i className="fa fa-plus"></i> <span className="d-none d-md-inline ml-1">Sub</span>
                                </button>
                            )}
                            <button className="btn btn-sm btn-light mr-2 text-primary" style={{ borderRadius: '8px' }} onClick={() => handleOpenModal(node, null, currentRootId)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-sm btn-light text-danger" style={{ borderRadius: '8px' }} onClick={() => handleDelete(node._id, rootId)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {isExpanded && (
                    <div className="node-children mt-2 pb-1" style={{ animation: 'fadeIn 0.2s ease-out' }}>
                        {hasChildren ? (
                            node.children.sort((a, b) => a.order - b.order).map(child => (
                                <NavNode key={child._id} node={child} level={level + 1} rootId={currentRootId} parentPath={fullPath} />
                            ))
                        ) : (
                            <div className="text-center py-2 text-muted small ml-4">No sub-items yet.</div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    if (loading) return <div className="container mt-5 text-center py-5"><i className="fa fa-spinner fa-spin fa-3x text-primary"></i><p className="mt-3 text-muted">Analyzing Hierarchy...</p></div>;

    return (
        <div className="container-fluid mt-4 px-5 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-5 bg-white p-4 rounded shadow-sm" style={{ borderLeft: '5px solid #4361ee' }}>
                <div>
                    <h2 className="font-weight-bold mb-1" style={{ color: '#0f172a' }}>Deep Navigation Manager</h2>
                    <p className="text-muted mb-0">Construct complex multi-level menus (up to 5 levels deep)</p>
                </div>
                <button className="btn btn-primary btn-lg shadow" onClick={() => handleOpenModal()} style={{ borderRadius: '15px', padding: '12px 30px', fontWeight: '700', border: 'none', background: 'linear-gradient(135deg, #4361ee 0%, #3f37c9 100%)' }}>
                    <i className="fa fa-plus-circle mr-2"></i> New Root Menu
                </button>
            </div>

            <div className="navigation-tree" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {navTabs.sort((a, b) => a.order - b.order).map(tab => (
                    <NavNode key={tab._id} node={tab} />
                ))}

                {navTabs.length === 0 && (
                    <div className="text-center py-5 bg-white rounded shadow-sm border mt-4">
                        <i className="fa fa-sitemap fa-4x text-light mb-3"></i>
                        <h5>Your Sidebar is empty</h5>
                        <p className="text-muted">Start by creating a root menu item above.</p>
                    </div>
                )}
            </div>

            {/* Unified Modal for Root and Child Tabs */}
            {showTabModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(10px)', zIndex: '2000' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '28px' }}>
                            <div className="modal-header border-0 px-4 pt-4 pb-0 d-flex justify-content-between align-items-center">
                                <h5 className="modal-title font-weight-bold" style={{ fontSize: '1.4rem' }}>
                                    {isCreating ? 'Initialize Navigation Node' : 'Modified Node Configuration'}
                                </h5>
                                <button type="button" className="close" onClick={() => setShowTabModal(false)} style={{ fontSize: '1.5rem', opacity: '0.5' }}>&times;</button>
                            </div>
                            <form onSubmit={handleFormSubmit}>
                                <div className="modal-body p-4">
                                    <div className="form-group mb-4">
                                        <label className="small font-weight-bold text-muted text-uppercase mb-2">Display name</label>
                                        <input type="text" className="form-control form-control-lg border-0 bg-light" placeholder="e.g. Portfolio" value={modalData.name} onChange={(e) => setModalData({ ...modalData, name: e.target.value })} required style={{ borderRadius: '12px' }} />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="small font-weight-bold text-muted text-uppercase mb-2">URL Route</label>
                                        <input type="text" className="form-control form-control-lg border-0 bg-light" placeholder="e.g. /projects" value={modalData.url} onChange={(e) => setModalData({ ...modalData, url: e.target.value })} style={{ borderRadius: '12px' }} />
                                    </div>
                                    <div className="row">
                                        <div className="col-7">
                                            <div className="form-group mb-0">
                                                <label className="small font-weight-bold text-muted text-uppercase mb-2">Display Index (Sort)</label>
                                                <input type="number" className="form-control form-control-lg border-0 bg-light" value={modalData.order} onChange={(e) => setModalData({ ...modalData, order: parseInt(e.target.value) || 0 })} style={{ borderRadius: '12px' }} />
                                            </div>
                                        </div>
                                        <div className="col-5 d-flex align-items-end pb-1">
                                            <div className="custom-control custom-switch ml-3 mb-2">
                                                <input type="checkbox" className="custom-control-input" id="nodeActiveSwitch" checked={modalData.isActive} onChange={(e) => setModalData({ ...modalData, isActive: e.target.checked })} />
                                                <label className="custom-control-label font-weight-bold" htmlFor="nodeActiveSwitch" style={{ paddingLeft: '1vw', paddingTop: "0.5vh", cursor: 'pointer' }}>Visible</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-0 p-4 bg-light-soft d-flex">
                                    <button type="button" className="btn btn-outline-secondary px-4 py-3 mr-2" onClick={() => setShowTabModal(false)} style={{ borderRadius: '15px', fontWeight: '600', flex: '1' }}>Discard</button>
                                    <button type="submit" className="btn btn-primary px-4 py-3 shadow" style={{ borderRadius: '15px', background: '#4361ee', border: 'none', fontWeight: '700', flex: '2' }}>
                                        {isCreating ? 'Finalize Item' : 'Update Node'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
                .node-item:hover { transform: translateX(5px); }
                .border-left { border-left: 2px solid #e2e8f0 !important; }
                .bg-light-soft { background-color: #f8fafc; }
                .custom-switch .custom-control-label::before { height: 1.5rem; width: 2.75rem; border-radius: 1rem; }
                .custom-switch .custom-control-label::after { width: calc(1.5rem - 4px); height: calc(1.5rem - 4px); border-radius: 50%; }
                .custom-switch .custom-control-input:checked ~ .custom-control-label::after { transform: translateX(1.25rem); }
            `}</style>
        </div>
    );
};

export default SidebarSetting;
