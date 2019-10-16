import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class ManagerPage extends Component {
    state = {
        heading: 'Manager View',
        isEditable: this.props.editable || false,
        isAddable: this.props.addable || false,
        item: {}
    };

    clickEdit = (event) => {
        this.setState({
            ...this.state,
            isEditable: !this.state.isEditable,
            item: this.props.item
        }, ()=> {
            console.log(this.state)
        });
    }

    handleChangeInputText(event, dataKey){
        const fieldValue = event.target.value;
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                [dataKey]:fieldValue
            }
        });
        console.log(this.state);
    }

    clickSave = (event) => {
        this.setState({
            isEditable: !this.state.isEditable
        })
        console.log(this.state);
    }

    clickAdd = (event) => {
        this.props.clickAddStore();
this.setState({
    isEditable: !this.state.isEditable,
    isAddable: !this.state.isAddable

});
console.log(this.state)
    } 
    render() {
        return (
            <div>
                <h2>{this.state.heading}</h2>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(ManagerPage);
