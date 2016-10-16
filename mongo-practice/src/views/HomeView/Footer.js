import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as userActions } from '../../redux/modules/user'

const mapStateToProps = (state, store) => ({
  user: state.user
})

export class Footer extends React.Component {
    static propTypes = {
      user: PropTypes.object.isRequired,
      getUser: PropTypes.func.isRequired
    };
    constructor () {
      super()
      this.state= {modal:'login',nav:'login',error:''}
    }
    handleClick (location) {
      this.props.history.push(location)
    }
   render () {
     return (<div className="foot col-xs-12 col-md-12">
      <div className='col-xs-12 col-md-offset-3 col-md-6'>
      <ul className='footer-ul'>
      <li className='footer-title'>Booze Clues</li>
      <li className='pointer' onClick={()=>this.handleClick('/about')}>About Us</li>
      <li className='pointer' onClick={()=>this.handleClick('/contact')}>Contact Us</li>
      <li className='pointer' onClick={()=>this.handleClick('/leaderboard')}>Leaderboard</li>
      </ul>
      <ul className='footer-ul'>
      <li className='footer-title'>Boring Stuff</li>
      <li className='pointer'>Terms of Use</li>
      <li className='pointer'>Privacy Policy</li>
      <li>© 2016 Spencer Lopez</li>
      </ul>
      <ul className='footer-ul'>
      <li className='footer-title'>Follow Us</li>
      <li className='pointer'>Facebook</li>
      <li className='pointer'>Twitter</li>
      <li className='pointer'>Google Plus</li>
      </ul>
      </div>
    </div>)
   }
 }
export default connect(mapStateToProps, userActions)(Footer)
