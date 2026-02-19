import React, { useState, useEffect } from 'react';

const OurProject = () => {
    const createEmptyCard = () => ({
        image: '',
        status: 'under construction',
        type: 'single family',
        location: 'skyview',
        community: 'calgary'
    });

    const [formData, setFormData] = useState({
        heading: '',
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

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCardChange = (index, field, value) => {
        const updatedCards = [...formData.cards];
        updatedCards[index][field] = value;
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

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
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
            heading: item.heading,
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
        setFormData({ heading: '', cards: [createEmptyCard()] });
    };

    const inputStyle = { border: '1px solid #ced4da' };

    return (
        <div className="container-fluid py-4">
            {message.text && (
                <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                    {message.text}
                    <button type="button" className="btn-close btn-close-white bg-green border-0" aria-label="Close" onClick={() => setMessage({ type: '', text: '' })}><i className="fa fa-check"></i></button>
                </div>
            )}

            <div className="card shadow-sm mb-4">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Our Projects Section</h5>
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
                            <i className="fa fa-plus me-2"></i> Add Section
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    {projects.length === 0 ? (
                        <div className="text-center py-5 text-muted">
                            <i className="fa fa-briefcase fa-3x mb-3" style={{ opacity: 0.3 }}></i>
                            <p>No projects section created yet.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle border">
                                <thead className="table-light">
                                    <tr>
                                        <th>Heading</th>
                                        <th>Cards Count</th>
                                        <th style={{ width: '200px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map(item => (
                                        <tr key={item._id}>
                                            <td className="fw-bold">{item.heading}</td>
                                            <td>{item.cards.length} Projects</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item)}>
                                                        <i className="fa fa-pencil me-1"></i> Edit
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id)}>
                                                        <i className="fa fa-trash me-1"></i> Delete
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
                <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{ maxWidth: '60%' }}>
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className={`fa ${editingId ? 'fa-pencil' : 'fa-plus'} me-2`}></i>
                                    {editingId ? ' Edit Projects Section' : ' Add Projects Section'}
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleClose}><i className="fa fa-times"></i></button>
                            </div>
                            <div className="modal-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold">Section Heading</label>
                                        <input
                                            type="text"
                                            name="heading"
                                            className="form-control"
                                            style={inputStyle}
                                            value={formData.heading}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter section heading"
                                        />
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="fw-bold mb-0">Project Cards</h6>
                                        <button type="button" className="btn btn-sm btn-success" onClick={addCard}>
                                            <i className="fa fa-plus me-1"></i> Add Project
                                        </button>
                                    </div>

                                    {formData.cards.map((card, index) => (
                                        <div key={index} className="card bg-light mb-3 position-relative shadow-sm">
                                            <div className="card-body pt-4">
                                                {formData.cards.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger  m-2"
                                                        onClick={() => removeCard(index)}
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                )}
                                                <div className="row g-3">
                                                    <div className="col-md-12">
                                                        <label className="form-label fw-semibold small">Image URL</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            style={inputStyle}
                                                            value={card.image}
                                                            onChange={(e) => handleCardChange(index, 'image', e.target.value)}
                                                            required
                                                            placeholder="Project image URL"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label fw-semibold small">Status:</label>
                                                        <select
                                                            className="form-select"
                                                            style={inputStyle}
                                                            value={card.status}
                                                            onChange={(e) => handleCardChange(index, 'status', e.target.value)}
                                                        >
                                                            <option value="completed sold">Completed Sold</option>
                                                            <option value="under construction">Under Construction</option>
                                                            <option value="ready to move">Ready to Move</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label fw-semibold small">Type:</label>
                                                        <select
                                                            className="form-select"
                                                            style={inputStyle}
                                                            value={card.type}
                                                            onChange={(e) => handleCardChange(index, 'type', e.target.value)}
                                                        >
                                                            <option value="single family">Single Family</option>
                                                            <option value="multi family">Multi Family</option>
                                                            <option value="duplex homes">Duplex Homes</option>
                                                            <option value="custom homes">Custom Homes</option>
                                                            <option value="renovation">Renovation</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label fw-semibold small">Location:</label>
                                                        <select
                                                            className="form-select"
                                                            style={inputStyle}
                                                            value={card.location}
                                                            onChange={(e) => handleCardChange(index, 'location', e.target.value)}
                                                        >
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
                                                        <label className="form-label fw-semibold small">Community:</label>
                                                        <select
                                                            className="form-select"
                                                            style={inputStyle}
                                                            value={card.community}
                                                            onChange={(e) => handleCardChange(index, 'community', e.target.value)}
                                                        >
                                                            <option value="calgary">Calgary</option>
                                                            <option value="chestermere">Chestermere</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="modal-footer border-0 p-0 mt-4">
                                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                                        <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                            {loading ? (
                                                <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</>
                                            ) : (
                                                <><i className="fa fa-save me-2"></i>{editingId ? ' Update Section' : ' Save Section'}</>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OurProject;
