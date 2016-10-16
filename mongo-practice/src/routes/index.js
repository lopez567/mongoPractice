import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import NotFoundView from 'views/NotFoundView/NotFoundView'
import About from 'views/SideView/about'
import Contact from 'views/SideView/contact'
import Leaderboard from 'views/SideView/leaderBoard'
import Profile from 'views/SideView/profile'
import AlcoholView from 'views/SideView/alcohol'
import AlcoholSuggest from 'views/SideView/suggestions'
import Empty from 'views/SideView/empty'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Empty} />
    <Route path='/404' component={NotFoundView} />
    <Route path='/about' component={About} />
    <Route path='/contact' component={Contact} />
    <Route path='/leaderboard' component={Leaderboard} />
    <Route path='/profile' component={Profile} />
    <route path='/alcohol' component={AlcoholView} />
    <route path='/suggestions' component={AlcoholSuggest}/>
    <Redirect from='*' to='/404' />
  </Route>
)
