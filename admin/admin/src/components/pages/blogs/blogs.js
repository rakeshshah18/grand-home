import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// Fixed configuration: Removed 'bullet' from formats as 'list' covers it
const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'color'],
        ['clean']
    ],
};

const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent', // Removed 'bullet' here to fix the registration error
    'link', 'image', 'color'
];

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        image: '',
        title: '',
        shortDescription: '',
        fullContent: '',
        slug: ''
    });

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/blogs`);
            const result = await res.json();
            if (result.success) {
                setBlogs(result.data);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setMessage({ type: 'danger', text: 'Failed to fetch blogs' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'title' && !editingId) {
                newData.slug = value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
            }
            return newData;
        });
    };

    const handleEditorChange = (content) => {
        setFormData(prev => ({ ...prev, fullContent: content }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = editingId ? `${baseUrl}/api/blogs/${editingId}` : `${baseUrl}/api/blogs`;
            const method = editingId ? 'PUT' : 'POST';

            console.log("Submitting data:", formData);

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (!res.ok) {
                // Log full server error for debugging
                console.error("Server Error Details:", result);
                throw new Error(result.error || result.message || 'Operation failed');
            }

            if (result.success) {
                setMessage({ type: 'success', text: editingId ? ' Blog updated successfully!' : ' Blog published successfully!' });
                fetchBlogs();
                handleClose();
            } else {
                setMessage({ type: 'danger', text: result.message || 'Operation failed' });
            }
        } catch (error) {
            console.error('Error saving blog:', error);
            setMessage({ type: 'danger', text: error.message || 'Server error. Check console for details.' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (blog) => {
        setFormData({
            image: blog.image,
            title: blog.title,
            shortDescription: blog.shortDescription,
            fullContent: blog.fullContent,
            slug: blog.slug
        });
        setEditingId(blog._id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this blog?')) return;
        try {
            const res = await fetch(`${baseUrl}/api/blogs/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMessage({ type: 'success', text: 'Blog deleted!' });
                fetchBlogs();
            } else {
                setMessage({ type: 'danger', text: 'Failed to delete blog' });
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({
            image: '',
            title: '',
            shortDescription: '',
            fullContent: '',
            slug: ''
        });
    };

    const inputStyle = {
        border: '1px solid #777',
        borderRadius: '8px',
        padding: '12px',
        backgroundColor: '#fff',
        color: '#000'
    };

    // Use reliable placeholder images
    const PLACEHOLDER_IMG = "https://placehold.co/600x400?text=No+Image";
    const PREVIEW_PLACEHOLDER = "https://placehold.co/600x400?text=Image+Preview";

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0"><i className="fa fa-newspaper-o me-2 text-primary"></i>Blogs Management</h4>
                <button className="btn btn-primary px-4 shadow-sm" style={{ borderRadius: '8px' }} onClick={() => setShowModal(true)}>
                    <i className="fa fa-plus-circle me-2"></i> Create New Blog
                </button>
            </div>

            {message.text && (
                <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                    {message.text}
                    <button type="button" className="btn-close bg-transparent border-0 text-success" onClick={() => setMessage({ type: '', text: '' })}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            )}

            <div className="card shadow-sm border-0" style={{ borderRadius: '12px' }}>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4" style={{ width: '100px' }}>Preview</th>
                                    <th>Blog Details</th>
                                    <th style={{ width: '350px' }}>Short Description</th>
                                    <th className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map(blog => (
                                    <tr key={blog._id}>
                                        <td className="ps-4">
                                            <img
                                                src={blog.image || PLACEHOLDER_IMG}
                                                alt=""
                                                className="rounded border shadow-sm"
                                                style={{ width: '90px', height: '60px', objectFit: 'cover' }}
                                                onError={(e) => { e.target.src = PLACEHOLDER_IMG }}
                                            />
                                        </td>
                                        <td style={{ maxWidth: '300px' }}>
                                            <div className="fw-bold text-truncate">{blog.title}</div>
                                            <div className="small text-primary text-truncate">/{blog.slug}</div>
                                        </td>
                                        <td>
                                            <div className="text-muted small text-truncate" style={{ maxWidth: '150px' }}>{blog.shortDescription}</div>
                                        </td>
                                        <td className="text-end pe-4">
                                            <div className="d-flex gap-0 justify-content-start" style={{ minWidth: '140px', gap: '5px' }}>
                                                <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(blog)}>
                                                    <i className="fa fa-edit me-1"></i> Edit
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(blog._id)}>
                                                    <i className="fa fa-trash me-1"></i> Delete
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

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.6)' }}>
                    <div className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header bg-white border-bottom p-3">
                                <h5 className="modal-title fw-bold">
                                    <i className={`fa ${editingId ? 'fa-edit' : 'fa-plus-circle'} text-primary me-2`}></i>
                                    {editingId ? ' Update Blog Post' : ' Create New Blog Post'}
                                </h5>
                                <button type="button" className="btn-close bg-transparent border-0" onClick={handleClose}>
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>

                            <div className="modal-body p-4 bg-light">
                                <form id="blogForm" onSubmit={handleSubmit}>
                                    <div className="row g-4">
                                        <div className="col-12 text-center mb-2">
                                            <label className="form-label d-block fw-bold text-muted small">COVER IMAGE PREVIEW</label>
                                            <img
                                                src={formData.image || PREVIEW_PLACEHOLDER}
                                                alt="Preview"
                                                className="img-fluid rounded border shadow-sm"
                                                style={{ maxHeight: '250px', width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                                onError={(e) => { e.target.src = PREVIEW_PLACEHOLDER }}
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-bold text-dark mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                name="image"
                                                className="form-control"
                                                value={formData.image}
                                                onChange={handleInputChange}
                                                style={inputStyle}
                                                required
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>

                                        <div className="col-md-7">
                                            <label className="form-label fw-bold text-dark mb-1">Blog Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                className="form-control"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                style={inputStyle}
                                                required
                                                placeholder="Enter blog heading"
                                            />
                                        </div>

                                        <div className="col-md-5">
                                            <label className="form-label fw-bold text-dark mb-1">URL Slug</label>
                                            <input
                                                type="text"
                                                name="slug"
                                                className="form-control"
                                                value={formData.slug}
                                                onChange={handleInputChange}
                                                style={inputStyle}
                                                required
                                                placeholder="unique-url-slug"
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-bold text-dark mb-1">Short Description (Summary)</label>
                                            <textarea
                                                name="shortDescription"
                                                className="form-control"
                                                rows="2"
                                                value={formData.shortDescription}
                                                onChange={handleInputChange}
                                                style={{ ...inputStyle, resize: 'none' }}
                                                required
                                                placeholder="Write a brief summary of the blog..."
                                            ></textarea>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-bold text-dark mb-1">Full Blog Content (Rich Text)</label>
                                            <div className="bg-white rounded border shadow-sm quill-container" style={{ border: '1px solid #777', overflow: 'hidden' }}>
                                                <div style={{ minHeight: '350px', height: 'auto', resize: 'vertical', overflow: 'auto' }}>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={formData.fullContent || ''}
                                                        onChange={handleEditorChange}
                                                        modules={quillModules}
                                                        formats={quillFormats}
                                                        placeholder="Write your detailed blog content here..."
                                                    />
                                                </div>
                                            </div>
                                            <small className="text-muted mt-1 d-block"><i className="fa fa-info-circle me-1"></i>Drag bottom-right corner to resize editor area.</small>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer bg-white p-3 border-top">
                                <button type="button" className="btn btn-secondary px-4" onClick={handleClose}>Cancel</button>
                                <button type="submit" form="blogForm" className="btn btn-primary px-5 fw-bold" disabled={loading}>
                                    {loading ? (
                                        <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</>
                                    ) : (
                                        <><i className="fa fa-save me-2"></i>{editingId ? ' Update Blog' : ' Publish Blog'}</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                .quill-container .ql-toolbar {
                    border: none !important;
                    border-bottom: 1px solid #ddd !important;
                    background: #f8f9fa;
                }
                .quill-container .ql-container {
                    border: none !important;
                    font-size: 16px;
                }
                .quill-container .ql-editor {
                    min-height: 300px;
                }
            `}</style>
        </div>
    );
};

export default Blogs;