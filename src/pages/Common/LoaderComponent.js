import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

const LoaderComponent = props => {
    const history = useHistory();
    // const goTo = (path) => {
    //     history.push(path || ROOT);
    // }
    return (
        <div id="preloader" style={{ display: 'none' }}>
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit="10"></circle>
                </svg>
            </div>
        </div>
    )
}

// LoaderComponent.propTypes = {
//     title: PropTypes.string.isRequired
// }

export default LoaderComponent
