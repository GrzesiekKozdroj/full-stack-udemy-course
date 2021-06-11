import { Form, Field } from 'react-final-form'
import {Component, useState} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)

    window.alert(JSON.stringify(values, 0, 2))
}
const ReduxForm = (props) => {
    const [ title, setTitle ] = useState()
    const [ subject, setSubject ] = useState()
    const [ body, setBody ] = useState()
    const handleChange = e => {
        switch (e.target.name) {
            case 'title':
                setTitle(e.target.value)
                break;
            case 'subject':
                setSubject(e.target.value)
                break;
            case 'body':
                setBody(e.target.value)
                break;
            default:
                break;
        }
    }
    const handleSubmit = (e) => {
        console.log('FORM SUBMITED')
        e.preventDefault()
        props.newForm({
                title, body, subject
        })
    }
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <h3>title</h3>
                    <input type="text" id="title" name="title" value={title} onChange={handleChange}/>
                    <h3>subject</h3>
                    <input type="text" id="subject" name="subject" value={subject} onChange={handleChange}/>
                    <h3>body</h3>
                    <input type="text" id="body" name="body" value={body} onChange={handleChange}/>
                    <button >Submit</button>
                </form>
            </div>
        )
}


const SurveyForm = props => {
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={ props.newForm }
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>title</label>
                        <Field
                            name="title"
                            component="input"
                            type="text"
                            placeholder="title"
                        >{props.newForm.title}</Field>
                    </div>
                    <div>
                        <label>subject</label>
                        <Field
                            name="subject"
                            component="input"
                            type="text"
                            placeholder="subject"
                        >{props.newForm.subject}</Field>
                    </div>
                    <div>
                        <label>body</label>
                        <Field name="body" component="textarea" placeholder="Notes" >{props.newForm.body}</Field>
                    </div>
                    <div className="buttons">
                        <button type="submit" disabled={submitting || pristine}>
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                        >
                            Reset
                        </button>
                    </div>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
            )}
        />
    )
}
const mapStateToProps = state => {
    console.log('state from form: ',state)
    return { newForm: state.form }
}
export default connect(mapStateToProps, actions)(ReduxForm)