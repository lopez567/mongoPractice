'use strict';

var Navbar=React.createClass({
 setSignIn: function(){
    if(this.state.signedinvar===true) {
    this.setState({
      signedin:"Profile",
      frame:"profile",
    })
    }
    else {
    this.setState({
      signedin:"Sign In/Sign Up!",
      frame:"profile"
    })
    }
  },
  setAbout: function() {
    this.setState({
      frame:"about"
    })
  },
  setContact: function() {
    this.setState({
      frame:"contact"
    })
  },
  setLeader: function() {
    this.setState({
      frame:"leader"
    })
  },
  setMain: function() {
    this.setState({
      frame:"main"
    })
  },
  getInitialState: function(){
     return {
         signedin:"Sign In/Sign Up!",
         signedinvar:false

     }
 },
 render: function(){
   return (
     <div>
     <div className="navbar navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <a href="#"className="navbar-brand">Booze Clues</a>

          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapseable" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div id="collapseable" className="navbar-collapse collapse" role="navigation">
           <ul className="nav navbar-nav navbar-right">
             <li><a href="#" onClick={this.setAbout}>About</a></li>
             <li><a href="#" onClick={this.setContact}>Contact</a></li>
             <li><a href="#" onClick={this.setLeader}>Leaderboard</a></li>
             <li><a href="#" onClick={this.setSignIn}>{this.state.signedin}</a></li>
           </ul>
         </div>

      </div>
    </div>
    <WindowContainer frame={this.state.frame} signedin={this.state.signedinvar}/>
    </div>
  );
 }
});

var Main = React.createClass({
  render: function() {
    return (
      <div className="col-xs-12 col-md-pull-5 col-md-7">
        <div className="row">
          <h2 className="text-center">Finding the Cheapest Booze in Your Area</h2>
        </div>
        <div className="row">
          <form>
            <input type="text" placeholder="Search for Beer/Liquor" className="search col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-1">
            </input>
            <button className="btn col-xs-8 col-xs-offset-2 col-md-2 col-md-offset-1 searchBtn">Submit</button>
          </form>
        </div>
        <div className="row">
          <h3 className="text-center">OR</h3>
        </div>
        <div className="row">
          <h4 className="text-center">Help the Community and</h4>
        </div>
        <div className="row">
          <button className="btn submitPrice col-xs-10 col-xs-offset-1 col-md-4 col-md-offset-4">Submit New Price</button>
        </div>
      </div>
    )
  }
});

var AboutWindow = React.createClass({
  render: function() {
    return (
      <div className="col-xs-12 col-md-push-7 col-md-5">
        <h2 className="text-center">About Booze Clues</h2>
        <p>The idea of Booze Clues is simple: Find the cheapest store to buy your favorite alcohol.
          All you need to do is search for alcohol, and we will find you the cheapest place to buy it in your area.
          Booze Clues is a crowdsourced project, and relies on everyone to make sure everybody is getting the best deal.
          Be a good citizen and support this valiant effort. Whenever you make a purchase, all you need to do
          is type the alcohol and submit the price. Then, you should, of course, reward yourself for your philanthropy.
          Go ahead, have a drink, just please do it responsibly.</p>
          <span className="close">X</span>
      </div>
    )
  }
});

var ContactWindow = React.createClass({
  render: function() {
    return (
      <div className="col-xs-12 col-md-push-7 col-md-5">
         <h2 className="text-center">Contact</h2>
         <div className="social text-center">
         <button className="btn facebook socialbtn">Facebook</button>
         <button className="btn twitter socialbtn">Twitter</button>
         </div>
         <p className="text-center" id="emaildesc">Or email us at</p>
         <p className="text-center" id="boozeemail">info@boozeclues.com</p>
         <span className="close">X</span>
       </div>
    )
  }
});

var LeaderboardWindow = React.createClass({
  /*Code to map Leaders
  var rank=0
  map(function(users){
    rank=rank+1
    return (
      <div className="rankers">
      <p>{rank}. {users.username}</p>
      <p>Total Points ={users.points}</p>
      </div>
  )
  })

  */
  render: function(){
    return (
      <div className="col-xs-12 col-md-push-7 col-md-5">
      <h2 className="text-center">Leaderboard</h2>
      <div className="rankers row">
      <p id="user">1. Username</p>
      <p id="points">1000 Points</p>
      </div>
         <span className="close">X</span>
      </div>
    )
  }
});


var Profile = React.createClass({
  render: function(){
    return (
      <div className="col-xs-12 col-md-push-7 col-md-5">
      <h2 className="text-center">User.username</h2>
      <p>Email:User.Email</p>
      <p>Date Joined: User.date_joined</p>
      <p>Points: User.points</p>
      <p>Thanks Count: User.thanks_count</p>
      <button>View Thanks</button>
      <span className="close">X</span>
      </div>
    )
  }
});

var Signup = React.createClass({
  render: function() {
    return (
      <div className="col-xs-12 col-md-push-7 col-md-5">
        <h2 className="text-center">Sign In</h2>
        <div>
        <div className="text-center">

          <input type="text" placeholder="Username" className="signInput"/>

          <input type="password" className="signInput" placeholder="Password"/>
      <button className="btn signInBtn">Sign In</button>
        </div>

        </div>
        <div className="text-center">
        <button className="signup btn">Sign Up Now!</button>
        </div>
        <span className="close">X</span>
      </div>
    )
  }
});

var ProfileWindow = React.createClass({
  render:function(){
    if (this.props.signedin===false) {
    return (
      <Signup/>
    )
    }
    else {
      return (
        <Profile/>
      )
    }
  }
});

var WindowContainer = React.createClass({
  getDefaultProps: function() {
    return {
      frame:"main"
    }
  },
  render: function() {
    switch(this.props.frame) {
      case "about":
        return    (<div className="container">
                  <div className="row">
                  <AboutWindow/>
                  <Main/>
                   </div>
                   </div>);
      case "contact":
          return  (<div className="container">
                    <div className="row">
                    <ContactWindow/>
                    <Main/>
                     </div>
                     </div>);
      case "leader":
          return (<div className="container">
                    <div className="row">
                    <LeaderboardWindow/>
                    <Main/>
                     </div>
                     </div>);
      case "profile":
          return (<div className="container">
                    <div className="row">
                    <ProfileWindow signedin={this.props.signedin}/>
                    <Main/>
                     </div>
                     </div>);
      case "main":
          return (<div className="container">
                    <div className="row">
                    <div className="col-xs-12 col-md-push-7 col-md-5"></div>
                    <Main/>
                     </div>
                     </div>);
    }
  }
});


var BoozeClues = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar/>
      </div>
    );
  }
});

setInterval(function() {
  ReactDOM.render(
    <BoozeClues/>,
    document.getElementById('mount-point')
  );
}, 200);
