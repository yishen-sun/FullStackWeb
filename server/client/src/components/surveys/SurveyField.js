// SurveyField contains logic to render a single label and text input
import React from "react";

//export default (props) => {
export default ({ input, label, meta: { error, touched } }) => {
    //console.log(props);
    //console.log(meta);
    return (
        <div style={{marginTop: '10px'}}>
            <label>{label}</label>
            
            {/* {...input} 相当于 onBlur={input.onBlur} onChange={input.onChange} 因为 input 有很多callback func 相当于展开了*/}
            <input {...input} style={{marginBottom: '1px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>{touched && error}</div>
            
        </div>
    );
};