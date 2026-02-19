import React, { useState, useEffect } from "react";

const Points = () => {
    const [pointsData, setPointsData] = useState([]);
    const [formData, setFormData] = useState({
        features: [{ text: "", icon: "" }],
        callIcon: "",
        callNumber: ""
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState({ type: "", text: "" });

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
    const API = `${baseUrl}/api/pointsCall`;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setFetching(true);
            const response = await fetch(API);
            const result = await response.json();
            if (response.ok && result.success) {
                setPointsData(result.data || []);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage({ type: "danger", text: "Failed to load points data." });
        } finally {
            setFetching(false);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setFormData({
                features: item.features && item.features.length > 0 ? [...item.features] : [{ text: "", icon: "" }],
                callIcon: item.callIcon || "",
                callNumber: item.callNumber || ""
            });
            setEditId(item._id);
        } else {
            setFormData({
                features: [{ text: "", icon: "" }],
                callIcon: "",
                callNumber: ""
            });
            setEditId(null);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditId(null);
        setMessage({ type: "", text: "" });
    };

    const handlePointChange = (index, field, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index][field] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addPoint = () => {
        setFormData({
            ...formData,
            features: [...formData.features, { text: "", icon: "" }]
        });
    };

    const removePoint = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures.length > 0 ? newFeatures : [{ text: "", icon: "" }] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            features: formData.features.filter(f => f.text.trim() !== "" || f.icon.trim() !== "")
        };

        try {
            const method = editId ? 'PUT' : 'POST';
            const url = editId ? `${API}/${editId}` : API;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (response.ok && result.success) {
                setMessage({ type: "success", text: result.message });
                fetchData();
                setTimeout(handleCloseModal, 1500);
            } else {
                setMessage({ type: "danger", text: result.message || "Failed to save." });
            }
        } catch (error) {
            console.error("Save error:", error);
            setMessage({ type: "danger", text: "Connection error." });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this section?")) return;
        try {
            const response = await fetch(`${API}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchData();
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const inputStyle = { border: "1px solid #ced4da", padding: "0.5rem 0.75rem" };

    const renderIcon = (iconStr, style = {}) => {
        if (!iconStr) return <i className="fa fa-question-circle text-muted"></i>;

        const isUrl = iconStr.startsWith('http') || iconStr.startsWith('data:') || iconStr.includes('/');

        if (isUrl) {
            return (
                <img
                    src={iconStr}
                    alt="icon"
                    className="rounded-circle border shadow-sm"
                    style={{ width: '28px', height: '28px', objectFit: 'cover', ...style }}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/28x28?text=Err"; }}
                />
            );
        }

        return <i className={`${iconStr} text-success`} style={{ fontSize: '1.2rem', ...style }}></i>;
    };

    return (
        <div className="mt-4">
            <div className="card shadow-sm border-0 bg-white" style={{ borderRadius: '12px' }}>
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center border-bottom px-4">
                    <h5 className="mb-0 fw-bold text-dark">
                        <i className="fa fa-list-ol text-success me-2"></i> Points & Call Information
                    </h5>
                    <button className="btn btn-success px-4" onClick={() => handleOpenModal()}>
                        <i className="fa fa-plus-circle me-2"></i> Create Section
                    </button>
                </div>

                <div className="card-body p-0">
                    {fetching ? (
                        <div className="py-5 text-center text-muted">Loading...</div>
                    ) : (
                        <div className="table-responsive" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light sticky-top" style={{ zIndex: 1 }}>
                                    <tr>
                                        <th className="ps-4">Points & High-res Icons</th>
                                        <th>Call Info</th>
                                        <th className="text-end pe-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pointsData.length > 0 ? (
                                        pointsData.map((item) => (
                                            <tr key={item._id}>
                                                <td className="ps-4">
                                                    <div className="small">
                                                        {item.features?.map((f, i) => (
                                                            <div key={i} className="mb-2 d-flex align-items-center">
                                                                <div className="me-3 text-center" style={{ width: '30px' }}>
                                                                    {renderIcon(f.icon)}
                                                                </div>
                                                                <span className="text-dark fw-medium">{f.text}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div style={{ width: '30px', textAlign: 'center' }}>
                                                            {renderIcon(item.callIcon, { color: '#0dcaf0' })}
                                                        </div>
                                                        <span className="fw-bold">{item.callNumber}</span>
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
                                            <td colSpan="3" className="text-center py-4 text-muted small">No points and call sections found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header bg-white border-bottom px-4 py-3">
                                <h5 className="modal-title fw-bold text-dark">
                                    <i className="fa fa-pencil-square-o text-success me-2"></i>
                                    {editId ? "Update Section" : "Add Points & Call Section"}
                                </h5>
                                <button type="button" className="btn-close shadow-none border-0 bg-white" onClick={handleCloseModal}><i className="fa fa-times"></i></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body p-4 bg-light" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                    {message.text && <div className={`alert alert-${message.type} py-2 small shadow-sm`}>{message.text}</div>}

                                    <div className="card border-0 shadow-sm p-3 mb-3">
                                        <h6 className="fw-bold text-dark mb-3 border-bottom pb-2">Individual Points</h6>
                                        <table className="table table-borderless align-middle mb-0">
                                            <thead>
                                                <tr className="small text-muted">
                                                    <th style={{ width: '40%' }}>Point Text</th>
                                                    <th style={{ width: '40%' }}>Icon Class (FontAwesome)</th>
                                                    <th className="text-end">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formData.features.map((f, i) => (
                                                    <tr key={i}>
                                                        <td>
                                                            <input type="text" className="form-control" style={inputStyle} value={f.text}
                                                                onChange={(e) => handlePointChange(i, 'text', e.target.value)} placeholder="Ex: Best Quality" />
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="bg-white border rounded d-flex align-items-center justify-content-center shadow-sm" style={{ width: '38px', height: '38px', flexShrink: 0 }}>
                                                                    {renderIcon(f.icon)}
                                                                </div>
                                                                <input type="text" className="form-control" style={inputStyle} value={f.icon}
                                                                    onChange={(e) => handlePointChange(i, 'icon', e.target.value)} placeholder="fa fa-star or image URL" />
                                                            </div>
                                                        </td>
                                                        <td className="text-end d-flex gap-1 justify-content-end pt-2">
                                                            {formData.features.length > 1 && (
                                                                <button type="button" className="btn btn-outline-danger btn-sm p-0 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} onClick={() => removePoint(i)}>
                                                                    <i className="fa fa-trash"></i>
                                                                </button>
                                                            )}
                                                            {i === formData.features.length - 1 && (
                                                                <button type="button" className="btn btn-outline-success btn-sm p-0 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} onClick={addPoint}>
                                                                    <i className="fa fa-plus"></i>
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="card border-0 shadow-sm p-3">
                                        <h6 className="fw-bold text-dark mb-3 border-bottom pb-2">Call Information (Fixed)</h6>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="small fw-bold text-muted mb-1">Call Icon (Class or URL)</label>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="bg-white border rounded d-flex align-items-center justify-content-center shadow-sm" style={{ width: '38px', height: '38px', flexShrink: 0 }}>
                                                        {renderIcon(formData.callIcon, { color: '#0dcaf0' })}
                                                    </div>
                                                    <input type="text" className="form-control" style={inputStyle} value={formData.callIcon}
                                                        onChange={(e) => setFormData({ ...formData, callIcon: e.target.value })} placeholder="Ex: fa fa-phone" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small fw-bold text-muted mb-1">Phone Number</label>
                                                <input type="text" className="form-control" style={inputStyle} value={formData.callNumber}
                                                    onChange={(e) => setFormData({ ...formData, callNumber: e.target.value })} placeholder="+1 (234) 567-890" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer bg-white border-top px-4 py-3">
                                    <button type="button" className="btn btn-light px-4 border" onClick={handleCloseModal}>Cancel</button>
                                    <button type="submit" className="btn btn-success px-5 fw-bold shadow-sm" disabled={loading}>
                                        {loading ? "Saving..." : "Save Configuration"}
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

export default Points;