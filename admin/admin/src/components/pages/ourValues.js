import React, { useState, useEffect } from 'react';

const OurValues = () => {
    const createEmptyCard = () => ({
        title: '',
        description: '',
        icon: ''
    });

    const [formData, setFormData] = useState({
        cards: [createEmptyCard()]
    });

    const [ourValues, setOurValues] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

    useEffect(() => {
        fetchOurValues();
    }, []);

    const fetchOurValues = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/ourValues`);
            const result = await res.json();
            if (result.success && result.data) {
                // Backend returns a single object or null
                setOurValues(Array.isArray(result.data) ? result.data : [result.data]);
            } else {
                setOurValues([]);
            }
        } catch (error) {
            console.error('Error fetching our values:', error);
            setMessage({ type: 'danger', text: 'Failed to fetch data' });
        }
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
                ? `${baseUrl}/api/ourValues/${editingId}`
                : `${baseUrl}/api/ourValues`;

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
                fetchOurValues();
                handleClose();
            } else {
                setMessage({ type: 'danger', text: result.message || 'Operation failed' });
            }
        } catch (error) {
            console.error('Error saving our values:', error);
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
            const res = await fetch(`${baseUrl}/api/ourValues/${id}`, { method: 'DELETE' });
            const result = await res.json();
            if (result.success) {
                setMessage({ type: 'success', text: 'Section deleted successfully!' });
                fetchOurValues();
            } else {
                setMessage({ type: 'danger', text: result.message || 'Failed to delete' });
            }
        } catch (error) {
            console.error('Error deleting:', error);
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
                    <h5 className="mb-0 fw-bold">Our Values Section</h5>
                    <div className="d-flex gap-2">
                        {ourValues.length === 0 ? (
                            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                                <i className="fa fa-plus me-2"></i> Add Section
                            </button>
                        ) : (
                            <>
                                <button className="btn btn-primary btn-sm" onClick={() => handleEdit(ourValues[0])}>
                                    <i className="fa fa-pencil me-1"></i> Edit Section
                                </button>
                                {/* <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(ourValues[0]._id)}>
                                    <i className="fa fa-trash me-1"></i> Delete
                                </button> */}
                            </>
                        )}
                    </div>
                </div>
                <div className="card-body">
                    {ourValues.length === 0 ? (
                        <div className="text-center py-5 text-muted">
                            <i className="fa fa-heart-o fa-3x mb-3" style={{ opacity: 0.3 }}></i>
                            <p>No values section created yet. Click "Add Section" to get started.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle border">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: '80px' }} className="text-center">Icon</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ourValues.map(item => (
                                        <React.Fragment key={item._id}>
                                            {item.cards.map((card, idx) => (
                                                <tr key={`${item._id}-${idx}`}>
                                                    <td className="text-center">
                                                        <div className="bg-light rounded p-2 d-inline-block">
                                                            <i className={`fa ${card.icon} fa-2x text-primary`}></i>
                                                        </div>
                                                    </td>
                                                    <td className="fw-bold text-dark">{card.title}</td>
                                                    <td className="text-muted small">
                                                        {card.description}
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className={`fa ${editingId ? 'fa-pencil' : 'fa-plus'} me-2`}></i>
                                    {editingId ? 'Edit Our Values' : 'Add Our Values'}
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleClose}><i className="fa fa-times"></i></button>
                            </div>
                            <div className="modal-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="fw-bold mb-0">Value Cards</h6>
                                        <button type="button" className="btn btn-sm btn-success" onClick={addCard}>
                                            <i className="fa fa-plus me-1"></i> Add Value
                                        </button>
                                    </div>

                                    {formData.cards.map((card, index) => (
                                        <div key={index} className="card bg-light mb-3 position-relative">
                                            <div className="card-body pt-4">
                                                {/* {formData.cards.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="btn-close position-absolute top-0 end-0 m-2"
                                                        style={{ fontSize: '0.8rem' }}
                                                        onClick={() => removeCard(index)}
                                                    ></button>
                                                )} */}
                                                <div className="row g-3">
                                                    <div className="col-md-5">
                                                        <label className="form-label fw-semibold small">Title</label>
                                                        <input
                                                            type="text"
                                                            className="form-control shadow-none"
                                                            style={inputStyle}
                                                            value={card.title}
                                                            onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                                                            required
                                                            placeholder="e.g., Integrity"
                                                        />
                                                    </div>
                                                    <div className="col-md-5">
                                                        <label className="form-label fw-semibold small">Icon (e.g., fa-shield or fa-star)</label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-white" style={inputStyle}>
                                                                <i className={`fa ${card.icon || 'fa-question-circle'} text-primary`}></i>
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="form-control shadow-none"
                                                                style={inputStyle}
                                                                value={card.icon}
                                                                onChange={(e) => handleCardChange(index, 'icon', e.target.value)}
                                                                required
                                                                placeholder="fa-shield"
                                                            />
                                                        </div>
                                                        <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                                                            Use FontAwesome 4.7 classes
                                                        </small>
                                                    </div>
                                                    <div className="col-md-2 d-flex align-items-end">
                                                        {formData.cards.length > 1 && (
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger btn-sm w-100"
                                                                style={{ padding: '0.375rem 0.5rem' }}
                                                                onClick={() => removeCard(index)}
                                                            >
                                                                <i className="fa fa-trash me-1"></i> Remove
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label fw-semibold small">Description</label>
                                                        <textarea
                                                            className="form-control shadow-none"
                                                            style={inputStyle}
                                                            rows="2"
                                                            value={card.description}
                                                            onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                                                            required
                                                            placeholder="Briefly describe this company value..."
                                                        ></textarea>
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
                                                <><i className="fa fa-save me-2"></i>{editingId ? ' Update Section' : 'Save Section'}</>
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

export default OurValues;
