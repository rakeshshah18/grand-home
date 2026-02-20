import React, { useState, useEffect } from 'react';

const GetInTouch = () => {
    const [heading, setHeading] = useState('');
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/getInTouch`);
            const result = await res.json();
            if (result.success) {
                setHeading(result.data.heading || '');
                // Initialize isEditing to false for existing sections
                const loadedSections = (result.data.sections || []).map(section => ({
                    ...section,
                    isEditing: false
                }));
                setSections(loadedSections);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage({ type: 'danger', text: 'Failed to fetch content' });
        }
    };

    const handleSectionChange = (index, field, value) => {
        const updatedSections = [...sections];
        updatedSections[index][field] = value;
        setSections(updatedSections);
    };

    const addSection = () => {
        setSections([...sections, { title: '', description: '', icon: 'fa fa-circle', isEditing: true }]);
    };

    const saveContent = async (currentHeading, currentSections) => {
        setLoading(true);
        // Remove isEditing flag before sending
        const sectionsToSend = currentSections.map(({ isEditing, ...rest }) => rest);

        try {
            const res = await fetch(`${baseUrl}/api/getInTouch`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ heading: currentHeading, sections: sectionsToSend })
            });
            const result = await res.json();
            if (result.success) {
            } else {
                setMessage({ type: 'danger', text: result.message || 'Update failed' });
            }
        } catch (error) {
            console.error('Error updating content:', error);
            setMessage({ type: 'danger', text: 'Server error.' });
        } finally {
            setLoading(false);
        }
    };

    const removeSection = (index) => {
        if (!window.confirm("Are you sure you want to remove this section?")) return;
        const updatedSections = sections.filter((_, i) => i !== index);
        setSections(updatedSections);
        saveContent(heading, updatedSections);
    };

    const toggleEdit = (index) => {
        const updatedSections = [...sections];
        const isFinishingEdit = updatedSections[index].isEditing; // If true, we are about to turn it off -> SAVE
        updatedSections[index].isEditing = !updatedSections[index].isEditing;
        setSections(updatedSections);

        if (isFinishingEdit) {
            saveContent(heading, updatedSections);
        }
    };

    const handleHeadingBlur = () => {
        saveContent(heading, sections);
    };

    const [activeTab, setActiveTab] = useState('getInTouch');

    return (
        <div className="container-fluid py-4">
            <h4 className="fw-bold mb-4" style={{
                paddingLeft: '55px'
            }}><i className="fa fa-address-book me-2 text-primary"></i> Contact Us Management</h4>

            {message.text && (
                <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                    <i className={`fa ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
                    {message.text}
                    <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
                </div>
            )}

            <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
                <div className="card-header bg-white border-bottom-0 pt-4 px-4 pb-0">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'getInTouch' ? 'active fw-bold text-primary' : 'text-muted'}`}
                                onClick={() => setActiveTab('getInTouch')}
                            >
                                <i className="fa fa-envelope-o me-2"></i> Get In Touch
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'scheduleVisit' ? 'active fw-bold text-primary' : 'text-muted'}`}
                                onClick={() => setActiveTab('scheduleVisit')}
                            >
                                <i className="fa fa-calendar-check-o me-2"></i> Schedule Visit
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="card-body p-4">
                    {activeTab === 'getInTouch' && (
                        <>
                            {/* Main Heading */}
                            <div className="mb-4">
                                <label className="form-label fw-bold text-secondary">Main Heading</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={heading}
                                    onChange={(e) => setHeading(e.target.value)}
                                    onBlur={handleHeadingBlur}
                                    placeholder="e.g., Let's Start a Conversation"
                                    style={{
                                        borderRadius: '10px',
                                        border: '1px solid #ccc'
                                    }}
                                    required
                                />
                                <div className="form-text small">This will be the main title displayed on your contact page. Changes are saved automatically when you click outside.</div>
                            </div>

                            <hr className="my-4" />

                            {/* Sections Management */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h5 className="fw-bold m-0 text-dark">Contact Information Blocks</h5>
                                    <small className="text-muted">Manage the contact details blocks (e.g., Phone, Email, Address)</small>
                                </div>
                                <button type="button" className="btn btn-outline-primary btn-sm rounded px-3" onClick={addSection}>
                                    <i className="fa fa-plus me-1"></i> Add Block
                                </button>
                            </div>

                            <div className="row g-4">
                                {sections.map((section, index) => (
                                    <div key={index} className="col-md-6 col-xl-4">
                                        <div className="card h-100 border-0 shadow-sm bg-light bg-opacity-25" style={{ borderRadius: '16px', transition: 'all 0.3s ease' }}>
                                            <div className="card-header bg-transparent d-flex justify-content-between align-items-center py-3 px-3 border-bottom-0">
                                                <span className="badge bg-white text-dark shadow-sm border"># {index + 1}</span>
                                                <div>
                                                    <button
                                                        type="button"
                                                        className={`btn btn-sm ${section.isEditing ? 'btn-success' : 'btn-light text-primary'} me-2 rounded-circle`}
                                                        style={{ width: '32px', height: '32px' }}
                                                        onClick={() => toggleEdit(index)}
                                                        title={section.isEditing ? "Save This Block" : "Edit This Block"}
                                                    >
                                                        <i className={`fa ${section.isEditing ? 'fa-check' : 'fa-pencil'}`}></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-light text-danger rounded-circle"
                                                        style={{ width: '32px', height: '32px' }}
                                                        onClick={() => removeSection(index)}
                                                        title="Remove This Block"
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body p-3" style={{
                                                backgroundColor: "#fff"
                                            }}>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-muted mb-1 text-uppercase" style={{ fontSize: '0.75rem' }}>Title</label>
                                                    {section.isEditing ? (
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm bg-white"
                                                            value={section.title}
                                                            onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                                                            placeholder="e.g., Phone Support"
                                                            style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}
                                                        />
                                                    ) : (
                                                        <div className="fw-bold text-dark fs-6">{section.title || <em className="text-muted">No Title</em>}</div>
                                                    )}
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-muted mb-1 text-uppercase" style={{ fontSize: '0.75rem' }}>Icon Class</label>
                                                    {section.isEditing ? (
                                                        <div className="input-group input-group-sm">
                                                            <span className="input-group-text bg-white" style={{
                                                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                                                }}>
                                                                <i className={section.icon || 'fa fa-circle'} style={{ minWidth: '16px', textAlign: 'center' }}></i>
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="form-control bg-white"
                                                                value={section.icon}
                                                                onChange={(e) => handleSectionChange(index, 'icon', e.target.value)}
                                                                placeholder="e.g., fa fa-phone"
                                                                style={{ border: '1px solid rgba(0, 0, 0, 0.2)', borderLeft: 'none' }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="d-flex align-items-center text-muted">
                                                            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm me-2" style={{ width: '24px', height: '24px', marginRight: '5px'}}>
                                                                <i className={`${section.icon || 'fa fa-circle'} text-primary small`}></i>
                                                            </div>
                                                            <span className="small font-monospace">{section.icon}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mb-0">
                                                    <label className="form-label small fw-bold text-muted mb-1 text-uppercase" style={{ fontSize: '0.75rem' }}>Content</label>
                                                    {section.isEditing ? (
                                                        <textarea
                                                            className="form-control form-control-sm bg-white"
                                                            rows="3"
                                                            value={section.description}
                                                            onChange={(e) => handleSectionChange(index, 'description', e.target.value)}
                                                            placeholder="e.g., +1 (555) 123-4567"
                                                            style={{
                                                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                                                overflowY: 'hidden',
                                                                resize: 'vertical'
                                                            }}
                                                        ></textarea>
                                                    ) : (
                                                        <div className="text-secondary small text-break" style={{ whiteSpace: 'pre-wrap' }}>
                                                            {section.description || <em>No details provided</em>}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {sections.length === 0 && (
                                <div className="text-center py-5 text-muted border border-dashed rounded-3 bg-light opacity-75 mt-4">
                                    <i className="fa fa-folder-open-o mb-3 display-4 text-secondary opacity-50"></i>
                                    <h6 className="fw-bold">No Contact Blocks Found</h6>
                                    <p className="small mb-0">Click the "Add New Block" button above to get started.</p>
                                </div>
                            )}

                            {loading && (
                                <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                                    <div className="toast show align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
                                        <div className="d-flex">
                                            <div className="toast-body">
                                                <i className="fa fa-spinner fa-spin me-2"></i> Saving changes...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'scheduleVisit' && (
                        <div className="text-center py-5">
                            <i className="fa fa-calendar-times-o display-1 text-muted opacity-25 mb-3"></i>
                            <h4 className="text-muted">Schedule Visit Configuration</h4>
                            <p className="lead text-muted small">This section is currently under development.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;