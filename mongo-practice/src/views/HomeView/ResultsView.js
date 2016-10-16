import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { actions as resultsActions } from '../../redux/modules/results'
import { actions as alcoholActions } from '../../redux/modules/alcohol'

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

const mapStateToProps = (state) => ({
  results: state.results,
  alcohol: state.alcohol
})

export default class ResultsView extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    alcohol: PropTypes.array.isRequired,
    getAlcohol: PropTypes.func.isRequired
  };
  constructor () {
    super()
    this.state = {results: [{store: {url:'test',name:''}}]}
  }
  buttonSelect (size) {
    $('.size').removeClass('selectedButton')
    $('.'+size).addClass('selectedButton')
    var newResults = this.props.results.filter((result)=>(result.qty===size))
    this.setState({results:newResults})
  }
  componentDidMount () {
    if (this.props.alcohol[0].group.toLowerCase()==='beer') {
      var newResults = this.props.results.filter((result)=>(result.qty==='6-pack'))
      this.setState({results:newResults,group:'beer'})
    }
    else if (this.props.alcohol[0].group.toLowerCase()==='wine') {
      var newResults = this.props.results.filter((result)=>(result.qty==='750ml'))
      this.setState({results:newResults,group:'wine'})
    }
    else if (this.props.alcohol[0].group.toLowerCase()==='liquor') {
      var newResults = this.props.results.filter((result)=>(result.qty==='Fifth'))
      this.setState({results:newResults, group:'liquor'})
    }
  }
  getButtons () {
    if (this.state.group==='beer') {
      return (<div className='col-xs-10 col-xs-offset-1 col-md-10 col-md-offset-1'>
        <div className='row buttons'>
      <button onClick={() =>this.buttonSelect('6-pack')} className='btn btn-left selectedButton btn-default col-xs-4 col-sm-2 size 6-pack'>6-pack</button>
      <button onClick={() =>this.buttonSelect('12-pack')} className='btn btn-inner btn-default col-xs-4 col-sm-2 size 12-pack'>12-pack</button>
      <button onClick={() =>this.buttonSelect('18-pack')} className='btn btn-inner btn-default col-xs-4 col-sm-2 size 18-pack'>18-pack</button>
      <button onClick={() =>this.buttonSelect('24-pack')} className='btn btn-inner btn-default col-xs-4 col-sm-2 size 24-pack'>24-pack</button>
      <button onClick={() =>this.buttonSelect('30-pack')} className='btn btn-inner btn-default col-xs-4 col-sm-2 size 30-pack'>30-pack</button>
      <button onClick={() =>this.buttonSelect('Keg')} className='btn btn-right btn-default col-xs-4 col-sm-2 size Keg'>Keg</button>
    </div></div>)
    }
    else if (this.state.group==='wine') {
      return (<div className='col-xs-10 col-xs-offset-1 col-md-10 col-md-offset-1'>
      <div className='row buttons'>
      <button onClick={() =>this.buttonSelect('750ml')} className='btn btn-left btn-inner selectedButton btn-default col-xs-3'>750 ml</button>
      <button onClick={() =>this.buttonSelect('1500ml')} className='btn btn-inner selectedButton btn-default col-xs-3'>1.5 L</button>
      <button onClick={() =>this.buttonSelect('3L')} className='btn btn-inner selectedButton btn-default col-xs-3'>3 L</button>
      <button onClick={() =>this.buttonSelect('5L')} className='btn btn-right selectedButton btn-default col-xs-3'>5 L</button>
    </div></div>)
    }
    else if (this.state.group==='liquor') {
      return (<div className='col-xs-10 col-xs-offset-1 col-md-10 col-md-offset-1'>
      <div className='row buttons'>
      <button onClick={() =>this.buttonSelect('Fifth')} className='btn-left btn selectedButton btn-default col-xs-6'>Fifth</button>
      <button onClick={() =>this.buttonSelect('Handle')} className='btn btn-right btn-default col-xs-6'>Handle</button>
    </div></div>)
    }
  }
  getPage () {
    if (this.props.results === 1) {
      return <div><div className='col-xs-10 col-xs-offset-1 col-md-10 col-md-offset-1'><div className='row'>
      <h3>Sorry, This Alcohol is not in our database or you mispelled it</h3>
      </div>
      </div>
      </div>
    }
    else if (Array.isArray(this.state.results)) {
      if (this.state.results.length===0) {
        return <div>
                {this.getButtons()}
                <div className='col-xs-10 col-xs-offset-1 col-md-10 col-md-offset-1'><div className='row'>
                <h3 className='text-center'>Sorry, No prices have been submitted for this size yet</h3>
                </div>
                </div>
                </div>
      }
      else {
      return <div>
              {this.getButtons()}
              {this.state.results.map(function (result) {
                var thisDate = new Date(result.dateTime)
              var formatted = formatDate(thisDate)
                return (<div className='result col-xs-10 col-xs-offset-1 col-md-10 col-md-offset-1'>
                    <div className='row'>
                    <div className='col-xs-3 mainPrices'>
                    <div className='mainPrice'>
                      <h2 className='resultPrice'>${result.price}</h2>
                      </div>
                    </div>
                    <div className='col-xs-9'>
                      <a href={result.store.url} target='_blank'><h1 className='store'>{result.store.name}</h1></a>
                      <p className='submitted'>Submitted at {formatted}</p>
                      <p className='miles'>5.1 Miles away</p>
                      </div>
                    </div>
                </div>)
              })
            }
            </div>
          }
    }
    else {
      return <h1> TEST FAILS</h1>
    }
  }
  render () {
    return (
      <div>
        {this.getPage()}
      </div>
    )
  }
}
const combinedActions = Object.assign({},resultsActions,alcoholActions)

export default connect(mapStateToProps, combinedActions)(ResultsView)
