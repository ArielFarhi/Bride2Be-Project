import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ progress }) => {
    return (
        <div className="overall-progress">
            <h2>Total Progress: {progress}%</h2>
            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired, 
};

export default ProgressBar;
