import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Contact extends Component {
  render () {
    return (

      <div className='col-xs-12 col-md-push-7 col-md-5 SideView'>
           <h2 className='text-center'>Contact</h2>
           <div className='social text-center'>
           <p className='text-center info'>info@boozeclues.io</p>
           <button className='btn facebook socialbtn'>Facebook</button>
           <button className='btn twitter socialbtn'>Twitter</button>
           </div>
           <input className='emailName' ref='price' type='text' placeholder='Youremail@email.com'/><br/>
           <input className='emailName' ref='price' type='text' placeholder='Price'/><br/>
           <textarea className='emailText' ref='price' type='text' placeholder='Price'></textarea>
           <span className='close'><Link to='/'>X</Link></span>
         </div>
    )
  }
}
