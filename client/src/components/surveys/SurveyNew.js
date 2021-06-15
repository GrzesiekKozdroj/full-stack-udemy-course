import { Component } from 'react'
import SurveyForm from './surveyForm'
import SurveyReviewComponent from './SurveyFormReview'


class SurveyNew extends Component {
    state = { showFormReview: false }
    renderContent () {
        console.log('render triggered', this.state)
        return !this.state.showFormReview ? 
            <SurveyForm 
                onSurveySubmit={()=>{
                    this.setState({showFormReview: true})
                    console.log('change in state triggered')
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

export default SurveyNew