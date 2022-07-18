// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    /*
    constructor(props) {
        super(props);
        this.state = { new: true};
    }
    */
   // new way
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.setState({showFormReview: false})} />;
        }

        return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})} />
    }
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}
// 没有加 destroyOnUnmount: false 表示会dump所有的输入
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);