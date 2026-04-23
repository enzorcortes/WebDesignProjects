import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/styles.css';

const LoopHeader = () => {
    return (
        <header className="bg-light py-2">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-12 text-center text-md-start">
                        <img 
                            src="/images/silverlogo.webp" 
                            alt="Silver Logo" 
                            className="img-fluid" 
                            style={{ maxHeight: '50px', paddingLeft: '40px' }} 
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default LoopHeader;