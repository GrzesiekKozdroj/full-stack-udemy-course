import { Component } from 'react'
import SurveyForm from './surveyForm'
import SurveyReviewComponent from './SurveyFormReview'
import { reduxForm } from 'redux-form'


class SurveyNew extends Component {
    state = { showFormReview: false }
    renderContent () {
        return !this.state.showFormReview ? 
            <SurveyForm 
                onSurveySubmit={()=>{
                    this.setState({showFormReview: true})
                }}
            /> : <SurveyReviewComponent 
                onCancel={()=>this.setState({showFormReview:false})}
            />
    }
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form:'surveyForm'
})(SurveyNew)
//adding redux form connect method here clears form values