import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/styles.css';

const LoopFavicon = () => {
    return (
        <div className="col-md-6 d-flex align-items-center justify-content-center">
        <img 
            src="/loopfavicon.png" 
            alt="Loop Favicon" 
            className="img-fluid" 
            style={{ 
                maxWidth: '400px',  // Increase this value to make the image larger
                width: '100%',      // Ensures responsive behavior
                height: 'auto',     // Maintains aspect ratio
                marginLeft: 'auto',  // Helps position the image on the right side of its container
                marginRight: 'auto'
            }} 
        />
    </div>
    );
};

export default LoopFavicon;