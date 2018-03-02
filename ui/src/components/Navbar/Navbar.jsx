import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { InputGroup } from '@blueprintjs/core';

import AuthButtons from 'src/components/auth/AuthButtons';

import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.searchContext ? props.searchContext.query.getString('q') : ''};

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname === '/search')
      return
      
    if (nextProps.searchContext && nextProps.searchContext.query.state.q !== this.state.value) {
      this.setState({
        value: nextProps.searchContext.query.getString('q')
      })
    }
  }
  
  onChange({ target }) {
    this.setState({value: target.value})
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.props.location.pathname === '/search') {
      let query = this.props.searchContext.query.set('q', this.state.value);
      this.props.searchContext.updateQuery(query);
    } else {
      const { history } = this.props;
      history.push({
        pathname: '/search',
        search: queryString.stringify({
          q: this.state.value
        })
      })
    }
  }
  
  render() {
    const {metadata,session} = this.props
    return (
      <div className="Navbar">
        <nav className="pt-navbar">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">
              <Link to="/">
                <img src={metadata.app.logo} alt={metadata.app.title} />
              </Link>
            </div>
            <div className="pt-navbar-heading">
              <Link to="/">{metadata.app.title}</Link>
            </div>
            <form onSubmit={this.onSubmit}>
              <InputGroup type="text" leftIcon="search" className="pt-large"
                onChange={this.onChange} value={this.state.value} />
            </form>
          </div>
          <div className="pt-navbar-group pt-align-right">
            <AuthButtons session={session} auth={metadata.auth} />
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);