import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as userActions } from '../../redux/modules/user'

const mapStateToProps = (state) => ({
  user: state.user
})


export default class ExpBar extends Component {
  static propTypes = {
    user: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired
  };
  componentDidMount () {
    $.ajax({
    type: 'PUT',
    dataType: 'json',
    url: 'http://localhost:8000/api/points/addone/'+this.props.user._id})
    setTimeout(()=>$('.xp').css({width:'100px'}),300)
  }
  render () {
    return <div>
      <div className='bar'>
        <div className='xp'></div>
      </div>
      <h3 className='text-center'>+1 Point!</h3>
      </div>
    }

}

export default connect(mapStateToProps, userActions)(ExpBar)
