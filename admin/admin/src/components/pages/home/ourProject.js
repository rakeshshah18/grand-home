import React, { useState, useEffect } from 'react';

const OurProject = () => {
    const createEmptyCard = () => ({
        image: [],
        thumbnail: '',
        status: 'under construction',
        type: 'single family',
        location: 'skyview',
        community: 'calgary'
    });

    const [formData, setFormData] = useState({
        cards: [createEmptyCard()]
    });

    const [projects, setProjects] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/ourProjects`);
            const result = await res.json();
            if (result.success) {
                setProjects(result.data);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            setMessage({ type: 'danger', text: 'Failed to fetch data' });
        }
    };

    const handleCardChange = (index, field, value) => {
        const updatedCards = [...formData.cards];
        if (field === 'image') {
            updatedCards[index][field] = value.split(',').map(img => img.trim());
        } else {
            updatedCards[index][field] = value;
        }
        setFormData(prev => ({ ...prev, cards: updatedCards }));
    };

    const addCard = () => {
        setFormData(prev => ({
            ...prev,
            cards: [...prev.cards, createEmptyCard()]
        }));
    };

    const removeCard = (index) => {
        if (formData.cards.length === 1) return;
        setFormData(prev => ({
            ...prev,
            cards: prev.cards.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const url = editingId
                ? `${baseUrl}/api/ourProjects/${editingId}`
                : `${baseUrl}/api/ourProjects`;

            const method = editingId ? 'PUT' : 'POST';

            const payload = {
                ...formData,
                cards: formData.cards.map(card => ({
                    ...card,
                    image: card.image.filter(img => img.trim() !== "")
                }))
            };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: editingId ? 'Updated successfully!' : 'Created successfully!'
                });
                fetchProjects();
                handleClose();
            } else {
                setMessage({ type: 'danger', text: result.message || 'Operation failed' });
            }
        } catch (error) {
            console.error('Error saving projects:', error);
            setMessage({ type: 'danger', text: 'Error connecting to server' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setFormData({
            cards: item.cards.map(card => ({ ...card }))
        });
        setEditingId(item._id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this section?')) return;
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/api/ourProjects/${id}`, { method: 'DELETE' });
            const result = await res.json();
            if (result.success) {
                setMessage({ type: 'success', text: 'Section deleted successfully!' });
                fetchProjects();
            } else {
                setMessage({ type: 'danger', text: result.message || 'Failed to delete' });
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            setMessage({ type: 'danger', text: 'Error connecting to server' });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({ cards: [createEmptyCard()] });
    };

    const inputStyle = { border: '1px solid #ced4da', borderRadius: '4px' };

    return (
        <div className="container-fluid py-4">
            {message.text && (
                <div className={`alert alert-${message.type} alert-dismissible fade show shadow-sm`} role="alert">
                    {message.text}
                    <button type="button" className="btn-close bg-transparent border-0" onClick={() => setMessage({ type: '', text: '' })}>
                        <i className="fa fa-close"></i>
                    </button>
                </div>
            )}

            <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '15px' }}>
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center border-bottom">
                    <h5 className="mb-0 fw-bold text-dark"
                        style={{
                            paddingLeft: '35px'
                        }}
                    >
                        <i className="fa fa-th-large text-primary me-2"></i> Our Projects Management
                    </h5>
                    <button className="btn btn-primary px-4 shadow-sm" style={{ borderRadius: '10px' }} onClick={() => setShowModal(true)}>
                        <i className="fa fa-plus-circle me-2"></i> New Section
                    </button>
                </div>
                <div className="card-body p-0">
                    {projects.length === 0 ? (
                        <div className="text-center py-5 text-muted">
                            <i className="fa fa-folder-open-o fa-3x mb-3 opacity-25"></i>
                            <p>No project sections found.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="ps-4" style={{ width: '150px' }}>Project Previews</th>
                                        <th>Detailed Statistics</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map(item => (
                                        <tr key={item._id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    {(item.cards?.[0]?.thumbnail || item.cards?.[0]?.image?.[0]) ? (
                                                        <div className="position-relative">
                                                            <img
                                                                src={item.cards[0].thumbnail || item.cards[0].image[0]}
                                                                alt="thumb"
                                                                className="rounded shadow-sm border"
                                                                style={{ width: '70px', height: '52px', objectFit: 'cover' }}
                                                            />
                                                            {item.cards.length > 1 && (
                                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark border border-light" style={{ fontSize: '10px' }}>
                                                                    +{item.cards.length - 1}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="bg-light rounded d-flex align-items-center justify-content-center border" style={{ width: '70px', height: '52px' }}>
                                                            <i className="fa fa-image text-muted opacity-50"></i>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column mt-2">
                                                    <span className="fw-bold text-dark"><i className="fa fa-photo me-1"></i> {item.cards.reduce((acc, c) => acc + (c.image?.length || 0), 0)} Images</span>
                                                </div>
                                            </td>
                                            <td className="">
                                                <div className="d-flex justify-content-center mt-2">
                                                    <button className="btn btn-sm btn-light border shadow-sm" onClick={() => handleEdit(item)} style={{ marginRight: '5px' }}>
                                                        <i className="fa fa-pencil text-primary me-1"></i> Edit
                                                    </button>
                                                    <button className="btn btn-sm btn-light border shadow-sm" onClick={() => handleDelete(item._id)}>
                                                        <i className="fa fa-trash text-danger me-1"></i> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(4px)' }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>
                            <div className="modal-header bg-white border-bottom px-4 py-3">
                                <h5 className="modal-title fw-bold">
                                    <i className={`fa ${editingId ? 'fa-edit' : 'fa-plus-circle'} text-primary me-2`}></i>
                                    {editingId ? ' Update Projects' : ' Add Project Section'}
                                </h5>
                                <button type="button" className="btn-close shadow-none border-0 bg-white" onClick={handleClose}><i className="fa fa-times"></i></button>
                            </div>
                            <div className="modal-body p-4 bg-light">
                                <form id="projectForm" onSubmit={handleSubmit}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="fw-bold mb-0 text-dark">Project Details ({formData.cards.length})</h6>
                                        <button type="button" className="btn btn-success btn-sm shadow-sm" style={{ borderRadius: '8px' }} onClick={addCard}>
                                            <i className="fa fa-plus me-1"></i> Add Project Card
                                        </button>
                                    </div>

                                    {formData.cards.map((card, index) => (
                                        <div key={index} className="card border-0 shadow-sm mb-3" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                                            <div className="card-header bg-white d-flex justify-content-between align-items-center py-2 border-0">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="badge bg-primary text-white">Project : {index + 1}</span>
                                                    {(card.thumbnail || card.image?.[0]) && (
                                                        <img
                                                            src={card.thumbnail || card.image[0]}
                                                            alt="mini-thumb"
                                                            className="rounded border"
                                                            style={{ width: '30px', height: '22px', objectFit: 'cover' }}
                                                        />
                                                    )}
                                                </div>
                                                {formData.cards.length > 1 && (
                                                    <button type="button" className="btn btn-link text-danger p-0 shadow-none border-0" onClick={() => removeCard(index)}>
                                                        <i className="fa fa-times-circle fs-5"></i>
                                                    </button>
                                                )}
                                            </div>
                                            <div className="card-body pt-0 px-4 pb-4">
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-bold small text-muted">Thumbnail Image URL</label>
                                                        <div className="d-flex gap-2">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={inputStyle}
                                                                value={card.thumbnail}
                                                                onChange={(e) => handleCardChange(index, 'thumbnail', e.target.value)}
                                                                placeholder="Project thumbnail URL"
                                                            />
                                                            {card.thumbnail && (
                                                                <img src={card.thumbnail} alt="thumb-prev" className="rounded border shadow-sm" style={{ width: '45px', height: '38px', objectFit: 'cover' }} onError={(e) => { e.target.src = "https://via.placeholder.com/45x38?text=!" }} />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label fw-bold small text-muted">Gallery Image URLs (comma separated)</label>
                                                        <textarea
                                                            className="form-control"
                                                            style={{ ...inputStyle, minHeight: '20vh', resize: 'none' }}
                                                            value={card.image.join(', ')}
                                                            onChange={(e) => handleCardChange(index, 'image', e.target.value)}
                                                            required
                                                            placeholder="https://img1.com, https://img2.com"
                                                        />
                                                        <div className="mt-2 d-flex gap-2 flex-wrap overflow-auto p-2 bg-light rounded border-dashed" style={{ border: '2px dashed #ddd', minHeight: '20vh' }}>
                                                            {card.image.length > 0 && card.image[0] !== "" ? (
                                                                card.image.map((url, idx) => (
                                                                    <div key={idx} className="position-relative">
                                                                        <img
                                                                            src={url.trim()}
                                                                            alt="preview"
                                                                            className="rounded"
                                                                            style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                                                                            onError={(e) => { e.target.src = "https://via.placeholder.com/80x60?text=Error" }}
                                                                        />
                                                                    </div>
                                                                ))
                                                            ) : <span className="text-muted small p-2">No gallery images added</span>}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="form-label fw-bold small text-muted">Status</label>
                                                        <select className="form-select" style={inputStyle} value={card.status} onChange={(e) => handleCardChange(index, 'status', e.target.value)}>
                                                            <option value="completed sold">Completed Sold</option>
                                                            <option value="under construction">Under Construction</option>
                                                            <option value="ready to move">Ready to Move</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label fw-bold small text-muted">Building Type</label>
                                                        <select className="form-select" style={inputStyle} value={card.type} onChange={(e) => handleCardChange(index, 'type', e.target.value)}>
                                                            <option value="single family">Single Family</option>
                                                            <option value="multi family">Multi Family</option>
                                                            <option value="duplex homes">Duplex Homes</option>
                                                            <option value="custom homes">Custom Homes</option>
                                                            <option value="renovation">Renovation</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label fw-bold small text-muted">Location</label>
                                                        <select className="form-select" style={inputStyle} value={card.location} onChange={(e) => handleCardChange(index, 'location', e.target.value)}>
                                                            <option value="skyview">Skyview</option>
                                                            <option value="thorncliffe">Thorncliffe</option>
                                                            <option value="braeside">Braeside</option>
                                                            <option value="killarney">Killarney</option>
                                                            <option value="bowness">Bowness</option>
                                                            <option value="waterford estate">Waterford Estate</option>
                                                            <option value="highland park">Highland Park</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label fw-bold small text-muted">Community</label>
                                                        <select className="form-select" style={inputStyle} value={card.community} onChange={(e) => handleCardChange(index, 'community', e.target.value)}>
                                                            <option value="calgary">Calgary</option>
                                                            <option value="chestermere">Chestermere</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </form>
                            </div>
                            <div className="modal-footer bg-white border-top px-4 py-3" style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                                <button type="button" className="btn btn-light px-4 border" onClick={handleClose}>Cancel</button>
                                <button type="submit" form="projectForm" className="btn btn-primary px-5 fw-bold shadow-sm" disabled={loading}>
                                    {loading ? (
                                        <><span className="spinner-border spinner-border-sm me-2"></span>Processing...</>
                                    ) : (
                                        <><i className="fa fa-save me-2"></i>{editingId ? ' Update Section' : ' Save Section'}</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OurProject;
