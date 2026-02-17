import React, { useState, useEffect } from 'react';
import Featured from './Featured';

const Home = () => {
    const [activeTab, setActiveTab] = useState('hero');
    const [formData, setFormData] = useState({
        heading: '',
        subheading: '',
        buttonText: '',
        buttonLink: '',
        videoUrl: ''
    });
    const [heroes, setHeroes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showModal, setShowModal] = useState(false);

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

    useEffect(() => {
        if (activeTab === 'hero') {
            fetchHeroes();
        }
    }, [activeTab]);

    const fetchHeroes = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/hero`);
            const result = await response.json();

            if (result.success) {
                setHeroes(result.data);
                if (result.data.length > 0) {
                    const firstHero = result.data[0];
                    setFormData({
                        heading: firstHero.heading,
                        subheading: firstHero.subheading,
                        buttonText: firstHero.buttonText,
                        buttonLink: firstHero.buttonLink,
                        videoUrl: firstHero.videoUrl
                    });
                    setEditingId(firstHero._id);
                }
            }
        } catch (error) {
            console.error('Error fetching heroes:', error);
            setMessage({ type: 'error', text: 'Failed to fetch hero data' });
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
                ? `${baseUrl}/api/hero/${editingId}`
                : `${baseUrl}/api/hero`;

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
                    text: editingId ? 'Hero updated successfully!' : 'Hero created successfully!'
                });
                fetchHeroes();

                // Close modal and reset form
                setShowModal(false);
                handleReset();
            } else {
                setMessage({ type: 'error', text: result.message || 'Operation failed' });
            }
        } catch (error) {
            console.error('Error saving hero:', error);
            setMessage({ type: 'error', text: 'Failed to save hero data' });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            heading: '',
            subheading: '',
            buttonText: '',
            buttonLink: '',
            videoUrl: ''
        });
        setEditingId(null);
        setMessage({ type: '', text: '' });
    };

    // Open modal for editing
    const handleEdit = (hero) => {
        setFormData({
            heading: hero.heading,
            subheading: hero.subheading,
            buttonText: hero.buttonText,
            buttonLink: hero.buttonLink,
            videoUrl: hero.videoUrl
        });
        setEditingId(hero._id);
        setShowModal(true);
    };

    // Open modal for adding new hero
    const handleAddNew = () => {
        setFormData({
            heading: '',
            subheading: '',
            buttonText: '',
            buttonLink: '',
            videoUrl: ''
        });
        setEditingId(null);
        setShowModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        handleReset();
    };

    // Delete hero
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this hero?')) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/api/hero/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (result.success) {
                setMessage({ type: 'success', text: 'Hero deleted successfully!' });
                fetchHeroes(); // Refresh the list

                // If the deleted item was being edited, reset the form
                if (editingId === id) {
                    handleReset();
                }
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to delete hero' });
            }
        } catch (error) {
            console.error('Error deleting hero:', error);
            setMessage({ type: 'error', text: 'Failed to delete hero' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid py-4 bg-light min-vh-100">
            <div className="container" style={{ maxWidth: '1200px' }}>
                <h1 className="mb-4 fw-bold">Home Page Management</h1>

                {/* Bootstrap Tabs Navigation */}
                <ul className="nav nav-tabs mb-4" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === 'hero' ? 'active' : ''}`}
                            onClick={() => setActiveTab('hero')}
                            type="button"
                        >
                            <i className="fa fa-star me-2"></i> Hero
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === 'featured' ? 'active' : ''}`}
                            onClick={() => setActiveTab('featured')}
                            type="button"
                        >
                            <i className="fa fa-trophy me-2"></i> Featured
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === 'values' ? 'active' : ''}`}
                            onClick={() => setActiveTab('values')}
                            type="button"
                        >
                            <i className="fa fa-heart me-2"></i> Our Values
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
                            onClick={() => setActiveTab('projects')}
                            type="button"
                        >
                            <i className="fa fa-briefcase me-2"></i> Our Projects
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                    {/* Hero Tab */}
                    {activeTab === 'hero' && (
                        <div className="tab-pane fade show active">
                            {message.text && (
                                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}>
                                    {message.text}
                                    <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
                                </div>
                            )}

                            {heroes.length > 0 && (
                                <div className="card shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="mb-0">Existing Heroes</h5>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={handleAddNew}
                                            >
                                                <i className="fa fa-plus me-2"></i> Add New Hero
                                            </button>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped align-middle">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Heading</th>
                                                        <th>Subheading</th>
                                                        <th>Button</th>
                                                        <th>Created</th>
                                                        <th style={{ width: '150px' }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {heroes.map(hero => (
                                                        <tr key={hero._id}>
                                                            <td>{hero.heading}</td>
                                                            <td>{hero.subheading}</td>
                                                            <td>{hero.buttonText}</td>
                                                            <td>{new Date(hero.createdAt).toLocaleDateString()}</td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={() => handleEdit(hero)}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-sm btn-danger"
                                                                        onClick={() => handleDelete(hero._id)}
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
                        </div>
                    )}

                    {/* Featured Tab */}
                    {activeTab === 'featured' && (
                        <Featured />
                    )}

                    {/* Our Values Tab */}
                    {activeTab === 'values' && (
                        <div className="tab-pane fade show active">
                            <div className="card shadow-sm">
                                <div className="card-body p-5 text-center">
                                    <i className="fa fa-heart fa-3x text-muted mb-3"></i>
                                    <h4 className="card-title mb-3">Our Values Section</h4>
                                    <p className="text-muted mb-0">Content management for company values will be available here.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Our Projects Tab */}
                    {activeTab === 'projects' && (
                        <div className="tab-pane fade show active">
                            <div className="card shadow-sm">
                                <div className="card-body p-5 text-center">
                                    <i className="fa fa-briefcase fa-3x text-muted mb-3"></i>
                                    <h4 className="card-title mb-3">Our Projects Section</h4>
                                    <p className="text-muted mb-0">Content management for projects will be available here.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Hero Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className={`fa ${editingId ? 'fa-pencil' : 'fa-plus'} me-2`}></i>
                                    {editingId ? 'Edit Hero Section' : 'Add Hero Section'}
                                </h5>
                                <i className="fa fa-times me-2" onClick={handleCloseModal}></i>
                                {/* <button type="button" className="btn-close" onClick={handleCloseModal}></button> */}
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <table className="table table-borderless">
                                        <tbody>
                                            {/* Heading Field */}
                                            <tr>
                                                <td className="align-middle" style={{ width: '200px' }}>
                                                    <label htmlFor="heading" className="form-label fw-semibold mb-0">
                                                        Heading <span className="text-danger">*</span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="heading"
                                                        name="heading"
                                                        className="form-control"
                                                        style={{ border: '1px solid #ced4da' }}
                                                        value={formData.heading}
                                                        onChange={handleInputChange}
                                                        required
                                                        placeholder="Enter main heading"
                                                    />
                                                </td>
                                            </tr>

                                            {/* Subheading Field */}
                                            <tr>
                                                <td className="align-middle">
                                                    <label htmlFor="subheading" className="form-label fw-semibold mb-0">
                                                        Subheading <span className="text-danger">*</span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="subheading"
                                                        name="subheading"
                                                        className="form-control"
                                                        style={{ border: '1px solid #ced4da' }}
                                                        value={formData.subheading}
                                                        onChange={handleInputChange}
                                                        required
                                                        placeholder="Enter subheading"
                                                    />
                                                </td>
                                            </tr>

                                            {/* Button Text Field */}
                                            <tr>
                                                <td className="align-middle">
                                                    <label htmlFor="buttonText" className="form-label fw-semibold mb-0">
                                                        Button Text <span className="text-danger">*</span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="buttonText"
                                                        name="buttonText"
                                                        className="form-control"
                                                        style={{ border: '1px solid #ced4da' }}
                                                        value={formData.buttonText}
                                                        onChange={handleInputChange}
                                                        required
                                                        placeholder="e.g., Get Started"
                                                    />
                                                </td>
                                            </tr>

                                            {/* Button Link Field */}
                                            <tr>
                                                <td className="align-middle">
                                                    <label htmlFor="buttonLink" className="form-label fw-semibold mb-0">
                                                        Button Link <span className="text-danger">*</span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="buttonLink"
                                                        name="buttonLink"
                                                        className="form-control"
                                                        style={{ border: '1px solid #ced4da' }}
                                                        value={formData.buttonLink}
                                                        onChange={handleInputChange}
                                                        required
                                                        placeholder="e.g., /contact"
                                                    />
                                                </td>
                                            </tr>

                                            {/* Video URL Field */}
                                            <tr>
                                                <td className="align-middle">
                                                    <label htmlFor="videoUrl" className="form-label fw-semibold mb-0">
                                                        Video URL <span className="text-danger">*</span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <input
                                                        type="url"
                                                        id="videoUrl"
                                                        name="videoUrl"
                                                        className="form-control"
                                                        style={{ border: '1px solid #ced4da' }}
                                                        value={formData.videoUrl}
                                                        onChange={handleInputChange}
                                                        required
                                                        placeholder="https://example.com/video.mp4"
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
                                            className="btn btn-primary gap-2"
                                            disabled={loading}
                                        >
                                            <i className="fa fa-save me-2"></i>
                                            {loading ? 'Saving...' : (editingId ? 'Update Hero' : ' Save Hero')}
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

export default Home;
