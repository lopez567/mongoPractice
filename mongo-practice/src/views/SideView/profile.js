import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as userActions } from '../../redux/modules/user'

const mapStateToProps = (state) => ({
  user: state.user
})


export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired
  };
  componentDidMount () {

  }
  render () {
    if (this.props.user.loggedin===false) {
      return <div className='col-xs-12 col-md-push-7 col-md-5 SideView'><h3 className='text-center'>Please Log In</h3></div>
    }
    else {
    return (
      <div className='col-xs-12 col-md-push-7 col-md-5 SideView'>
        <h2 className='text-center'>{this.props.user.username}</h2>
        <p>Email: {this.props.user.email}</p>
        <p>Date Joined: {this.props.user.date_joined}</p>
        <p>Points: {this.props.user.points}</p>
        <p>Thanks Count: {this.props.user.thanks_count}</p>
        <button className='btn btn-default'>View Thanks</button>
        <span className='close'><Link to='/'>X</Link></span>
        </div>
    )}
  }
}

export default connect(mapStateToProps, userActions)(Profile)
