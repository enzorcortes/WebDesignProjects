import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/styles.css';

const LoopFooter = () => {
    return (
        <footer className="container-fluid py-3 footer-dark">
            <div className="row text-center text-md-left">
                <div className="col-12 col-md-6 mb-3" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                    <div className="d-flex flex-column align-items-center align-items-md-start">
                        <img src="/images/silverlogofooter.png" alt="Silver Footer Logo" className="img-fluid" style={{ maxWidth: '300px' }} />
                        <address className="footer-text" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Silver School of Social Work<br />
                            1 Washington Square North<br />
                            New York, NY 10003<br />
                            P. 212.998.5900
                        </address>
                    </div>
                </div>

                <div className="col-12 col-md-6" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                    <div className="d-flex flex-column align-items-center align-items-md-end footer-text">
                        <p className="footer-text" style={{ fontWeight: 'bold' }}>Developed by</p>
                        <img src="/images/createlablogo.png" alt="Createlab Logo" className="img-fluid mb-3" style={{ maxWidth: '300px' }} />
                        <p className="footer-text" style={{ fontWeight: 'bold' }}>In collaboration with</p>
                        <img src="/images/steinhardtlogo.png" alt="Steinhardt Logo" className="img-fluid mb-2" style={{ maxWidth: '300px' }} />
                        <img src="/images/silverlogo.webp" alt="Silver Logo" className="img-fluid mb-2" style={{ maxWidth: '300px' }} />
                        <img src="/images/nyupolylogo.svg.png" alt="Tandon Logo" className="img-fluid mb-2" style={{ maxWidth: '250px' }} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LoopFooter;