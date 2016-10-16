import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'


const mapStateToProps = (state) => ({
  alcohol: state.alcohol
})

export default class AlcoholView extends Component {
  static propTypes = {
    alcohol: PropTypes.array.isRequired,
  };
  constructor () {
    super()
    this.state = {alcohol:{name:'Gotta Search For Something First'}}
  }
  componentDidMount () {
    if (Object.keys(this.props.alcohol[0]).length>1) {
    this.setState({alcohol:this.props.alcohol[0]})
  }
  }
  componentWillReceiveProps (nextProps) {
    if (Object.keys(nextProps.alcohol[0]).length>1) {
    this.setState({alcohol:nextProps.alcohol[0]})
  }
  }
  render () {
    return (

      <div className='col-xs-12 col-md-push-7 col-md-5 SideView'>
        <h2 className='text-center'>{this.state.alcohol.name}</h2>
           <span className='close'><Link to='/'>X</Link></span>
        </div>
    )
  }
}

export default connect(mapStateToProps)(AlcoholView)
