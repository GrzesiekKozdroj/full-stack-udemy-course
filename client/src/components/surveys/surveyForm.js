
import { Component, useState } from 'react'
// import { connect } from 'react-redux'
// import * as actions from '../../actions'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import { Link } from 'react-router-dom'
import validateEmails from '../../utils/validateEmails'
import fieldsToRender from './formFields'


class SurveyForm extends Component {
    renderFields (){
        return(
            <div>
                {
                    fieldsToRender.map(
                        el => (<Field 
                            { ...el }
                            component={ SurveyField } 
                            type="text" 
                        />)
                    )
                }
            </div>
        )
    }
    render(){
        return(
            <form 
                className="container"
                onSubmit={ this.props.handleSubmit/*comes from reduxForm*/(this.props.onSurveySubmit) }
            >
                {this.renderFields()}
                <Link  className="red btn-flat white-text" to="/surveys">
                    Cancel
                    <i className="material-icons right">cancel</i>
                </Link>
                <button 

                    type="submit"
                    className="teal btn-flat right white-text"
                >
                    Submit
                    <i className="material-icons right">spellcheck</i>
                </button>
            </form>
        )
    }
}
const validate = values => { //takes values object which is the same as the one that onSubmit returns
    const errors = {}
    fieldsToRender.map(({ label, name })=>{
        if(!values[name])
            errors[name] = `Please provide ${ name === 'recipients' ? 'Email List' : label }`
    })
    errors.recipients = validateEmails(values.recipients || '')
    return errors //when redux recieves this object and its empty, it'll accept the form as flawless
}
export default reduxForm({
    form: 'surveyForm',
    validate,//redux form expects such function named this way
    destroyOnUnmount: false //persist data, read docs for react-redux-form
})(SurveyForm)






















//redux slice example, kool new feature
// import { createSlice } from '@reduxjs/toolkit'
// const sliceExample = createSlice({
//     name:'counter',
//     initialState:{
//         val:0
//     },
//     reducers:{
//         pluser:v=>v++,
//         minuser:v=>v--,
//         randomiser:(v,t)=>v+=t
//     }
// })
// const {pluser, minuser, randomiser} = sliceExample.actions
// console.log(sliceExample, pluser, sliceExample.actions, sliceExample.reducer)


// my working form version after react-form got changed
// const ReduxForm = (props) => {
//     const [ title, setTitle ] = useState()
//     const [ subject, setSubject ] = useState()
//     const [ body, setBody ] = useState()
//     const handleChange = e => {
//         switch (e.target.name) {
//             case 'title':
//                 setTitle(e.target.value)
//                 break;
//             case 'subject':
//                 setSubject(e.target.value)
//                 break;
//             case 'body':
//                 setBody(e.target.value)
//                 break;
//             default:
//                 break;
//         }
//     }
//     const handleSubmit = (e) => {
//         console.log('FORM SUBMITED')
//         e.preventDefault()
//         props.newForm({
//                 title, body, subject
//         })
//     }
//         return (
//             <div>
//                 <form onSubmit={handleSubmit}>
//                     <h3>title</h3>
//                     <input type="text" id="title" name="title" value={title} onChange={handleChange}/>
//                     <h3>subject</h3>
//                     <input type="text" id="subject" name="subject" value={subject} onChange={handleChange}/>
//                     <h3>body</h3>
//                     <input type="text" id="body" name="body" value={body} onChange={handleChange}/>
//                     <button >Submit</button>
//                 </form>
//             </div>
//         )
// }

// const mapStateToProps = state => {
//     console.log('state from form: ',state)
//     return { newForm: state.form }
// }
// export default connect(mapStateToProps, actions)(ReduxForm)