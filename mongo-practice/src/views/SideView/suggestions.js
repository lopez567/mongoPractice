import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Autosuggest from 'react-autosuggest'
import { actions as newAlcoholActions } from '../../redux/modules/newAlcohol'
import { actions as orderActions } from '../../redux/modules/submitOrder'
import { actions as alcoholActions } from '../../redux/modules/alcohol'


var alcohols
const mapStateToProps = (state) => ({
  alcohol: state.alcohol,
  newAlcohol: state.newAlcohol,
})


function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const alcohols=$.ajax({
          url:'http://localhost:8000/api/alcohol/',
          dataType: 'json',
          type:'GET',
          async: false,
          success: function(data) {
            return [data];
          },
          error: function(xhr, status, err) {
          console.error('http://localhost:8000/api/alc', status, err.toString());
          }
      }).responseJSON
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp(escapedValue, 'i');

  return alcohols.filter(alcohol => regex.test(alcohol.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}


function renderSuggestion(suggestion) {
  return (
    <div onClick={()=>(this.handleSuggestion(suggestion.name))}>{suggestion.name}</div>
  );
}



export default class AlcoholSuggest extends Component {
  static propTypes = {
    alcohol: PropTypes.array.isRequired,
    newAlcohol: PropTypes.array.isRequired,
    get_newAlcohol: PropTypes.func.isRequired,
    update_submitOrder: PropTypes.func.isRequired,
    getAlcohol: PropTypes.func.isRequired
  };
  constructor() {
      super();

  this.state = {
     value: '',
     suggestions: getSuggestions('')
   };

   this.onChange = this.onChange.bind(this);
   this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
 }

 handleSuggestion (suggestion) {
   if (this.props.purpose==='new') {
     setTimeout(()=>{
       this.props.update_submitOrder(3)
     },200)
     this.props.get_newAlcohol($.ajax({
             url:'http://localhost:8000/api/alcohol/'+suggestion,
             dataType: 'json',
             type:'GET',
             async:false,
             success: function(data) {
               return data
             },
             error: function(xhr, status, err) {
             console.error('http://localhost:8000/api/alc', status, err.toString());
           }
         }).responseJSON)
   }
 }

 onChange(event, { newValue, method }) {
   this.props.getAlcohol([{name:newValue}])
   this.setState({
     value: newValue
   });
 }
shouldRenderSuggestions(value) {
   return value.trim().length > 2;
 }
 onSuggestionsUpdateRequested({ value }) {
   this.setState({
     suggestions: getSuggestions(value)
   });
 }
 render() {
   const { value, suggestions } = this.state;
   const inputProps = {
     placeholder: "Search for Beer/Liquor",
     value,
     onChange: this.onChange,
   };

   return (
     <Autosuggest get_newAlcohol={this.props.get_newAlcohol}
                  suggestions={suggestions}
                  shouldRenderSuggestions={this.shouldRenderSuggestions}
                  onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion.bind(this)}
                  inputProps={inputProps} />
   );
 }
}

const combinedActions = Object.assign({},alcoholActions,orderActions, newAlcoholActions)

export default connect(mapStateToProps,combinedActions)(AlcoholSuggest)
