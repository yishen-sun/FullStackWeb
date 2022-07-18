// 这里的单词React代表entire object从文件导入'react'
// {Component}表示我们指定particular property从文件导入。
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (<li><a href="/auth/google">Login With Google</a></li>);
            default:
                return ([<li key="1"><Payments/></li>,
                         <li key="2" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
                        <li key="3"><a href="/api/logout">Logout</a></li>,
            ]);
        }
    }
    render() {
        //console.log(this.props);
        return (
            <nav>
            <div className="nav-wrapper">

              <Link to={this.props.auth ? '/' : '/'} className="left brand-logo">Emaily</Link>
              <ul id="nav-mobile" className="right">
                {this.renderContent()}
              </ul>
            </div>
          </nav>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps, null)(Header);