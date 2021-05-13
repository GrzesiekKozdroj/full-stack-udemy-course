import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Payments extends Component {
    render(){
        return(
            <StripeCheckout 
                 
                name="Emaily" 
                description="Buy 5 credits for $5"
                amount = { 500 } 
                token = { token=>this.props.handleToken(token) } 
                stripeKey = { 'pk_test_51IpyNgC4YRDiU0aNEpCUH6wrwI0yALORUpn34MKaWlHqLNEszxoqizaeYFSabYPXDbSQ980589tvi0ZmoUeKvpBl00TJeKlBHf' }  
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        )
    }
}
export default connect(null,actions)(Payments)