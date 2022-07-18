// SurveyForm sohws a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // Field can render any type of THML elements
import SurveyField from './SurveyField';
import _ from 'lodash'; // for ilteration
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type = "text" label={label} name={name}/>
        });
        return (
            <div>
                {/* label 作为一个参数 自动传入SurveyField，还有一个参数props是自动传入的，包含一个input参数有很多callback func */}
                <Field type='text' name="title" label = "Survey Title" component={SurveyField} />
                <Field type='text' name="subject" label = "Subject Line" component={SurveyField} />
                <Field type='text' name="body" label = "Email Body" component={SurveyField} />
                <Field type='text' name="emails" label = "Recipient List" component={SurveyField} />
            </div>
        );
        
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => { this.props.onSurveySubmit(); console.log(values)})}>
                    {this.renderFields()}
                    <Link to="/surveys" className='red btn-flat left white-text'>
                    Cancel
                    </Link>
                    <button type="submit" className='green btn-flat right white-text'>
                        Next
                        <i className='material-icons right'>done</i>
                    </button>
                </form>
                
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = "Reuqired";
        }
    });
    /*
    if (!values.title) {
        errors.title = "You must provide a title";
    }
    if (!values.subject) {
        errors.title = "You must provide a subject";
    }
    if (!values.body) {
        errors.title = "You must provide a body";
    }
    */
    
    return errors;

};

// reduxForm 和 connect 很像，复习：connect是处理state映射到UI，或用户对UI的操作映射到action
// redux form不需要我们自己定义action和reducer
// handleSubmit 是redux form 提供的
export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false // dont destory content even if it is not shown
})(SurveyForm);