import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateSearch } from '../actions/main_actions';
import { getSearchResults } from '../actions/main_dispatches';

const logoStyle = {
  fontSize: '28px',
  fontFamily: 'Monoton',
  fontWeight: '100'
};

const searchStyle = {
  borderRadius: '8px',
  background: 'rgba(255,255,255,0.2)',
  color: 'white'
}

const Header = props => (
  <header className="row split y-center">
    <div className="row y-center">
      <Link to="/dashboard">
        <h4 style={logoStyle}><i className="fa fa-bolt"></i> GifWorld</h4>
      </Link>

      {props.isAuth} ? (
        <div className="input-wrap">
          <input type="text" style={searchStyle}
            className="search"
            placeholder="Search"
            onKeyUp={props.getSearchResults}
            onChange={props.updateSearch}
            value={props.search} />
          <i className="fa fa-search" onClick={props.getSearchResults}></i>
        </div>
      ) : ''}
    </div>
    {props.isAuth ? (
      <div className="row">
        <p>{localStorage.getItem('user_email')}</p>
        <span>|</span>
        <span className="auth" onClick={props.logout}>Logout</span>
      </div>
    ) : <span className="auth" onClick={props.login}>Login</span>}
  </header>
);

const mapActionToProps = {
  updateSearch,
  getSearchResults
}

const mapStateToProps = (state, props) => ({
  search: state.search
});


export default connect(mapStateToProps, mapActionToProps)(Header);
