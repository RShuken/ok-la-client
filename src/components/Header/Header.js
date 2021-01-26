import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';
import icon from '../../images/menu_icon.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      isToggled: false,
    };
  }
  static contextType = UserContext;

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <nav>
        <Link onClick={this.handleLogoutClick} to='/login'>
          Logout
        </Link>
        <Link to='/'>My Dashboard</Link>
        <Link to='/community-dashboard'>Community Hub</Link>
      </nav>
    );
  }

  renderLoginLink() {
    return (
      <nav className='publicNav'>
        <Link to='/login'>Login</Link> <Link to='/register'>Sign up</Link>
      </nav>
    );
  }

  changeToggled() {
    this.setState({ isToggled: !this.state.isToggled });
  }

  renderHamburgerMenu() {
    return (
      <div className='menuBtn'>
        <button onClick={(e) => this.changeToggled()}>
          <img src={icon} alt='menu button' />
        </button>
      </div>
    );
  }

  renderNav() {
    return TokenService.hasAuthToken()
      ? this.renderLogoutLink()
      : this.renderLoginLink();
  }

  render() {
    return (
      <div>
        <header>
          <div className='headerWrapper'>
            <Link to='/'>
              <h1 className='logo'>Ok'la Learning</h1>
            </Link>
          </div>

          {this.state.width <= 600
            ? this.renderHamburgerMenu()
            : this.renderNav()}

        
        </header>
        <div>
            {this.state.width <= 600 && this.state.isToggled
            ? this.renderNav()
            : undefined}
        </div>
      </div>
    );
  }
}

export default Header;
