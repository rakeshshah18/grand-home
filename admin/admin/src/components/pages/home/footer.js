import React, { useState, useEffect } from 'react';

const Footer = () => {
    const [columns, setColumns] = useState([]);
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isConfigMode, setIsConfigMode] = useState(false);

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

    useEffect(() => {
        fetchFooter();
    }, []);

    const fetchFooter = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/footer`);
            const result = await res.json();
            if (result.success) {
                setColumns(result.data.columns || []);
                setIsActive(result.data.isActive !== undefined ? result.data.isActive : true);
            }
        } catch (error) {
            console.error('Error fetching footer:', error);
            setMessage({ type: 'danger', text: 'Failed to fetch footer content' });
        }
    };

    const handleColumnChange = (index, field, value) => {
        const updatedColumns = [...columns];
        updatedColumns[index][field] = value;
        setColumns(updatedColumns);
    };

    const addColumn = () => {
        setColumns([...columns, { logo: '', description: '', title: '', elements: [], isEditing: true }]);
    };

    const removeColumn = (index) => {
        if (!window.confirm("Are you sure you want to remove this column?")) return;
        const updatedColumns = columns.filter((_, i) => i !== index);
        setColumns(updatedColumns);
        saveFooter(updatedColumns);
    };

    const addElement = (colIndex) => {
        const updatedColumns = [...columns];
        updatedColumns[colIndex].elements.push({ label: '', route: '', icon: '' });
        setColumns(updatedColumns);
    };

    const removeElement = (colIndex, elIndex) => {
        const updatedColumns = [...columns];
        updatedColumns[colIndex].elements = updatedColumns[colIndex].elements.filter((_, i) => i !== elIndex);
        setColumns(updatedColumns);
    };

    const handleElementChange = (colIndex, elIndex, field, value) => {
        const updatedColumns = [...columns];
        updatedColumns[colIndex].elements[elIndex][field] = value;
        setColumns(updatedColumns);
    };

    const saveFooter = async (updatedCols = columns) => {
        setLoading(true);
        const cleanColumns = updatedCols.map(({ isEditing, ...rest }) => ({
            ...rest,
            elements: rest.elements.map(({ ...el }) => el)
        }));

        try {
            const res = await fetch(`${baseUrl}/api/footer`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ columns: cleanColumns, isActive })
            });
            const result = await res.json();
            if (result.success) {
                setMessage({ type: 'success', text: 'Footer updated successfully!' });
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            } else {
                setMessage({ type: 'danger', text: result.message || 'Update failed' });
            }
        } catch (error) {
            console.error('Error updating footer:', error);
            setMessage({ type: 'danger', text: 'Server error.' });
        } finally {
            setLoading(false);
        }
    };

    const toggleColumnEdit = (index) => {
        const updatedColumns = [...columns];
        const finishing = updatedColumns[index].isEditing;
        updatedColumns[index].isEditing = !updatedColumns[index].isEditing;
        setColumns(updatedColumns);
        if (finishing) {
            saveFooter(updatedColumns);
        }
    };

    // --- Components ---

    const FooterPreview = () => (
        <div className="bg-dark text-white p-5 rounded-4 shadow-lg position-relative overflow-hidden" style={{ minHeight: '300px' }}>

            <div className="row g-4">
                {columns.length > 0 ? columns.map((col, idx) => (
                    <div key={idx} className="col-md-3">
                        {col.logo && <img src={col.logo} alt="logo" className="mb-3 d-block" style={{ maxHeight: '40px' }} />}
                        <h6 className="text-uppercase fw-bold mb-3 text-info" style={{ letterSpacing: '1px' }}>{col.title}</h6>
                        {col.description && <p className="small text-light opacity-75 mb-3">{col.description}</p>}
                        <ul className="list-unstyled mb-0">
                            {col.elements.map((el, elIdx) => (
                                <li key={elIdx} className="mb-2">
                                    <a href={el.route || '#'} className="text-decoration-none text-light opacity-50 small hover-opacity-100 transition-all d-flex align-items-center">
                                        {el.icon && <i className={`${el.icon} me-2 text-info small`}></i>}
                                        {el.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )) : (
                    <div className="col-12 text-center py-5">
                        <div className="opacity-25 mb-3">
                            <i className="fa fa-map-signs display-1"></i>
                        </div>
                        <h4 className="fw-bold opacity-50">Empty Footer Preview</h4>
                        <p className="text-light opacity-25">Start adding columns to see a preview of your website footer.</p>
                    </div>
                )}
            </div>

            <hr className="my-5 opacity-25" />
            <div className="text-center small text-light opacity-25">
                © {new Date().getFullYear()} Your Website. All rights reserved.
            </div>
        </div>
    );

    return (
        <div className="p-1">
            {!isConfigMode ? (
                <div className="">
                    <div className="mb-4 justify-content-between d-flex">
                        <div>
                            <h5 className="fw-bold text-dark"><i className="fa fa-eye me-2 text-primary"></i> Footer Preview</h5>
                            <p className="text-muted small">This is how your footer currently appears on the live website.</p>
                        </div>
                        <button
                            className="btn btn-primary rounded shadow-sm"
                            onClick={() => setIsConfigMode(true)}
                            style={{ padding: '0px 10px' }}
                        >
                            <i className="fa fa-pencil me-2"></i> Edit Configuration
                        </button>
                    </div>
                    <FooterPreview />
                </div>
            ) : (
                <div className="fade-in">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <button className="btn btn-sm btn-outline-secondary rounded-pill px-3 mb-2" onClick={() => setIsConfigMode(false)}>
                                <i className="fa fa-arrow-left me-2"></i> Back to Preview
                            </button>
                            <h5 className="fw-bold m-0 text-dark">
                                <i className="fa fa-cogs text-primary me-2"></i> Footer Setup
                            </h5>
                        </div>
                        <div className="d-flex gap-2">
                            <button type="button" className="btn btn-outline-primary rounded-pill px-4 shadow-sm" onClick={addColumn}>
                                <i className="fa fa-plus me-1"></i> Add Column
                            </button>
                            <button type="button" className="btn btn-success rounded-pill px-4 shadow-sm" onClick={() => { saveFooter(); setIsConfigMode(false); }}>
                                <i className="fa fa-save me-1"></i> Save All Changes
                            </button>
                        </div>
                    </div>

                    {message.text && (
                        <div className={`alert alert-${message.type} alert-dismissible fade show mb-4`} role="alert">
                            <i className={`fa ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
                            {message.text}
                            <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
                        </div>
                    )}

                    <div className="row g-4">
                        {columns.map((column, colIndex) => (
                            <div key={colIndex} className="col-12">
                                <div className="card border-0 shadow-sm bg-light bg-opacity-50" style={{ borderRadius: '20px' }}>
                                    <div className="card-header bg-transparent d-flex justify-content-between align-items-center py-3 px-4 border-bottom-0">
                                        <div className="d-flex align-items-center">
                                            <span className="badge bg-secondary bg-opacity-10 text-white rounded-pill me-3 px-3">Column {colIndex + 1}</span>
                                            <h6 className="fw-bold m-0 text-dark">{column.title || ''}</h6>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className={`btn btn-sm ${column.isEditing ? 'btn-success' : 'btn-light text-primary'} me-2 rounded-circle shadow-sm`}
                                                style={{ width: '36px', height: '36px' }}
                                                onClick={() => toggleColumnEdit(colIndex)}
                                                title={column.isEditing ? "Save Column" : "Edit Column"}
                                            >
                                                <i className={`fa ${column.isEditing ? 'fa-check' : 'fa-pencil'}`}></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-light text-danger rounded-circle shadow-sm"
                                                style={{ width: '36px', height: '36px' }}
                                                onClick={() => removeColumn(colIndex)}
                                                title="Remove Column"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body px-4 pb-4 pt-0">
                                        {column.isEditing ? (
                                            <div className="bg-white p-4 rounded-4 shadow-sm">
                                                <div className="row g-3">
                                                    <div className="col-md-4">
                                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.7rem' }}>Column Title</label>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-light border-0 px-3 py-2"
                                                            value={column.title}
                                                            onChange={(e) => handleColumnChange(colIndex, 'title', e.target.value)}
                                                            placeholder="e.g., Quick Links"
                                                            style={{ borderRadius: '10px' }}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.7rem' }}>Logo Image URL</label>
                                                        <input
                                                            type="text"
                                                            className="form-control bg-light border-0 px-3 py-2"
                                                            value={column.logo}
                                                            onChange={(e) => handleColumnChange(colIndex, 'logo', e.target.value)}
                                                            placeholder="https://..."
                                                            style={{ borderRadius: '10px' }}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.7rem' }}>Description / Text</label>
                                                        <textarea
                                                            className="form-control bg-light border-0 px-3 py-2"
                                                            rows="2"
                                                            value={column.description}
                                                            onChange={(e) => handleColumnChange(colIndex, 'description', e.target.value)}
                                                            placeholder="Tell your story..."
                                                            style={{ borderRadius: '10px' }}
                                                        ></textarea>
                                                    </div>

                                                    <div className="col-12 mt-4">
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <label className="form-label small fw-bold text-muted text-uppercase m-0" style={{ fontSize: '0.7rem' }}>Links & Socials</label>
                                                            <button type="button" className="btn btn-sm btn-primary rounded-pill px-3" onClick={() => addElement(colIndex)}>
                                                                <i className="fa fa-plus me-1"></i> Add Item
                                                            </button>
                                                        </div>

                                                        {column.elements.map((el, elIndex) => (
                                                            <div key={elIndex} className="row g-2 mb-3 align-items-center bg-light p-3 rounded-4 border-white border-2 border">
                                                                <div className="col-md-3">
                                                                    <label className="text-muted smaller mb-1 d-block" style={{ fontSize: '0.65rem' }}>Display Name</label>
                                                                    <div className="input-group input-group-sm rounded-3 overflow-hidden shadow-sm">
                                                                        <span className="input-group-text bg-white border-0"><i className="fa fa-tag text-muted"></i></span>
                                                                        <input type="text" className="form-control border-0 px-2" value={el.label} onChange={(e) => handleElementChange(colIndex, elIndex, 'label', e.target.value)} placeholder="e.g. Our History" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="text-muted smaller mb-1 d-block" style={{ fontSize: '0.65rem' }}>Link (Path or URL)</label>
                                                                    <div className="input-group input-group-sm rounded-3 overflow-hidden shadow-sm">
                                                                        <span className="input-group-text bg-white border-0"><i className="fa fa-link text-muted"></i></span>
                                                                        <input type="text" className="form-control border-0 px-2" value={el.route} onChange={(e) => handleElementChange(colIndex, elIndex, 'route', e.target.value)} placeholder="e.g. /about-us" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="text-muted smaller mb-1 d-block" style={{ fontSize: '0.65rem' }}>Icon (FontAwesome)</label>
                                                                    <div className="input-group input-group-sm rounded-3 overflow-hidden shadow-sm">
                                                                        <span className="input-group-text bg-white border-0"><i className="fa fa-font text-muted"></i></span>
                                                                        <input type="text" className="form-control border-0 px-2" value={el.icon} onChange={(e) => handleElementChange(colIndex, elIndex, 'icon', e.target.value)} placeholder="e.g. fa fa-info-circle" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-1 text-end">
                                                                    <div className="mb-1" style={{ height: '0.65rem' }}></div>
                                                                    <button type="button" className="btn btn-sm btn-outline-danger border-0 mt-1" onClick={() => removeElement(colIndex, elIndex)}>
                                                                        <i className="fa fa-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="row g-4 px-2 py-2">
                                                <div className="col-md-3 border-end">
                                                    <div className="small text-muted text-uppercase mb-2 fw-bold" style={{ fontSize: '0.6rem' }}>Settings</div>
                                                    {column.logo ? (
                                                        <div className="bg-white p-2 rounded-3 border d-inline-block mb-3">
                                                            <img src={column.logo} alt="logo" style={{ maxHeight: '24px' }} />
                                                        </div>
                                                    ) : <span className="badge bg-light text-muted border mb-3">No Logo</span>}
                                                    <div className="fw-bold h6 text-primary">{column.title || 'Untitled'}</div>
                                                    <p className="small text-muted mb-0">{column.description || 'No description provided.'}</p>
                                                </div>
                                                <div className="col-md-9">
                                                    <div className="small text-muted text-uppercase mb-3 fw-bold" style={{ fontSize: '0.6rem' }}>Preview Elements ({column.elements.length})</div>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {column.elements.map((el, i) => (
                                                            <div key={i} className="bg-white px-3 py-2 rounded-pill shadow-sm border d-flex align-items-center">
                                                                {el.icon && <i className={`${el.icon} me-2 text-primary small`}></i>}
                                                                <span className="fw-bold small">{el.label}</span>
                                                                <span className="text-muted ms-2 smaller" style={{ fontSize: '0.7rem' }}>({el.route})</span>
                                                            </div>
                                                        ))}
                                                        {column.elements.length === 0 && <span className="text-muted smaller bg-white px-3 py-2 rounded-pill border">Empty list</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {loading && (
                <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
                    <div className="toast show align-items-center text-white bg-dark border-0 rounded-pill shadow-lg px-2" role="alert">
                        <div className="d-flex align-items-center">
                            <div className="toast-body py-2">
                                <span className="spinner-border spinner-border-sm me-3 text-info"></span>
                                <span className="small">Synchronizing footer data...</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Footer;