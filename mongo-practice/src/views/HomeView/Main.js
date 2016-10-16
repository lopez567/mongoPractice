import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as resultsActions } from '../../redux/modules/results'
import { actions as alcoholActions } from '../../redux/modules/alcohol'
import { actions as coordActions } from '../../redux/modules/coord'
import ResultsView from 'views/HomeView/ResultsView'
import AlcoholSuggest from 'views/SideView/suggestions'
import {actions as storeActions } from '../../redux/modules/stores'
import {actions as orderActions } from '../../redux/modules/submitOrder'
import ExpBar from 'views/SideView/xpbar'
require('es6-promise').polyfill();


const mapStateToProps = (state, store) => ({
  results: state.results,
  alcohol: state.alcohol,
  coord: state.coord,
  stores: state.stores,
  submitOrder: state.submitOrder,
  newAlcohol: state.newAlcohol,
  user: state.user
})

export default class Main extends Component {
    static propTypes = {
      results: PropTypes.object.isRequired,
      getResults: PropTypes.func.isRequired,
      alcohol: PropTypes.object.isRequired,
      getAlcohol: PropTypes.func.isRequired,
      coord: PropTypes.object.isRequired,
      getLocation: PropTypes.func.isRequired,
      localStores: PropTypes.array.isRequired,
      getLocalStores: PropTypes.func.isRequired,
      submitOrder: PropTypes.number.isRequired,
      update_submitOrder: PropTypes.func.isRequired,
      newAlcohol: PropTypes.array.isRequired,
      user: PropTypes.object.isRequired
    };
    constructor () {
      super()
      this.state= {page:'submit',
                  submitOrder: 0,
                  index:'None',
                  storeId:0
                  }
    }
    componentDidMount () {
      //Get users coords ---- redux/modules/coord.js
      let location = new Promise ((resolve,reject)=>{
        let message = this.props.getLocation()
        resolve(message);
      })
      //get nearby liquor stores through Google API ---- redux/modules/stores.js
      location.then((message)=>{
        this.props.getLocalStores(this.props.coord)
      })
    }
    handleClick () {
    this.setState({page:'loading'})
    var results
    $('.mainHeader').css({'margin-top':'-85px'})
    //Search for Alcohol and Save Alcohol Data
    this.props.getAlcohol($.ajax({
            url:'http://localhost:8000/api/alcohol/'+this.props.alcohol[0].name,
            dataType: 'json',
            type:'GET',
            async: false,
            success: function(data) {
              return [data];
            },
            error: function(xhr, status, err) {
            console.error('http://localhost:8000/api/alc', status, err.toString());
            }
        }).responseJSON)
        setTimeout(()=>{
          var postdata = {alcohol: this.props.alcohol[0].name, lon:this.props.coord.lon, lat: this.props.coord.lat}
          $.post('http://localhost:8000/api/boozeclue',postdata,function(data) {
            results = data
          })
      },200)
        setTimeout(()=>{
          this.props.getResults(results)
        },450)
        setTimeout(()=>{
          this.props.history.push('/alcohol')
          this.setState({page:'results'})
        },1016)
    }
    setIndex (index) {
    //  grab store data
      var placeDetails = $.ajax({
              url:'https://maps.googleapis.com/maps/api/place/details/json?placeid='+this.props.stores[index].place_id+'&key=AIzaSyDra-9gpjCESYPaGJtu-d44z7YyeQgU0gg',
              dataType: 'json',
              type:'GET',
              async: false,
              success: function(data) {
                return [data];
              },
              error: function(xhr, status, err) {
              console.error('http://googleplacesapi', status, err.toString());
              }
          }).responseJSON.result
        let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+this.props.stores[index].place_id+'&key=AIzaSyDra-9gpjCESYPaGJtu-d44z7YyeQgU0gg';
        // let postData =  fetch(url)
        //   .then(function(response) {
        //      if (response.status >= 400) {
        //          throw new Error("Bad response from server");
        //      }
        //      return response.json();
        //  })
        //  .then(function(data) {
        //       const placeDetails = data.result
        //      return {id: placeDetails.place_id, name: placeDetails.name, town: placeDetails.address_components[2].long_name, url: placeDetails.url, lon: placeDetails.geometry.location.lng.toFixed(6),lat: placeDetails.geometry.location.lat.toFixed(6)};
        //  })
        //  .then((data)=>{
        //    $.post('http://localhost:8000/api/stores', data)
        //  })
     let postData = {id: placeDetails.place_id, name: placeDetails.name, town: placeDetails.address_components[2].long_name, url: placeDetails.url, lon: placeDetails.geometry.location.lng.toFixed(6),lat: placeDetails.geometry.location.lat.toFixed(6)}
  //    Check if store exists, and if not, add to database
     $.post('http://localhost:8000/api/stores', postData)
      setTimeout(()=>{this.setState({index:index,storeid: $.ajax({
              url:'http://localhost:8000/api/stores/'+postData.id,
              dataType: 'json',
              type:'GET',
              async: false,
              success: function(data) {
                return data;
              },
              error: function(xhr, status, err) {
              console.error('http://localhost:8000/api/stores', status, err.toString());
              }
          }).responseJSON})},100)
      setTimeout(()=>{this.props.update_submitOrder(2)},150)
    }
    handleNewPrice () {
      //THIS IS ALL THE MODAL USER FLOW
      switch (this.props.submitOrder) {
        case 0:
          return (<div></div>)
        case 1:
          if (this.props.user.loggedin===false) {
            return <div><h3>Please log in to submit new prices</h3></div>
          }
          else {
          return (<div><p className='text-center' id='storesNearYou'>Liquor Stores Near You</p>
            {this.props.stores.map((store,index)=>(<div className='pointer modalStores' key={index}>
              <p onClick={()=>this.setIndex(index)}>{store.name}</p>
              </div>))
            }</div>)}
        case 2:
          return (<div><p className='text-center' id='storesNearYou'>What Alcohol?</p>
          <p onClick={()=>{console.log(this.refs.newAlcohol)}} className='chosen text-center'>{this.props.stores[this.state.index].name}</p>
            <AlcoholSuggest ref='newAlcohol' purpose='new'/>
            </div>)
        case 3:
          return (<div><p className='text-center' id='storesNearYou'>Size and Price?</p>
          <p className='chosen text-center'>{this.props.stores[this.state.index].name}</p>
          <p className='chosen text-center'>{this.props.newAlcohol[0].name}</p>
          <div>{this.getButtons('beer')}</div>
          <span className='dollar'>$ </span><input className='priceSubmit' ref='price' type='text' placeholder='Price'/>
            </div>)
        case 4:
          return (<div><p className='text-center' id='storesNearYou'>You are a real hero, {this.props.user.username}!</p>
          <ExpBar/>
          </div>)
      }
    }
    //select alcohol size
    buttonSelect (size) {
      $('.size').removeClass('selectedButton')
      $('.'+size).addClass('selectedButton')
      this.setState({size: size})
    }
    //Render buttons depending on type of alcohol
    getButtons (group) {
      if (group.toLowerCase()==='beer') {
        return (<div className='buttons'>
        <button onClick={()=>this.buttonSelect('6-pack')} className='btn btn-default size 6-pack'>6-pack</button>
        <button onClick={()=>this.buttonSelect('12-pack')} className='btn btn-default size 12-pack'>12-pack</button>
        <button onClick={()=>this.buttonSelect('18-pack')} className='btn btn-default size 18-pack'>18-pack</button>
        <button onClick={()=>this.buttonSelect('24-pack')} className='btn btn-default size 24-pack'>24-pack</button>
        <button onClick={()=>this.buttonSelect('30-pack')} className='btn btn-default size 30-pack'>30-pack</button>
        <button onClick={()=>this.buttonSelect('Keg')} className='btn btn-default size Keg'>Keg</button>
      </div>)
      }
      else if (group.toLowerCase()==='wine') {
        return (<div className='buttons'>
        <button className='btn btn-default '>750 ml</button>
        <button className='btn btn-default '>1.5 L</button>
        <button className='btn btn-default '>3 L</button>
        <button className='btn btn-default '>5 L</button>
      </div>)
      }
      else if (group.toLowerCase()==='liquor') {
        return (<div className='buttons'>
        <button className='btn btn-default '>Fifth</button>
        <button className='btn btn-default '>Handle</button>
      </div>)
      }
    }
    submitButton () {
      if (this.props.submitOrder===3) {
        return (<button onClick={()=>this.handleSubmit()}type='button' className='btn col-xs-4 btn-default'>SUBMIT</button>)
      }
      else {
        return (<div></div>)
      }
    }
    handleSubmit () {
      var entryData = {alcoholid: this.props.newAlcohol[0]._id , userid: this.props.user._id, storeid:this.state.storeid, price: this.refs.price.value.trim(), qty: this.state.size}
      $.post('http://localhost:8000/api/entries', entryData)
      setTimeout(()=>{this.props.update_submitOrder(4)},150)
    }
    getPage () {
      //If nothing has been submitted > render this ish
      if (this.state.page==='submit') {
        return (<div>
          <div className="row">
            <h3 className="text-center">OR</h3>
          </div>
          <div className="row">
            <h4 className="text-center">Help the Community and</h4>
          </div>
          <div className="row">
            <button onClick={()=>this.props.update_submitOrder(1)} data-toggle='modal' data-target='#priceModal' className="btn submitPrice col-xs-10 col-xs-offset-1 col-md-4 col-md-offset-4">SUBMIT NEW PRICE</button>
          </div>

          <div id='priceModal' className='modal fade' role='dialog'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <button type='button' className='close' data-dismiss='modal'>&times;</button>
                     <h4 className='modal-title'>Submit New Price</h4>
                </div>
                <div>{this.handleNewPrice()}</div>
                <div className='modal-footer'>
                  {this.submitButton()}
                </div>
              </div>

            </div>
          </div>
        </div>)
      //Once results are received, show em
      } else if (this.state.page==='results') {
        return (<ResultsView/>)
      }
      //or have it load and stuff
      else if (this.state.page==='loading') {
        return (<div className='text-center loading'>Loading...</div>)
      }
    }
    render () {
      return (
        <div className='col-xs-12 col-md-pull-5 col-md-7 main'>
        <div className='mainHeader'>
        <div className='row'>
          <h1 className='text-center'>Find the Cheapest Booze in Your Area</h1>
        </div>
        <div className='row'>
            <div className='col-xs-10 col-xs-offset-1 col-md-10 col-md-offset-1'>
            <div className='col-xs-12 col-md-10 mainSearch'>
            <AlcoholSuggest ref='newAlcohol' purpose='old' id='mainSearch'/>
            </div>
            <button onClick={(e) => this.handleClick(e)} className='btn col-xs-8 col-xs-offset-2 col-md-offset-0 col-md-2 searchBtn'>Submit</button>
            </div>
          </div>
          </div>
            {this.getPage()}
      </div>
      )
    }
}

const combinedActions = Object.assign({},resultsActions,alcoholActions,coordActions,storeActions,orderActions)

export default connect(mapStateToProps, combinedActions)(Main)
