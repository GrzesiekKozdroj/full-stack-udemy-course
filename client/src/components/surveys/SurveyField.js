const SurveyField = ({ input, label, meta: {error, touched} })=>{
    //console.log(meta)
    return (
        <div>
            <label>{label}:</label>
            <input {...input} />
            <div className="red-text" style={{marginBottom:'20px'}}>
                { touched && error }
            </div>
        </div>
    )
}
export default SurveyField