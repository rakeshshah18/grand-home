import React, { useState, useEffect } from "react";
import { getHeaders, baseUrl } from '../../../utils/api';
import Points from "./points";

const About = () => {
    const [aboutList, setAboutList] = useState([]);
    const [formData, setFormData] = useState({
        heading: [""],
        description: [""],
        image: [""]
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState({ type: "", text: "" });

    const API = `${baseUrl}/api/aboutPage`;

    useEffect(() => {
        fetchAboutData();
    }, []);

    const fetchAboutData = async () => {
        try {
            setFetching(true);
            const response = await fetch(API);
            const result = await response.json();

            if (response.ok && result.success) {
                setAboutList(result.data || []);
            }
        } catch (error) {
            console.error("Error fetching about page data:", error);
            setMessage({ type: "danger", text: "Failed to load sections." });
        } finally {
            setFetching(false);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setFormData({
                heading: item.heading && item.heading.length > 0 ? [...item.heading] : [""],
                description: item.description && item.description.length > 0 ? [...item.description] : [""],
                image: item.image && item.image.length > 0 ? [...item.image] : [""]
            });
            setEditId(item._id);
        } else {
            setFormData({ heading: [""], description: [""], image: [""] });
            setEditId(null);
        }
        setShowModal(true);
        setMessage({ type: "", text: "" });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditId(null);
        setFormData({ heading: [""], description: [""], image: [""] });
    };

    const handleArrayChange = (field, index, value) => {
        const newArr = [...formData[field]];
        newArr[index] = value;
        setFormData({ ...formData, [field]: newArr });
    };

    const addArrayField = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const removeArrayField = (field, index) => {
        const newArr = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: newArr.length > 0 ? newArr : [""] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            heading: formData.heading.filter(s => s.trim() !== ""),
            description: formData.description.filter(s => s.trim() !== ""),
            image: formData.image.filter(s => s.trim() !== "")
        };

        try {
            const method = editId ? 'PUT' : 'POST';
            const url = editId ? `${API}/${editId}` : API;

            const response = await fetch(url, {
                method,
                headers: getHeaders(),
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setMessage({ type: "success", text: result.message });
                fetchAboutData();
                handleCloseModal();
            } else {
                setMessage({ type: "danger", text: result.message || "Operation failed." });
            }
        } catch (error) {
            console.error("Error saving data:", error);
            setMessage({ type: "danger", text: "Connection error." });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this section?")) return;

        try {
            const response = await fetch(`${API}/${id}`, {
                method: 'DELETE',
                headers: getHeaders()
            });
            const result = await response.json();

            if (response.ok && result.success) {
                setMessage({ type: "success", text: "Section deleted successfully." });
                fetchAboutData();
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const inputStyle = {
        border: "1px solid #ced4da",
        padding: "0.6rem 0.75rem"
    };

    const labelAreaStyle = {
        width: '140px',
        paddingTop: '15px'
    };

    return (
        <div className="container-fluid py-4">
            {/* Dashboard View */}
            <div className="card shadow-sm border-0 bg-white" style={{ borderRadius: '12px' }}>
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center border-bottom">
                    <h5 className="mb-0 fw-bold text-dark"
                        style={{
                            paddingLeft: '35px'
                        }}>
                        <i className="fa fa-info-circle text-primary me-2"></i> About Page Sections
                    </h5>
                    <button className="btn btn-primary px-4 shadow-sm" onClick={() => handleOpenModal()}>
                        <i className="fa fa-plus-circle me-2"></i> Create New Section
                    </button>
                </div>

                <div className="card-body p-0">
                    {message.text && !showModal && (
                        <div className={`alert alert-${message.type} m-3 alert-dismissible fade show`} role="alert">
                            {message.text}
                            <button type="button" className="btn-close bg-transparent border-0" onClick={() => setMessage({ type: "", text: "" })}>
                                <i className="fa fa-times text-danger"></i>
                            </button>
                        </div>
                    )}

                    {fetching ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status"></div>
                            <p className="mt-2 text-muted">Loading content...</p>
                        </div>
                    ) : (
                        <div className="table-responsive" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light sticky-top" style={{ zIndex: 1 }}>
                                    <tr>
                                        <th className="ps-4" style={{ width: '120px' }}>Images</th>
                                        <th>Primary Content</th>
                                        <th className="text-end pe-4" style={{ width: '150px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aboutList.length > 0 ? (
                                        aboutList.map((item) => (
                                            <tr key={item._id}>
                                                <td className="ps-4">
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {item.image && item.image.length > 0 ? (
                                                            item.image.map((img, idx) => (
                                                                <img key={idx} src={img} alt="thumb" className="rounded border shadow-sm" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                                            ))
                                                        ) : (
                                                            <div className="bg-light border rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                                                <i className="fa fa-image text-muted small"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="py-2">
                                                        <h6 className="mb-1 text-dark fw-bold">{item.heading?.[0] || "Untitled Section"}</h6>
                                                        <p className="mb-0 text-muted small text-truncate" style={{ maxWidth: '600px' }}>
                                                            {item.description?.[0] || "No description provided"}
                                                        </p>
                                                        {((item.heading?.length > 1) || (item.description?.length > 1) || (item.image?.length > 1)) && (
                                                            <div className="mt-2">
                                                                <span className="badge bg-light text-primary border fw-normal">
                                                                    <i className="fa fa-list-ul me-1"></i> Multi-field section
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="text-end pe-4">
                                                    <button className="btn btn-sm btn-light border shadow-sm me-2" onClick={() => handleOpenModal(item)}>
                                                        <i className="fa fa-edit text-primary"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-light border shadow-sm" onClick={() => handleDelete(item._id)}>
                                                        <i className="fa fa-trash text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-5 text-muted">
                                                <p className="mb-0">No sections found. Start by creating a new one.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Points and Call Section Placeholder */}
            <Points />

            {/* Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
                            <div className="modal-header bg-white border-bottom px-4 py-3">
                                <h5 className="modal-title fw-bold text-dark">
                                    <i className={`fa ${editId ? 'fa-pencil-square-o' : 'fa-plus-circle'} text-primary me-2`}></i>
                                    {editId ? " Update Section Content" : " Create New About Section"}
                                </h5>
                                <button type="button" className="btn-close shadow-none bg-white border-0" onClick={handleCloseModal}><i className="fa fa-times"></i></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body p-4 bg-light" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                                    <div className="card border-0 shadow-sm p-3 mb-0" style={{ borderRadius: '12px' }}>
                                        <table className="table table-borderless align-middle mb-0">
                                            <tbody>
                                                {/* Headings */}
                                                <tr>
                                                    <td style={labelAreaStyle}>
                                                        <label className="fw-bold mb-0 text-dark">Headings</label>
                                                    </td>
                                                    <td className="pb-4">
                                                        {formData.heading.map((h, i) => (
                                                            <div key={i} className={`d-flex gap-2 ${i !== formData.heading.length - 1 ? 'mb-2' : ''}`}>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    style={inputStyle}
                                                                    value={h}
                                                                    onChange={(e) => handleArrayChange('heading', i, e.target.value)}
                                                                    placeholder="Enter heading..."
                                                                />
                                                                <div className="d-flex gap-1">
                                                                    {formData.heading.length > 1 && (
                                                                        <button type="button" className="btn btn-outline-danger p-0 d-flex align-items-center justify-content-center"
                                                                            style={{ width: '38px', height: '100%', border: '1px solid #ced4da' }} onClick={() => removeArrayField('heading', i)}>
                                                                            <i className="fa fa-trash-o"></i>
                                                                        </button>
                                                                    )}
                                                                    {i === formData.heading.length - 1 && (
                                                                        <button type="button" className="btn btn-outline-primary p-0 d-flex align-items-center justify-content-center"
                                                                            style={{ width: '38px', height: '100%', border: '1px solid #ced4da' }} onClick={() => addArrayField('heading')}>
                                                                            <i className="fa fa-plus"></i>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </td>
                                                </tr>

                                                {/* Descriptions */}
                                                <tr>
                                                    <td style={labelAreaStyle}>
                                                        <label className="fw-bold mb-0 text-dark">Descriptions</label>
                                                    </td>
                                                    <td className="pb-4">
                                                        {formData.description.map((d, i) => (
                                                            <div key={i} className={`d-flex gap-2 ${i !== formData.description.length - 1 ? 'mb-3' : ''}`}>
                                                                <textarea
                                                                    className="form-control"
                                                                    style={{ ...inputStyle, minHeight: '80px', resize: 'none' }}
                                                                    value={d}
                                                                    onChange={(e) => handleArrayChange('description', i, e.target.value)}
                                                                    onInput={(e) => {
                                                                        e.target.style.height = 'auto';
                                                                        e.target.style.height = e.target.scrollHeight + 'px';
                                                                    }}
                                                                    placeholder="Enter detailed description..."
                                                                />
                                                                <div className="d-flex flex-column gap-1">
                                                                    {formData.description.length > 1 && (
                                                                        <button type="button" className="btn btn-outline-danger p-0 d-flex align-items-center justify-content-center"
                                                                            style={{ width: '38px', height: '38px', border: '1px solid #ced4da' }} onClick={() => removeArrayField('description', i)}>
                                                                            <i className="fa fa-trash-o"></i>
                                                                        </button>
                                                                    )}
                                                                    {i === formData.description.length - 1 && (
                                                                        <button type="button" className="btn btn-outline-primary p-0 d-flex align-items-center justify-content-center"
                                                                            style={{ width: '38px', height: '38px', border: '1px solid #ced4da' }} onClick={() => addArrayField('description')}>
                                                                            <i className="fa fa-plus"></i>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </td>
                                                </tr>

                                                {/* Image URLs */}
                                                <tr>
                                                    <td style={labelAreaStyle}>
                                                        <label className="fw-bold mb-0 text-dark">Image URLs</label>
                                                    </td>
                                                    <td>
                                                        {formData.image.map((img, i) => (
                                                            <div key={i} className="mb-3">
                                                                <div className="d-flex gap-2 mb-1">
                                                                    <div className="position-relative flex-grow-1">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            style={inputStyle}
                                                                            value={img}
                                                                            onChange={(e) => handleArrayChange('image', i, e.target.value)}
                                                                            placeholder="Paste image URL..."
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex gap-1">
                                                                        {formData.image.length > 1 && (
                                                                            <button type="button" className="btn btn-outline-danger p-0 d-flex align-items-center justify-content-center"
                                                                                style={{ width: '38px', height: '100%', border: '1px solid #ced4da' }} onClick={() => removeArrayField('image', i)}>
                                                                                <i className="fa fa-trash-o"></i>
                                                                            </button>
                                                                        )}
                                                                        {i === formData.image.length - 1 && (
                                                                            <button type="button" className="btn btn-outline-primary p-0 d-flex align-items-center justify-content-center"
                                                                                style={{ width: '38px', height: '100%', border: '1px solid #ced4da' }} onClick={() => addArrayField('image')}>
                                                                                <i className="fa fa-plus"></i>
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {img && (
                                                                    <div className="mt-1 d-inline-block border rounded p-1 bg-white shadow-sm">
                                                                        <img src={img} alt="preview" style={{ maxHeight: '40px' }}
                                                                            onError={(e) => { e.target.src = "https://via.placeholder.com/100x40?text=Error" }} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="modal-footer bg-white border-top px-4 py-3" style={{ borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
                                    <button type="button" className="btn btn-light px-4 border" onClick={handleCloseModal}>Cancel</button>
                                    <button type="submit" className="btn btn-primary px-5 fw-bold shadow-sm" disabled={loading}>
                                        {loading ? (
                                            <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</>
                                        ) : (
                                            <><i className="fa fa-save me-2"></i> {editId ? "Update Section" : "Save Section"}</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;