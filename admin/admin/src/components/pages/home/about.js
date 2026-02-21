import React, { useEffect, useState } from "react";
import { getHeaders, baseUrl } from '../../../utils/api';

const initialForm = {
    heading: "",
    description: "",
    imageOne: "",
    imageTwo: "",
    buttonText: "",
    buttonLink: ""
};

export default function AboutAdmin() {
    const [form, setForm] = useState(initialForm);
    const [aboutList, setAboutList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const API = `${baseUrl}/api/about`;

    // Fetch all
    const fetchAbout = async () => {
        try {
            console.log("Fetching from:", API);
            const res = await fetch(API);

            if (!res.ok) {
                const text = await res.text();
                console.error(`Fetch failed with status ${res.status}:`, text.substring(0, 100));
                return;
            }

            const data = await res.json();
            if (data.success) {
                setAboutList(data.data || []);
            }
        } catch (error) {
            console.error("Error fetching about:", error);
        }
    };

    useEffect(() => {
        fetchAbout();
    }, []);

    // Handle input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Create / Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const method = editId ? "PUT" : "POST";
            const url = editId ? `${API}/${editId}` : API;

            console.log(`Submitting ${method} to:`, url);

            const res = await fetch(url, {
                method,
                headers: getHeaders(),
                body: JSON.stringify(form)
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await res.text();
                throw new Error(`Expected JSON but received ${contentType}. Content: ${text.substring(0, 100)}`);
            }

            const result = await res.json();

            if (res.ok) {
                setForm(initialForm);
                setEditId(null);
                setShowModal(false);
                fetchAbout();
                alert(result.message || (editId ? "Updated successfully" : "Created successfully"));
            } else {
                alert(result.message || "Something went wrong");
            }
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Edit
    const handleEdit = (item) => {
        setForm({
            heading: item.heading,
            description: item.description,
            imageOne: item.imageOne,
            imageTwo: item.imageTwo,
            buttonText: item.buttonText,
            buttonLink: item.buttonLink
        });
        setEditId(item._id);
        setShowModal(true);
    };

    // Delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            try {
                const res = await fetch(`${API}/${id}`, {
                    method: "DELETE",
                    headers: getHeaders()
                });
                if (res.ok) {
                    fetchAbout();
                    alert("Deleted successfully");
                } else {
                    alert("Failed to delete");
                }
            } catch (error) {
                alert("Error deleting: " + error.message);
            }
        }
    };

    const handleOpenModal = () => {
        setForm(initialForm);
        setEditId(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditId(null);
        setForm(initialForm);
    };

    // Style for input borders
    const inputStyle = {
        border: "1px solid #bddbfaff", // Explicit gray border
    };

    return (
        <div className="container-fluid py-4">
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">About Sections</h5>
                    <button className="btn btn-primary" onClick={handleOpenModal}>
                        <i className="fa fa-plus me-2"></i> Create Section
                    </button>
                </div>
                <div className="card-body">
                    {aboutList.length === 0 ? (
                        <div className="text-center py-5 text-muted">
                            <i className="fa fa-info-circle fa-3x mb-3" style={{ opacity: 0.3 }}></i>
                            <p>No about entries found. Click "Create Section" to add one.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Heading</th>
                                        <th>Description</th>
                                        <th>Buttons</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aboutList.map((item) => (
                                        <tr key={item._id}>
                                            <td className="fw-bold">{item.heading}</td>
                                            <td className="text-muted small" style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {item.description}
                                            </td>
                                            <td>
                                                <p href={item.buttonLink} target="_blank" rel="noreferrer" className="badge bg-info text-decoration-none">
                                                    {item.buttonText}
                                                </p>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(item)}>
                                                    <i className="fa fa-pencil"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id)}>
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

            {/* Modal for Create/Update */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className={`fa ${editId ? 'fa-pencil' : 'fa-plus'} me-2`}></i>
                                    {editId ? " Update About Section" : " Create About Section"}
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}>
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                            <div className="modal-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label fw-bold">Heading</label>
                                            <input
                                                name="heading"
                                                placeholder="Enter Heading"
                                                value={form.heading}
                                                onChange={handleChange}
                                                className="form-control"
                                                style={inputStyle}
                                                required
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-bold">Description</label>
                                            <textarea
                                                name="description"
                                                placeholder="Enter Description"
                                                value={form.description}
                                                onChange={handleChange}
                                                onInput={(e) => {
                                                    e.target.style.height = 'auto';
                                                    e.target.style.height = e.target.scrollHeight + 'px';
                                                }}
                                                className="form-control"
                                                style={{ ...inputStyle, minHeight: '100px', overflowY: 'auto' }}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Image One (URL)</label>
                                            <input
                                                name="imageOne"
                                                placeholder="Image One URL"
                                                value={form.imageOne}
                                                onChange={handleChange}
                                                className="form-control"
                                                style={inputStyle}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Image Two (URL)</label>
                                            <input
                                                name="imageTwo"
                                                placeholder="Image Two URL"
                                                value={form.imageTwo}
                                                onChange={handleChange}
                                                className="form-control"
                                                style={inputStyle}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Button Text</label>
                                            <input
                                                name="buttonText"
                                                placeholder="Button Text"
                                                value={form.buttonText}
                                                onChange={handleChange}
                                                className="form-control"
                                                style={inputStyle}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Button Link</label>
                                            <input
                                                name="buttonLink"
                                                placeholder="Button Link"
                                                value={form.buttonLink}
                                                onChange={handleChange}
                                                className="form-control"
                                                style={inputStyle}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="modal-footer border-0 px-0 pb-0 pt-4">
                                        <button type="button" className="btn btn-secondary px-4" onClick={handleCloseModal}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                            <i className="fa fa-save"></i>
                                            {loading ? "Processing..." : (editId ? " Update" : " Save")}
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
}
