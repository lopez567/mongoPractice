import React, { Component } from 'react'
import { Link } from 'react-router'
import fetch        from 'isomorphic-fetch'
import { polyfill } from 'es6-promise'

export default class About extends Component {
  render () {
    return (

    <div className='col-xs-12 col-md-push-7 col-md-5 SideView'>
        <h2 className='text-center'>About Booze Clues</h2>
        <p>The idea of Booze Clues is simple: Find the cheapest store to buy your favorite alcohol.
          All you need to do is search for alcohol, and we will find you the cheapest place to buy it in your area.
          Booze Clues is a crowdsourced project, and relies on everyone to make sure everybody is getting the best deal.
          Be a good citizen and support this valiant effort. Whenever you make a purchase, all you need to do
          is type the alcohol and submit the price. Then, you should, of course, reward yourself for your philanthropy.
          Go ahead, have a drink, just please do it responsibly.</p>
          <span className='close'><Link to='/'>X</Link></span>
      </div>
    )
  }
}
