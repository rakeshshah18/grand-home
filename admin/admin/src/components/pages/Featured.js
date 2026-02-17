import React, { useState, useEffect } from 'react';

const Featured = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: ''
    });
    const [features, setFeatures] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showModal, setShowModal] = useState(false);

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/features`);
            const result = await response.json();

            if (result.success) {
                setFeatures(result.data);
            }
        } catch (error) {
            console.error('Error fetching features:', error);
            setMessage({ type: 'error', text: 'Failed to fetch features data' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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

            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: editingId ? 'Feature updated successfully!' : 'Feature created successfully!'
                });
                fetchFeatures();

                // Close modal and reset form
                setShowModal(false);
                handleReset();
            } else {
                setMessage({ type: 'error', text: result.message || 'Operation failed' });
            }
        } catch (error) {
            console.error('Error saving feature:', error);
            setMessage({ type: 'error', text: 'Failed to save feature data' });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            title: '',
            description: '',
            imageUrl: ''
        });
        setEditingId(null);
        setMessage({ type: '', text: '' });
    };

    const handleEdit = (feature) => {
        setFormData({
            title: feature.title,
            description: feature.description,
            imageUrl: feature.imageUrl
        });
        setEditingId(feature._id);
        setShowModal(true);
    };

    const handleAddNew = () => {
        setFormData({
            title: '',
            description: '',
            imageUrl: ''
        });
        setEditingId(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        handleReset();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this feature?')) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/api/features/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (result.success) {
                setMessage({ type: 'success', text: 'Feature deleted successfully!' });
                fetchFeatures();

                if (editingId === id) {
                    handleReset();
                }
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to delete feature' });
            }
        } catch (error) {
            console.error('Error deleting feature:', error);
            setMessage({ type: 'error', text: 'Failed to delete feature' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tab-pane fade show active">
            {message.text && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}>
                    {message.text}
                    <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
                </div>
            )}

            {features.length > 0 && (
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">Existing Features</h5>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={handleAddNew}
                            >
                                <i className="fa fa-plus me-2"></i> Add New Feature
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-striped align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Created</th>
                                        <th style={{ width: '150px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {features.map(feature => (
                                        <tr key={feature._id}>
                                            <td>{feature.title}</td>
                                            <td>{feature.description}</td>
                                            <td>{new Date(feature.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => handleEdit(feature)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDelete(feature._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {features.length === 0 && (
                <div className="card shadow-sm">
                    <div className="card-body p-5 text-center">
                        <i className="fa fa-trophy fa-3x text-muted mb-3"></i>
                        <h4 className="card-title mb-3">Featured Section</h4>
                        <p className="text-muted mb-3">No features available yet.</p>
                        <button
                            className="btn btn-primary"
                            onClick={handleAddNew}
                        >
                            <i className="fa fa-plus me-2"></i> Add First Feature
                        </button>
                    </div>
                </div>
            )}

            {/* Edit/Add Feature Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className={`fa ${editingId ? 'fa-pencil' : 'fa-plus'} me-2`}></i>
                                    {editingId ? 'Edit Feature' : 'Add Feature'}
                                </h5>
                                <i className="fa fa-times me-2" onClick={handleCloseModal} style={{ cursor: 'pointer' }}></i>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <table className="table table-borderless">
                                        <tbody>
                                            {/* Title Field */}
                                            <tr>
                                                <td className="align-middle" style={{ width: '200px' }}>
                                                    <label htmlFor="title" className="form-label fw-semibold mb-0">
                                                        Title <span className="text-danger">*</span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        className="form-control"
                                                        style={{ border: '1px solid #ced4da' }}
                                                        value={formData.title}
                                                        onChange={handleInputChange}
                                                        required
                                                        placeholder="Enter feature title"
                                                    />
                                                </td>
                                            </tr>

                                            {/* Description Field */}
                                            <tr>
                                                <td className="align-middle">
                                                    <label htmlFor="description" className="form-label fw-semibold mb-0">
                                                        Description <span className="text-danger">*</span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        className="form-control"
                                                        style={{ border: '1px solid #ced4da' }}
                                                        value={formData.description}
                                                        onChange={handleInputChange}
                                                        required
                                                        rows="3"
                                                        placeholder="Enter feature description"
                                                    />
                                                </td>
                                            </tr>

                                            {/* Image URL Field */}
                                            <tr>
                                                <td className="align-middle">
                                                    <label htmlFor="imageUrl" className="form-label fw-semibold mb-0">
                                                        Image URL
                                                    </label>
                                                </td>
                                                <td>
                                                    <input
                                                        type="url"
                                                        id="imageUrl"
                                                        name="imageUrl"
                                                        className="form-control"
                                                        style={{ border: '1px solid #ced4da' }}
                                                        value={formData.imageUrl}
                                                        onChange={handleInputChange}
                                                        placeholder="https://example.com/image.jpg"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleCloseModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            <i className="fa fa-save me-2"></i>
                                            {loading ? 'Saving...' : (editingId ? 'Update Feature' : 'Save Feature')}
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
