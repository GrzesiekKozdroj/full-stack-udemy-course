import { connect } from 'react-redux'
import fieldsToRender from './formFields'

const SurveyReviewComponent = (props) => {
    console.log(props)
    const { onCancel, formValues } = props
    const Element =(value, label)=> {
        return(<div key={label} >
            <label>{label}</label>
            <div>{value}</div>
        </div>)
    }
    return (<div>
        <h5>Please confirm your entries</h5>
        {  fieldsToRender.map(({ label, name }) => Element(formValues[name],label))  }
        <button className="red left btn-flat white-text" onClick={ onCancel }>
            go back
            <i className='material-icons right'>cancel</i>
        </button>
        <button className="teal right btn-flat white-text" onClick={ onCancel }>
            send
            <i className='material-icons right'>send</i>
        </button>
    </div>)
}
function mapStateToProps({form}){
 return { formValues: form.surveyForm.values }
}
export default connect(mapStateToProps)(SurveyReviewComponent)