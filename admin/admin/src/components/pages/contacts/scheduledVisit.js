import React, { useState, useEffect } from "react";

const ScheduledVisit = () => {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

    useEffect(() => {
        fetchVisits();
    }, []);

    const fetchVisits = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${baseUrl}/api/scheduleVisit`);
            const result = await res.json();
            if (result.success) {
                setVisits(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Failed to fetch visits");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteVisit = async (id) => {
        if (!window.confirm("Are you sure you want to delete this request?")) return;

        try {
            const res = await fetch(`${baseUrl}/api/scheduleVisit/${id}`, {
                method: "DELETE",
            });
            const result = await res.json();
            if (result.success) {
                setVisits(visits.filter(v => v._id !== id));
                // Adjust current page if last item on page is deleted
                const newTotalPages = Math.ceil((visits.length - 1) / itemsPerPage);
                if (currentPage > newTotalPages && newTotalPages > 0) {
                    setCurrentPage(newTotalPages);
                }
            }
        } catch (err) {
            alert("Failed to delete");
        }
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = visits.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(visits.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (loading) return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0"><i className="fa fa-calendar-check-o me-2 text-primary"></i> Scheduled Visit Requests</h5>
                <button className="btn btn-sm btn-outline-secondary" onClick={fetchVisits}>
                    <i className="fa fa-refresh me-1"></i> Refresh
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
                <table className="table table-hover border shadow-sm mb-0" style={{ borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
                    <thead className="bg-light">
                        <tr>
                            <th className="border-0 px-3 py-3">Date</th>
                            <th className="border-0 px-3 py-3">Customer Name</th>
                            <th className="border-0 px-3 py-3">Contact Info</th>
                            <th className="border-0 px-3 py-3">Location</th>
                            <th className="border-0 px-3 py-3">Message</th>
                            <th className="border-0 px-3 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-5 text-muted">
                                    <i className="fa fa-inbox display-4 mb-3 opacity-25"></i>
                                    <h6>No requests found</h6>
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((visit) => (
                                <tr key={visit._id} className="align-middle">
                                    <td className="px-3">
                                        <div className="small fw-bold">{new Date(visit.timeStamp).toLocaleDateString()}</div>
                                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{new Date(visit.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </td>
                                    <td className="px-3">
                                        <div className="fw-bold text-dark">{visit.firstName} {visit.lastName}</div>
                                    </td>
                                    <td className="px-3">
                                        <div className="small"><i className="fa fa-envelope-o me-2 text-muted"></i> {visit.email}</div>
                                        <div className="small"><i className="fa fa-phone me-2 text-muted"></i> {visit.phone}</div>
                                    </td>
                                    <td className="px-3">
                                        <span className={`badge ${visit.visitTo === 'Calgary' ? 'bg-secondary' : 'bg-info'} opacity-75 rounded px-3 py-1 text-white`}>
                                            {visit.visitTo}
                                        </span>
                                    </td>
                                    <td className="px-3">
                                        <div className="text-muted small text-truncate" style={{ maxWidth: '200px' }} title={visit.message}>
                                            {visit.message}
                                        </div>
                                    </td>
                                    <td className="px-3 text-center">
                                        <button className="btn btn-sm text-danger hover-scale" onClick={() => deleteVisit(visit._id)}>
                                            <i className="fa fa-trash-o fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination UI */}
            {visits.length > itemsPerPage && (
                <div className="d-flex justify-content-between align-items-center mt-3 bg-white p-3 border shadow-sm rounded-bottom" style={{ borderRadius: '0 0 12px 12px' }}>
                    <div className="small text-muted">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, visits.length)} of {visits.length} requests
                    </div>
                    <nav aria-label="Page navigation">
                        <ul className="pagination pagination-sm m-0">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link shadow-none" onClick={() => paginate(currentPage - 1)}>
                                    <i className="fa fa-angle-left"></i>
                                </button>
                            </li>

                            {[...Array(totalPages)].map((_, i) => (
                                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link shadow-none" onClick={() => paginate(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link shadow-none" onClick={() => paginate(currentPage + 1)}>
                                    <i className="fa fa-angle-right"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default ScheduledVisit;