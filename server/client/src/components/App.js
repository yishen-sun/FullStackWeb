import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; // call action creator
import * as actions from '../actions';


import Header from './Header'; // const Header = () => <h2>Header</h2>
import Landing from './Landing'; // const Landing = () => <h2>Landing</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    
    render() {
        return (
            <div className='container'>
                <BrowserRouter>
                <div>
                    <Header />
                    <Route path="/" exact={true} component={Landing} />
                    <Route path="/surveys" exact={true} component={Dashboard} />
                    <Route path="/surveys/new" exact={true} component={SurveyNew} />
                </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);