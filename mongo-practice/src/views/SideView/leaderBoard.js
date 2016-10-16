import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as leadersActions } from '../../redux/modules/leaders'

const mapStateToProps = (state) => ({
  leaders: state.leaders
})

export default class Leaderboard extends Component {
  static propTypes = {
    leaders: PropTypes.array.isRequired,
    getLeaders: PropTypes.func.isRequired
  };
  componentDidMount () {
    this.props.getLeaders()
      /*$.ajax({
            url:'http://localhost:8000/api/leaders',
            dataType: 'json',
            type:'GET',
            async: false,
            success: function(data) {
              return [data];
            },
            error: function(xhr, status, err) {
            console.error('http://localhost:8000/api/leaders', status, err.toString());
            }
        }).responseJSON)*/
  }
  render () {
    return (

      <div className='col-xs-12 col-md-push-7 col-md-5 SideView'>
        <h2 className='text-center'>Leaderboard</h2>
        {this.props.leaders.map((leader,index)=> (<div key={leader.id} className='rankers row'>
        <p id='user'>{index+1}. {leader.username}</p>
        <p id='points'>{leader.points} Points</p>
        </div>
        ))}
           <span className='close'><Link to='/'>X</Link></span>
        </div>
    )
  }
}

export default connect(mapStateToProps, leadersActions)(Leaderboard)
