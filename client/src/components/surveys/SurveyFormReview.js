import { connect } from 'react-redux'
import fieldsToRender from './formFields'
import * as actions from '../../actions'
import { withRouter } from 'react-router'

const SurveyReviewComponent = (props) => {
    const { onCancel, formValues, submitSurvey, history } = props
    const Element =(name, label)=> {
        return(<div key={name} >
            <label>{label}</label>
            <div>{formValues[name]}</div>
        </div>)
    }
    return (<form onSubmit={ (e)=>{
            e.preventDefault()
            submitSurvey(formValues, history) 
        }}>
        <h5>Please confirm your entries</h5>
        {  fieldsToRender.map(({ label, name }) => Element(name,label))  }
        <button className="red left btn-flat white-text" onClick={ onCancel }>
            go back
            <i className='material-icons right'>cancel</i>
        </button>
        <button className="teal right btn-flat white-text" type="submit">
            send surveys
            <i className='material-icons right'>send</i>
        </button>
    </form>)
}
function mapStateToProps({form}){
 return { formValues: form.surveyForm.values }
}
export default connect(mapStateToProps, actions)(withRouter(SurveyReviewComponent))