import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PageBuilder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const pagePath = queryParams.get('path');
    const pageName = queryParams.get('name');
    const navTabId = queryParams.get('id');

    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState(pageName || 'Untitled Page');

    // UI States
    const [activeBlockType, setActiveBlockType] = useState('heading');
    const [showBlockSelect, setShowBlockSelect] = useState(false);

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

    const fetchPageContent = useCallback(async () => {
        if (!pagePath) return;
        try {
            const response = await fetch(`${baseUrl}/api/dynamic-content/content?path=${encodeURIComponent(pagePath)}`);
            const result = await response.json();
            if (result.success) {
                setSections(result.data.sections || []);
                setTitle(result.data.title || pageName);
            }
        } catch (err) {
            console.error("Error fetching content:", err);
        } finally {
            setLoading(false);
        }
    }, [baseUrl, pagePath, pageName]);

    useEffect(() => {
        if (!pagePath) {
            setLoading(false);
            return;
        }
        fetchPageContent();
    }, [fetchPageContent, pagePath]);

    const handleAddBlock = (type) => {
        const newBlock = {
            _id: `new-${Date.now()}`,
            type,
            data: type === 'list' ? { items: [''] } :
                type === 'gallery' ? { images: [] } :
                    type === 'heading' ? { text: '', level: 2 } : { text: '' },
            order: sections.length,
            isActive: true
        };
        setSections([...sections, newBlock]);
        setShowBlockSelect(false);
    };

    const handleUpdateBlock = (id, field, value) => {
        setSections(sections.map(s => {
            if (s._id === id) {
                return { ...s, data: { ...s.data, [field]: value } };
            }
            return s;
        }));
    };

    const handleAddListItem = (id) => {
        setSections(sections.map(s => {
            if (s._id === id) {
                return { ...s, data: { ...s.data, items: [...(s.data.items || []), ''] } };
            }
            return s;
        }));
    };

    const handleUpdateListItem = (blockId, idx, value) => {
        setSections(sections.map(s => {
            if (s._id === blockId) {
                const newItems = [...s.data.items];
                newItems[idx] = value;
                return { ...s, data: { ...s.data, items: newItems } };
            }
            return s;
        }));
    };

    const handleRemoveListItem = (blockId, idx) => {
        setSections(sections.map(s => {
            if (s._id === blockId) {
                const newItems = s.data.items.filter((_, i) => i !== idx);
                return { ...s, data: { ...s.data, items: newItems } };
            }
            return s;
        }));
    };

    const handleAddGalleryImage = (id) => {
        setSections(sections.map(s => {
            if (s._id === id) {
                return { ...s, data: { ...s.data, images: [...(s.data.images || []), { url: '', caption: '' }] } };
            }
            return s;
        }));
    };

    const handleUpdateGalleryImage = (blockId, idx, field, value) => {
        setSections(sections.map(s => {
            if (s._id === blockId) {
                const newImages = [...s.data.images];
                newImages[idx] = { ...newImages[idx], [field]: value };
                return { ...s, data: { ...s.data, images: newImages } };
            }
            return s;
        }));
    };

    const handleRemoveBlock = (id) => {
        setSections(sections.filter(s => s._id !== id));
    };

    const handleMoveBlock = (idx, direction) => {
        const newSections = [...sections];
        const targetIdx = idx + direction;
        if (targetIdx < 0 || targetIdx >= newSections.length) return;

        [newSections[idx], newSections[targetIdx]] = [newSections[targetIdx], newSections[idx]];
        setSections(newSections.map((s, i) => ({ ...s, order: i })));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Clean temp IDs before saving
            const cleanSections = sections.map(s => {
                const { _id, ...rest } = s;
                return _id.toString().startsWith('new-') ? rest : s;
            });

            const response = await fetch(`${baseUrl}/api/dynamic-content/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    path: pagePath,
                    navTabId,
                    sections: cleanSections
                })
            });
            const result = await response.json();
            if (result.success) {
                alert('Page saved successfully!');
                fetchPageContent();
            } else {
                alert('Save failed: ' + result.message);
            }
        } catch (err) {
            alert('Save failed: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-5"><i className="fa fa-spinner fa-spin fa-3x text-primary"></i></div>;

    return (
        <div className="container-fluid py-4 px-5">
            <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-4 rounded shadow-sm border-left" style={{ borderLeft: '5px solid #4361ee' }}>
                <div>
                    <button className="btn btn-sm btn-link text-muted p-0 mb-1" onClick={() => navigate(-1)}>
                        <i className="fa fa-arrow-left mr-1"></i> Back to Settings
                    </button>
                    <div className="d-flex align-items-center">
                        <h2 className="font-weight-bold mb-0 mr-3">{title}</h2>
                        <span className="badge badge-light px-3 py-2" style={{ borderRadius: '10px' }}>{pagePath}</span>
                    </div>
                </div>
                <button className="btn btn-primary btn-lg shadow" onClick={handleSave} disabled={saving} style={{ borderRadius: '14px', background: '#4361ee', border: 'none' }}>
                    {saving ? <i className="fa fa-spinner fa-spin mr-2"></i> : <i className="fa fa-save mr-2"></i>}
                    Publish Content
                </button>
            </div>

            <div className="row">
                <div className="col-lg-8">
                    <div className="content-area mb-5">
                        {sections.length === 0 && (
                            <div className="text-center py-5 bg-white rounded shadow-sm border border-dashed">
                                <i className="fa fa-cubes fa-4x text-light mb-3"></i>
                                <h5>Your page is a blank canvas</h5>
                                <p className="text-muted">Start adding blocks from the right panel to build your content.</p>
                            </div>
                        )}

                        {sections.map((section, idx) => (
                            <div key={section._id} className="block-wrapper mb-4 bg-white rounded shadow-sm border overflow-hidden" style={{ transition: 'all 0.3s' }}>
                                <div className="block-header bg-light px-4 py-2 d-flex justify-content-between align-items-center border-bottom">
                                    <span className="small font-weight-bold text-uppercase text-muted">
                                        <i className={`fa fa-${section.type === 'heading' ? 'header' : section.type === 'paragraph' ? 'align-left' : section.type === 'image' ? 'image' : section.type === 'gallery' ? 'th' : 'list'} mr-2 text-primary`}></i>
                                        {section.type} Block
                                    </span>
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-sm btn-link text-muted" onClick={() => handleMoveBlock(idx, -1)} disabled={idx === 0}><i className="fa fa-chevron-up"></i></button>
                                        <button className="btn btn-sm btn-link text-muted" onClick={() => handleMoveBlock(idx, 1)} disabled={idx === sections.length - 1}><i className="fa fa-chevron-down"></i></button>
                                        <div className="mx-2 border-right h-100" style={{ width: '1px', height: '15px' }}></div>
                                        <button className="btn btn-sm btn-link text-danger" onClick={() => handleRemoveBlock(section._id)}><i className="fa fa-trash"></i></button>
                                    </div>
                                </div>
                                <div className="block-body p-4">
                                    {section.type === 'heading' && (
                                        <div className="d-flex align-items-start">
                                            <select
                                                className="form-control mr-3"
                                                style={{ width: '80px', borderRadius: '8px' }}
                                                value={section.data.level}
                                                onChange={(e) => handleUpdateBlock(section._id, 'level', parseInt(e.target.value))}
                                            >
                                                <option value="1">H1</option>
                                                <option value="2">H2</option>
                                                <option value="3">H3</option>
                                                <option value="4">H4</option>
                                            </select>
                                            <input
                                                type="text"
                                                className="form-control border-0 bg-light p-3"
                                                placeholder="Enter heading text..."
                                                value={section.data.text}
                                                onChange={(e) => handleUpdateBlock(section._id, 'text', e.target.value)}
                                                style={{ borderRadius: '10px', fontSize: '1.2rem', fontWeight: '700' }}
                                            />
                                        </div>
                                    )}

                                    {section.type === 'paragraph' && (
                                        <textarea
                                            className="form-control border-0 bg-light p-3"
                                            rows="4"
                                            placeholder="Write your content description here..."
                                            value={section.data.text}
                                            onChange={(e) => handleUpdateBlock(section._id, 'text', e.target.value)}
                                            style={{ borderRadius: '10px' }}
                                        />
                                    )}

                                    {section.type === 'image' && (
                                        <div className="form-group mb-0">
                                            <label className="small font-weight-bold text-muted">IMAGE SOURCE URL</label>
                                            <input
                                                type="text"
                                                className="form-control border-0 bg-light p-3"
                                                placeholder="https://example.com/image.jpg"
                                                value={section.data.url}
                                                onChange={(e) => handleUpdateBlock(section._id, 'url', e.target.value)}
                                                style={{ borderRadius: '10px' }}
                                            />
                                            {section.data.url && <img src={section.data.url} alt="Preview" className="mt-3 rounded shadow-sm" style={{ maxHeight: '200px' }} />}
                                        </div>
                                    )}

                                    {section.type === 'list' && (
                                        <div className="list-points">
                                            {section.data.items.map((item, i) => (
                                                <div key={i} className="d-flex mb-2">
                                                    <span className="mr-2 mt-2"><i className="fa fa-circle text-primary" style={{ fontSize: '0.6rem' }}></i></span>
                                                    <input
                                                        type="text"
                                                        className="form-control border-0 bg-light"
                                                        value={item}
                                                        onChange={(e) => handleUpdateListItem(section._id, i, e.target.value)}
                                                        style={{ borderRadius: '8px' }}
                                                    />
                                                    <button className="btn btn-link text-danger ml-2" onClick={() => handleRemoveListItem(section._id, i)}><i className="fa fa-times"></i></button>
                                                </div>
                                            ))}
                                            <button className="btn btn-sm btn-outline-primary mt-2" onClick={() => handleAddListItem(section._id)}>
                                                <i className="fa fa-plus mr-1"></i> Add Point
                                            </button>
                                        </div>
                                    )}

                                    {section.type === 'gallery' && (
                                        <div className="gallery-manager">
                                            <div className="row">
                                                {section.data.images.map((img, i) => (
                                                    <div key={i} className="col-md-6 mb-3">
                                                        <div className="p-3 bg-light rounded" style={{ borderRadius: '12px' }}>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span className="small font-weight-bold">Image #{i + 1}</span>
                                                                <button className="btn btn-link btn-sm text-danger p-0" onClick={() => {
                                                                    const newImages = section.data.images.filter((_, idx) => idx !== i);
                                                                    handleUpdateBlock(section._id, 'images', newImages);
                                                                }}><i className="fa fa-trash"></i></button>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm border-0 mb-2"
                                                                placeholder="URL"
                                                                value={img.url}
                                                                onChange={(e) => handleUpdateGalleryImage(section._id, i, 'url', e.target.value)}
                                                            />
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm border-0"
                                                                placeholder="Caption (Optional)"
                                                                value={img.caption}
                                                                onChange={(e) => handleUpdateGalleryImage(section._id, i, 'caption', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="col-md-6 mb-3">
                                                    <button
                                                        className="btn btn-outline-secondary h-100 w-100 py-4"
                                                        onClick={() => handleAddGalleryImage(section._id)}
                                                        style={{ borderRadius: '12px', borderStyle: 'dashed' }}
                                                    >
                                                        <i className="fa fa-plus-circle fa-2x mb-2 d-block"></i>
                                                        Add to Gallery
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="sticky-top" style={{ top: '20px' }}>
                        <div className="card border-0 shadow-sm" style={{ borderRadius: '20px' }}>
                            <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                                <h5 className="font-weight-bold">Content Elements</h5>
                                <p className="small text-muted">Click to add any element to your page</p>
                            </div>
                            <div className="card-body p-4">
                                <div className="row no-gutters">
                                    {[
                                        { id: 'heading', name: 'Heading', icon: 'header', color: '#4361ee' },
                                        { id: 'paragraph', name: 'Text Body', icon: 'align-left', color: '#3f37c9' },
                                        { id: 'image', name: 'Single Image', icon: 'image', color: '#4895ef' },
                                        { id: 'gallery', name: 'Gallery', icon: 'th', color: '#4cc9f0' },
                                        { id: 'list', name: 'Points/List', icon: 'list-ul', color: '#7209b7' },
                                        { id: 'divider', name: 'Divider', icon: 'minus', color: '#b5179e' }
                                    ].map(item => (
                                        <div key={item.id} className="col-6 p-1">
                                            <button
                                                className="btn btn-light w-100 py-3 d-flex flex-column align-items-center"
                                                onClick={() => handleAddBlock(item.id)}
                                                style={{ borderRadius: '15px', background: '#f8fafc', border: '1px solid #f1f5f9' }}
                                            >
                                                <i className={`fa fa-${item.icon} mb-2`} style={{ color: item.color, fontSize: '1.2rem' }}></i>
                                                <span className="small font-weight-bold">{item.name}</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mt-4 bg-light" style={{ borderRadius: '20px' }}>
                            <div className="card-body p-4">
                                <h6 className="font-weight-bold mb-3">SEO Details</h6>
                                <div className="form-group mb-0">
                                    <label className="small font-weight-bold text-muted">PAGE TITLE</label>
                                    <input
                                        type="text"
                                        className="form-control border-0"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        style={{ borderRadius: '10px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .block-wrapper:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important; }
                .border-dashed { border: 2px dashed #e2e8f0 !important; }
                .sticky-top { z-index: 100 !important; }
            `}</style>
        </div>
    );
};

export default PageBuilder;
