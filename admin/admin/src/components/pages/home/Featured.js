import React, { useState, useEffect } from 'react';
import { getHeaders, baseUrl } from '../../../utils/api';

const Featured = () => {
    const createEmptyCard = () => ({
        image: '',
        title: '',
        location: '',
        propertyOverview: {
            bedrooms: '',
            bathrooms: '',
            area: '',
            type: '',
            livingRoom: 0,
            familyRoom: 0,
            nook: 0,
            flex: 0,
            bonusArea: 0,
            balcony: 0,
            basement: 0,
            parking: 0
        }
    });

    const [formData, setFormData] = useState({
        heading: '',
        propertyCards: [createEmptyCard()]
    });

    const [features, setFeatures] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });


    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/features`);
            const result = await res.json();
            if (result.success) setFeatures(result.data);
        } catch (error) {
            console.error('Error fetching features:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCardChange = (index, field, value) => {
        const cards = [...formData.propertyCards];
        cards[index][field] = value;
        setFormData(prev => ({ ...prev, propertyCards: cards }));
    };

    const handleOverviewChange = (index, field, value) => {
        const cards = [...formData.propertyCards];
        cards[index].propertyOverview[field] = value;
        setFormData(prev => ({ ...prev, propertyCards: cards }));
    };

    const addPropertyCard = () => {
        setFormData(prev => ({
            ...prev,
            propertyCards: [...prev.propertyCards, createEmptyCard()]
        }));
    };

    const removePropertyCard = (index) => {
        if (formData.propertyCards.length === 1) return;
        setFormData(prev => ({
            ...prev,
            propertyCards: prev.propertyCards.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const url = editingId
                ? `${baseUrl}/api/features/${editingId}`
                : `${baseUrl}/api/features`;

            const method = editingId ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: getHeaders(),
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: editingId ? 'Updated successfully!' : 'Created successfully!'
                });
                fetchFeatures();
                handleClose();
            } else {
                setMessage({ type: 'danger', text: result.message || 'Operation failed' });
            }
        } catch (error) {
            console.error('Error saving feature:', error);
            setMessage({ type: 'danger', text: 'Error connecting to server' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (feature) => {
        const deepCopy = JSON.parse(JSON.stringify(feature));

        deepCopy.propertyCards = deepCopy.propertyCards.map(card => ({
            ...createEmptyCard(),
            ...card,
            propertyOverview: {
                ...createEmptyCard().propertyOverview,
                ...(card.propertyOverview || {})
            }
        }));

        setFormData({
            heading: deepCopy.heading,
            propertyCards: deepCopy.propertyCards
        });

        setEditingId(feature._id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this section?')) return;
        try {
            const res = await fetch(`${baseUrl}/api/features/${id}`, {
                method: 'DELETE',
                headers: getHeaders()
            });
            const result = await res.json();
            if (result.success) {
                setMessage({ type: 'success', text: 'Section deleted' });
                fetchFeatures();
            }
        } catch (error) {
            setMessage({ type: 'danger', text: 'Error deleting' });
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({ heading: '', propertyCards: [createEmptyCard()] });
    };

    const inputStyle = { border: '1px solid #ced4da' };

    return (
        <div className="container-fluid py-4">
            {message.text && (
                <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                    {message.text}
                    <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
                </div>
            )}

            <div className="card shadow-sm mb-4">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Featured Sections</h5>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        <i className="fa fa-plus me-2"></i> Add Section
                    </button>
                </div>
                <div className="card-body">
                    {features.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="fa fa-folder-open fa-3x text-muted mb-3"></i>
                            <p className="text-muted">No featured sections found.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Heading</th>
                                        <th>Cards</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {features.map(f => (
                                        <tr key={f._id}>
                                            <td className="fw-bold">{f.heading}</td>
                                            <td>{f.propertyCards.length} Cards</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(f)}>
                                                    <i className="fa fa-pencil"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(f._id)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
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
                <div className="modal show d-block" style={{ background: 'rgba(0,0,0,.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable shadow" style={{ maxWidth: '60%' }}>
                        <div className="modal-content border-0">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title"><i className="fa fa-pencil"></i>{editingId ? ' Edit Section' : 'Add Section'}</h5>
                                <button type="button" className="btn-close btn-close-white border-0" onClick={handleClose}><i className="fa fa-times"></i></button>
                            </div>
                            <div className="modal-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold">Section Heading</label>
                                        <input
                                            name="heading"
                                            className="form-control"
                                            style={inputStyle}
                                            value={formData.heading}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter section heading"
                                        />
                                    </div>

                                    <h6 className="fw-bold mb-3 d-flex justify-content-between align-items-center">
                                        Property Cards
                                        <button type="button" className="btn btn-sm btn-outline-success" onClick={addPropertyCard}>
                                            <i className="fa fa-plus me-1"></i> Add Card
                                        </button>
                                    </h6>

                                    {formData.propertyCards.map((card, i) => (
                                        <div key={i} className="card bg-light border p-3 mb-4 position-relative">
                                            {formData.propertyCards.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                                    onClick={() => removePropertyCard(i)}
                                                >
                                                    <i className="fa fa-times"></i>
                                                </button>
                                            )}

                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label small fw-bold">Title</label>
                                                    <input className="form-control" style={inputStyle}
                                                        value={card.title}
                                                        onChange={(e) => handleCardChange(i, 'title', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small fw-bold">Location</label>
                                                    <input className="form-control" style={inputStyle}
                                                        value={card.location}
                                                        onChange={(e) => handleCardChange(i, 'location', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label small fw-bold">Image URL</label>
                                                    <input className="form-control" style={inputStyle}
                                                        value={card.image}
                                                        onChange={(e) => handleCardChange(i, 'image', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-4 p-3 bg-white rounded border">
                                                <h6 className="small fw-bold border-bottom pb-2 mb-3">Property Overview</h6>
                                                <div className="row g-3">
                                                    {Object.keys(card.propertyOverview).map(field => (
                                                        <div key={field} className="col-md-4 col-6">
                                                            <label className="form-label x-small text-muted text-capitalize mb-1" style={{ fontSize: '0.75rem' }}>
                                                                {field.replace(/([A-Z])/g, ' $1')}
                                                            </label>
                                                            <input
                                                                type={typeof card.propertyOverview[field] === 'number' ? 'number' : 'text'}
                                                                className="form-control form-control-sm"
                                                                style={inputStyle}
                                                                value={card.propertyOverview[field]}
                                                                onChange={(e) =>
                                                                    handleOverviewChange(i, field, e.target.value)
                                                                }
                                                                min="0"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="modal-footer border-0 px-0 pb-0 pt-3">
                                        <button type="button" className="btn btn-light" onClick={handleClose} disabled={loading}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                            {loading ? (
                                                <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</>
                                            ) : (
                                                <><i className="fa fa-save me-2"></i>{editingId ? 'Update Section' : 'Save Section'}</>
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

export default Featured;
