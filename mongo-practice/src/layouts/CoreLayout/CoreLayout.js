import React, { PropTypes } from 'react'
import '../../styles/core.scss'
import Navbar from 'views/HomeView/Navbar'
import Footer from 'views/HomeView/Footer'



// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classNamees.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div className='page-container'>
      <Navbar/>
      <div className='view-container'>
        {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
