import { Form, Field } from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}

const SurveyNew = () => (
    <div>
        <Form
            onSubmit={onSubmit}
            initialValues={{ stooge: '', employed: false }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>title</label>
                        <Field
                            name="title"
                            component="input"
                            type="text"
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <label>subject</label>
                        <Field
                            name="subject"
                            component="input"
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>
                    <div>
                        <label>body</label>
                        <Field name="body" component="textarea" placeholder="Notes" />
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
    </div>
)

export default SurveyNew