import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Home from './Home';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import Nav from './Nav';

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <main className='container'>
            <Nav/>
            {this.props.loading === true
              ? null
              : <div className='holder'>
                  <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/new' component={NewTweet}/>
                    <Route path='/tweet/:id' component={TweetPage}/>
                  </Switch>
              </div>}
          </main>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
};

export default connect(mapStateToProps)(App);