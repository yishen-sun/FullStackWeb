import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
        <h1 className="header center orange-text">Surveys & Feedback!</h1>
        <div className="row center">
            <h5 className="header col s12 light">A easy way to distribute online surveys and analyse feedback</h5>
        </div>
        <div className="left">
        <h6 className="row">Instructions:</h6>
        <ol>
            <li>click "Login with Google" to register</li>
            <li>sending one survey will consume one credit</li>
            <li>click "ADD CREDITS" to pay with credit card (please use a fake card number for testing) </li>
            <li>click "GET STARTED" to design surveys and send emails at scale</li>
        </ol>
        </div>
        <div className="row center">
            <Link to="/surveys" id="download-button" className="btn-large waves-effect waves-light orange">
                Get Started
            </Link>
            
        </div>
        </div>
    )
}

export default Landing;