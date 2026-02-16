import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = ({title, links}) => {
  return (
    <>
        {/* <!-- start breadcrumb area --> */}
        <div className="breadcumb-wrapper" style={{ backgroundImage: `url(assets/img/bg/breadcumb-bg.jpg)`}} >
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-xl-9">
                    <div className="breadcumb-content">
                    <h1 className="breadcumb-title">{title}</h1>
                    <ul className="breadcumb-menu">
                        {links?.map((path, index) => (
                        <li key={index}>
                            {path?.url ? <Link to={path?.url}>{path?.name}</Link> : path?.name}
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
        {/* <!-- end breadcrumb area --> */}
    </>
  )
}

export default Breadcrumb