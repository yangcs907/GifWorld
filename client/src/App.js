import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import Auth from './Auth';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Callback from './components/Callback';
//import NotFound from './components/404';

const img = {
  height: "180px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "8px",
  boxShadow:
      "0 0 10px rgba(255,255,255,0.2), -1px 0 10px rgba(255,255,255,0.2), 1px 0 10px rgba(255,255,255,0.2)"
};
class App extends Component {
  render() {
    const auth = new Auth(this.props.history);
    const isAuth = auth.isAuthenticated();

    return (
      <main className="column split">
        <div className="content">
          <header
            isAuth={isAuth}
            login={auth.login}
            logout={auth.logout} />
          <Switch>
            <Route path="/dashboard" render={() => (
                isAuth ?
                <Dashboard /> : <Redirect to="/" />
            )} />

            <Route path="/" exact render={() => {
              if (!isAuth) {
                return (
                  <div className="landing column y-center">

                    <h1>Welcome to GifWorld! Where gifs come true</h1>

                    <p>Looking for a gif? Do a simple search to view and save your favorite gifs</p>
                    <p>Powered by &copy;Giphy</p>

                    <img src="https://media.giphy.com/media/uudzUtVcsLAoo/giphy.gif" alt="tiger woods fist pump" style={img}></img>
                    <br></br>
                    <br></br>
                    <button className="dash-login" onClick={auth.login}>Let's Get Started!</button>

                  </div>
                )
              } else return (<Redirect to="/dashboard" />)
            }} />

          <Route path="/callback" render={() => (
              <Callback processAuth={auth.processAuthentication} />
           )} />


          </Switch>

        </div>

        <footer className="row split y-center">
          <p>&copy; {new Date().getFullYear()} GifWorld by Chris Yang</p>
          <p></p>
        </footer>
      </main>
    );
  }
}


export default withRouter(App);
