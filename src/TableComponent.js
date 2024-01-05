// TableDisplay.js
import React, { useEffect } from 'react';

const CardComponent = ({ category, subcategories }) => {
    return (
        <div className="card">
            <div className="card-header" id={`heading-${category}`}>
                <h5 className="mb-0">
                    <button
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={`#collapse-${category}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${category}`}
                    >
                        {category}
                    </button>
                </h5>
            </div>

            <div
                id={`collapse-${category}`}
                className="collapse"
                aria-labelledby={`heading-${category}`}
                data-parent="#accordion"
            >
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {subcategories.map(([subcategory, score], index) => (
                            <li className="list-group-item" key={index}>
                                {subcategory}: {score}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const TableComponent = ({ data }) => {
    useEffect(() => {
        // Initialize Bootstrap collapse functionality
        const scripts = document.querySelectorAll('script[src^="https://code.jquery.com"]');
        if (scripts.length === 0) {
            const bootstrapScript = document.createElement('script');
            bootstrapScript.src = 'https://code.jquery.com/jquery-3.5.1.slim.min.js';
            bootstrapScript.integrity = 'sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj';
            bootstrapScript.crossOrigin = 'anonymous';
            document.head.appendChild(bootstrapScript);

            const popperScript = document.createElement('script');
            popperScript.src = 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js';
            popperScript.integrity = 'sha384-b0q9vUhC1oABKgUvl3h/jp4a9GHj8Mj8d0FXz42Pyh+dpr/ln0sSfuWIW5oDw3lw';
            popperScript.crossOrigin = 'anonymous';
            document.head.appendChild(popperScript);

            const bootstrapJsScript = document.createElement('script');
            bootstrapJsScript.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js';
            bootstrapJsScript.integrity = 'sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8sh+Wy9ADFlACQsVFauHfNdjnQqy4IcfYX6jHp';
            bootstrapJsScript.crossOrigin = 'anonymous';
            document.head.appendChild(bootstrapJsScript);
        }
    }, []);

    return (
        <div className="container">
            <h2>Data Table</h2>
            <div className="accordion" id="accordion">
                {Object.keys(data).map((category, index) => (
                    <CardComponent
                        key={index}
                        category={category}
                        subcategories={data[category]}
                    />
                ))}
            </div>
        </div>
    );
};

export default TableComponent;
