import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component{
    renderContent(){
        switch(this.props.auth){
            case null:
                return 'logging in...'
            case false:
                return 'logged out'
            default:
                return 'logged in'
        }
    }
    render(){
        return (
            <nav>
            <div className="nav-wrapper">
              <a href="#" className="left brand-logo">__emailer</a>
              <ul className="right">
            <li>{this.renderContent()}</li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">JavaScript</a></li>
              </ul>
            </div>
          </nav>
        )
    }
}
function mapStateToProps({auth}){
    return {auth}
}
export default connect(mapStateToProps)(Header)