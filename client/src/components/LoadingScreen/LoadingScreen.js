import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './LoadingScreen.css'
import vegbounce from './vegbounce.gif';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace 
// the component name TemplateClass with the name for the new 
// component.
class LoadingScreen extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {
        return (
            <div className="loading-container">
                <img className = "loading-fruit" src={vegbounce}/>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(LoadingScreen);
