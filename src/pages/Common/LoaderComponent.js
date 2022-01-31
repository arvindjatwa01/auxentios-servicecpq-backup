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
            <div class="loader">
                <svg class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"></circle>
                </svg>
            </div>
        </div>
    )
}

LoaderComponent.propTypes = {
    title: PropTypes.string.isRequired
}

export default LoaderComponent
