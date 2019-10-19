import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class DriverTableRow extends Component {
    state = {
        isEditable: this.props.editable || false,
        isAddable: this.props.addable || false,
        item: {}
    };

    clickEdit = (event) => {
        this.setState({
            ...this.state,
            isEditable: !this.state.isEditable,
            item: this.props.item
        }, () => {
            console.log(this.state)
        })
    }

    handleChangeInputText(event, dataKey) {
        const fieldValue = event.target.value;
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                [dataKey]: fieldValue
            }
        })
        console.log(this.state);
    }

    clickSaveEntry = (event) => {
        this.setState({
            isEditable: !this.state.isEditable
        })
        console.log(this.state)
        ////WILL BE SENT TO DATABASE ONCE CONNECTED TO SERVER
        this.props.dispatch({ type: "ADD_OUTGOING_STORE", payload: this.state.item })
        // this.props.dispatch({ type: 'FETCH_STORE_INVENTORY', payload: id })
        // this.props.history.push(`/driver/${id}`);
    }

    clickAddEntry = (event) => {
        this.props.clickAddStore();
        this.setState({
            isEditable: !this.state.isEditable,
            isAddable: !this.state.isAddable
        })
        console.log(this.state)
        ////WILL BE POSTED TO DATABASE ONCE CONNECTED TO SERVER
    }

    render() {
        ////row data is passed to this component via props
        let product_name = this.props.item.product_name;
        let product_sub_type = this.props.item.product_sub_type;
        let standard_par = this.props.item.standard_par;
        let last_par = this.props.item.last_par;
        let sold = this.props.item.sold_product_count;
        let shrink = this.props.item.shrink_product_count;
        let notes = this.props.item.notes;
        let lastmodified = this.props.item.last_modified;
        let editOrSaveButton = <button onClick={this.clickEdit}>New Entry</button>;
        var today = new Date();
        var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        var time = "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        ////if Edit button is clicked, text inputs appear and Edit button becomes Save button
        if (this.state.isEditable) {
            // product_name = <input 
            //         className="row-input" 
            //         placeholder={product_name}
            //         onChange={(event) => this.handleChangeInputText(event, 'product_name')}
            //          />
            // product_sub_type = <input 

            //         className="row-input" 
            //         placeholder={product_sub_type}
            //         onChange={(event) => this.handleChangeInputText(event, 'product_sub_type')}
            //          />
            standard_par = <input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={standard_par}
                onChange={(event) => this.handleChangeInputText(event, 'standard_par')}
            />
            last_par = <input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={last_par}
                onChange={(event) => this.handleChangeInputText(event, 'last_par')}
            />
            sold = <input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                onChange={(event) => this.handleChangeInputText(event, 'sold_product_count')}
            />
            shrink = <input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                onChange={(event) => this.handleChangeInputText(event, 'shrink_product_count')}
            />
            notes = <input
                type="text"
                className="row-input"
                onChange={(event) => this.handleChangeInputText(event, 'notes')}
            />
            lastmodified = date + time
            editOrSaveButton = <button data-id={this.props.item.id} onClick={this.clickSaveEntry}>Save New Entry</button>
        }

        ////if 'Add Store' button is clicked, Edit changes to Add
        if (this.state.isAddable) {
            editOrSaveButton = <button data-id={this.props.item.id} onClick={this.clickAddEntry}>Add Entry</button>
            product_name = <input
                className="row-input"
                placeholder={product_name}
                onChange={(event) => this.handleChangeInputText(event, 'product_name')}
            />
            product_sub_type = <input

                className="row-input"
                placeholder={product_sub_type}
                onChange={(event) => this.handleChangeInputText(event, 'product_sub_type')}
            />
        }

        return (

                <tr id={this.props.key}>
                <td>{product_name}</td>
                <td>{product_sub_type}</td>
                <td>{standard_par}</td>
                <td>{last_par}</td>
                <td>{sold}</td>
                <td>{shrink}</td>
                <td>{notes}</td>
                <td>{lastmodified}</td>
                <td>{editOrSaveButton}</td>
            </tr>
        );
    }
}

export default connect(mapStoreToProps)(DriverTableRow);
