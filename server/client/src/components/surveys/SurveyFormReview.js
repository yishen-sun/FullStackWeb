// surveyFormReview shows users their form inputs for review
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'; // for ilteration
import formFields from './formFields';
import { withRouter } from 'react-router-dom'; // 类似于link 返回到一个url， 因为这个js不知道，只有app.js和surveynew.js知道
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, ({ label, name }) => {
            return (
                <div key={name} style={{marginTop: '10px'}}>
                    <label>{label}</label>
                    <div style={{marginBottom: '20px'}}>{formValues[name]}</div>
                </div>
            //<Field key={name} component={SurveyField} type = "text" label={label} name={name}/>
            )
    });
    
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className='orange btn-flat white-text' onClick={onCancel}>
                Back
            </button>
            <button onClick={() => submitSurvey(formValues, history)} className='green btn-flat right white-text'>
                Confirm
                <i className='material-icons right'>email</i>
            </button>
        </div>
    );
};
function mapStateToProps(state) {
    console.log(state.form.surveyForm.values);
    return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));