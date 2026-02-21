import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicPageView = () => {
    const location = useLocation();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
    const currentPath = location.pathname;

    const fetchPageContent = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/api/dynamic-content/content?path=${encodeURIComponent(currentPath)}`);
            const result = await response.json();
            if (result.success) {
                setPageData(result.data);
                setError(null);
            } else {
                setError(result.message);
                setPageData(null);
            }
        } catch (err) {
            console.error("Error fetching content:", err);
            setError("Failed to load page content");
        } finally {
            setLoading(false);
        }
    }, [baseUrl, currentPath]);

    useEffect(() => {
        fetchPageContent();
    }, [fetchPageContent]);

    if (loading) return (
        <div className="container py-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Building your view...</p>
        </div>
    );

    if (error || !pageData) return (
        <div className="container py-5 text-center">
            <div className="py-5 bg-light rounded shadow-sm border">
                <i className="fa fa-exclamation-circle fa-4x text-muted mb-3"></i>
                <h2>Page Not Found</h2>
                <p className="text-muted">The path "{currentPath}" has no designed content yet.</p>
                <p className="small">Go to Sidebar Settings &gt; Design to create content for this path.</p>
            </div>
        </div>
    );

    return (
        <div className="dynamic-page-view pb-5">
            {/* Dynamic Hero/Header Section */}
            <div className="page-header py-5 mb-5" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderBottom: '1px solid #cbd5e1' }}>
                <div className="container text-center">
                    <h1 className="display-4 font-weight-bold" style={{ color: '#0f172a' }}>{pageData.title}</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center bg-transparent p-0">
                            {currentPath.split('/').filter(x => x).map((crumb, idx, arr) => (
                                <li key={idx} className={`breadcrumb-item ${idx === arr.length - 1 ? 'active text-primary' : 'text-muted'}`} style={{ textTransform: 'capitalize' }}>
                                    {crumb.replace(/-/g, ' ')}
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {pageData.sections.map((section, idx) => (
                            <div key={section._id || idx} className="section-block mb-5 fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>

                                {section.type === 'heading' && (
                                    <div className="mb-4">
                                        {React.createElement(`h${section.data.level || 2}`, {
                                            className: `font-weight-bold text-dark ${section.data.level === 1 ? 'display-4' : ''}`,
                                            style: { color: '#1e293b' }
                                        }, section.data.text)}
                                    </div>
                                )}

                                {section.type === 'paragraph' && (
                                    <div className="mb-4">
                                        <p className="lead text-muted" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                                            {section.data.text}
                                        </p>
                                    </div>
                                )}

                                {section.type === 'image' && section.data.url && (
                                    <div className="mb-4 text-center">
                                        <div className="image-container shadow-lg rounded overflow-hidden">
                                            <img src={section.data.url} alt={pageData.title} className="img-fluid w-100" style={{ objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                )}

                                {section.type === 'list' && section.data.items && (
                                    <div className="mb-4 bg-light p-4 rounded-lg border-left" style={{ borderLeft: '4px solid #4361ee' }}>
                                        <ul className="list-unstyled mb-0">
                                            {section.data.items.map((item, i) => (
                                                <li key={i} className="mb-2 d-flex align-items-baseline">
                                                    <i className="fa fa-check-circle text-primary mr-3" style={{ fontSize: '0.9rem' }}></i>
                                                    <span style={{ fontSize: '1.05rem' }}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {section.type === 'gallery' && section.data.images && (
                                    <div className="mb-4">
                                        <div className="row">
                                            {section.data.images.map((img, i) => (
                                                <div key={i} className="col-md-6 col-lg-4 mb-4">
                                                    <div className="gallery-item shadow-sm rounded overflow-hidden h-100 bg-white border">
                                                        <img src={img.url} alt={img.caption || 'Gallery'} className="img-fluid" style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                                                        {img.caption && (
                                                            <div className="p-3 text-center small text-muted font-italic">
                                                                {img.caption}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {section.type === 'divider' && (
                                    <hr className="my-5" style={{ opacity: '0.1', borderTop: '2px solid #000' }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .fade-in { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .gallery-item:hover { transform: translateY(-5px); transition: all 0.3s; }
                .image-container img:hover { transform: scale(1.02); transition: all 0.5s; }
            `}</style>
        </div>
    );
};

export default DynamicPageView;
