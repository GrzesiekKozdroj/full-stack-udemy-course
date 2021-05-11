import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends Component{
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li key="0">
                        <a href="auth/google">Login With Goolge</a>
                    </li>
                )
            default:
                return [
                    <li key="2"><Payments /></li>,
                    <li key="1"><a href="api/logout">Log out</a></li>
                ]
        }
    }

    render(){
        return (
            <nav>
            <div className="nav-wrapper">
                <Link 
                    to = { this.props.auth ? '/surveys' : '/' } 
                    className = "left brand-logo" >
                        __emailer
                </Link>
              <ul className="right">
                {this.renderContent()}
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