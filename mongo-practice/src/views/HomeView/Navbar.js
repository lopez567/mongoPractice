import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as userActions } from '../../redux/modules/user'

const mapStateToProps = (state, store) => ({
  user: state.user
})

export class Navbar extends React.Component {
    static propTypes = {
      user: PropTypes.object.isRequired,
      getUser: PropTypes.func.isRequired
    };
    constructor () {
      super()
      this.state= {modal:'login',nav:'login',error:''}
    }
    getLink () {
      if (this.state.nav==='login'){
        return (<a data-toggle='modal' className='pointer' data-target='#loginModal'>LOG IN/SIGN UP</a>)
      }
      else {
        return (<Link to='/profile'>PROFILE</Link>)
      }
    }
    setModal () {
      this.setState({modal:'signup'})
    }
    handleLogin () {
      if (this.state.modal==='login') {
        const node = this.refs.username
        const username = node.value.trim()
        const node2 = this.refs.password
        const password = node2.value.trim()
        const postData = {username: username, password: password}
        var data = $.post('http://localhost:8000/api/authenticate',postData,function(data) {
          return data;
        })
        setTimeout(()=>{
          if (data.responseJSON.success===true) {
          this.props.getUser((Object.assign({},$.ajax({
                  url:'http://localhost:8000/api/users/'+username,
                  dataType: 'json',
                  type:'GET',
                  async: false,
                  success: function(data) {
                    return data;
                  },
                  error: function(xhr, status, err) {
                  console.error('http://localhost:8000/api/users', status, err.toString());
                  }
              }).responseJSON,{JWT: data.responseJSON.token, loggedin:true})))}
              else {
                console.log(data.responseJSON.message)
              }
        },101)
        setTimeout(()=>{
          if (data.responseJSON.success===true) {
          this.setState({nav:'profile'})}
          else {

          }
        },105)
        setTimeout(()=>{
          if (data.responseJSON.success===true) {
          $('#loginModal').modal('hide')
        } else {
          this.setState({loginError: data.responseJSON.message})
        }
        },106)
      }
      else if (this.state.modal==='success') {
        this.setState({modal:'login'})
      }
      else {
        var ready = true
        if (this.refs.password.value.trim()!== this.refs.repeatPassword.value.trim()) {
          this.setState({errorPass:'Passwords do not match'})
          ready = false
        }
        else {(this.setState({errorPass:''}))}
        if (this.refs.age.value.trim()<21) {
          this.setState({errorAge:'Must be 21'})
          ready = false
        }
        else {
          {(this.setState({errorAge:''}))}
        }
        if (ready===true) {
          var signUpData = {username: this.refs.username.value.trim(),age: this.refs.age.value.trim() ,password: this.refs.password.value.trim(),email: this.refs.email.value.trim()}
          console.log(signUpData)
          if ($.ajax({
                  url:'http://localhost:8000/api/users/'+ this.refs.username.value.trim(),
                  dataType: 'json',
                  type:'GET',
                  async: false,
                  success: function(data) {
                    return data;
                  },
                  error: function(xhr, status, err) {
                  console.error('http://localhost:8000/api/users', status, err.toString());
                  }
              }).responseJSON!==null) {
                this.setState({errorUser:'User Already Exists'})
              }
              else {
                $.post('http://localhost:8000/api/users', signUpData)
                this.setState({modal:'success'})
              }
        }
      }
    }
    newModal (modal, selection) {
      $('.modal-header-btn').removeClass('selectedButton')
      $('.'+selection).addClass('selectedButton')
      this.setState({modal:modal})
    }
    getModal () {
      if (this.state.modal==='login') {
        return (<div className='modal-body'>
          <p className='modal-p'>Username</p>
          <input className='input' ref='username' type='text'></input>
          <p className='modal-p'>Password</p>
          <input placeholder='********' className='input' ref='password' type='password'></input>
          <p className='error'>{this.state.loginError}</p>
        </div>)
      }
      else if (this.state.modal==='signup') {
        return (<div className='modal-body'>
        <p className='modal-p'>Username</p>
        <input className='input' ref='username' placeholder='20 character limit' type='text'></input>
        <p className='error'>{this.state.errorUser}</p>
        <p className='modal-p'>Email</p>
        <input className='input' ref='email' placeholder='example@example.com' type='text'></input>
        <p className='modal-p'>Age</p>
        <input className='input' ref='age' placeholder='In Years, ie 21' type='text'></input>
        <p className='error'>{this.state.errorAge}</p>
        <p className='modal-p'>Password</p>
        <input className='input' ref='password' placeholder='********' type='password'></input>
        <p></p>
        <input className='input' ref='repeatPassword' placeholder='Repeat Password' type='password'></input>
        <p className='error'>{this.state.errorPass}</p>
          </div>)
      }
      else if (this.state.modal==='success') {
        return (<div className='modal-body'>
        <h3>Sign Up Successful, Please attempt to login</h3>
        </div>)
      }
    }
   render () {
     return (
       <div>
       <div className='navbar navbar-static-top'>
         <div className='container'>
           <div className='navbar-header'>
             <a href='/'className='navbar-brand'>BOOZE CLUES</a>

             <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#collapseable' aria-expanded='false' aria-controls='navbar'>
               <span className='sr-only'>Toggle navigation</span>
               <span className='icon-bar'></span>
               <span className='icon-bar'></span>
               <span className='icon-bar'></span>
             </button>
           </div>
           <div id='collapseable' className='navbar-collapse collapse' role='navigation'>
              <ul className='nav navbar-nav navbar-right'>
                <li className='liLinks'><Link to='/about'>ABOUT</Link></li>
                <li className='liLinks'><Link to='/contact'>CONTACT</Link></li>
                <li className='liLinks'><Link to='/leaderboard'>LEADERBOARD</Link></li>
                <li className='liLinks'>{this.getLink()}</li>
              </ul>
            </div>

         </div>
       </div>
       <div id='loginModal' className='modal fade' role='dialog'>
         <div className='modal-dialog'>
           <div className='modal-content'>
             <div className='modal-header'>
               <button onClick={()=>this.newModal('login','login-btn-header')} className='btn login-btn-header modal-header-btn selectedButton'>Log In</button><button onClick={()=>this.newModal('signup','sign-up-btn-header')} className='btn modal-header-btn sign-up-btn-header'>Sign Up</button>
             </div>
             <div>{this.getModal()}</div>
             <div className='modal-footer'>
               <button onClick={()=>this.handleLogin()} type='button' className='btn btn-submit-authenticate btn-default'>Submit</button>
             </div>
           </div>

         </div>
       </div>
       </div>
     )
   }
 }
export default connect(mapStateToProps, userActions)(Navbar)
