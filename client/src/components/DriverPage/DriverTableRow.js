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
        }, ()=>{
            console.log(this.state)
        })
    }

    handleChangeInputText(event, dataKey) {
        const fieldValue = event.target.value;
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                [dataKey]:fieldValue}
        })
        console.log(this.state);
    }

    clickSave = (event) => {
        this.setState({
            isEditable: !this.state.isEditable
        })
        console.log(this.state)
        ////WILL BE SENT TO DATABASE ONCE CONNECTED TO SERVER
    }

    clickAdd = (event) => {
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
        let sold;
        let shrink;
        let notes;
        let editOrSaveButton = <button onClick={this.clickEdit}>Edit</button>;

        ////if Edit button is clicked, text inputs appear and Edit button becomes Save button
        if(this.state.isEditable){
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
                    onChange={(event) => this.handleChangeInputText(event, 'sold')}
                     />
            shrink = <input 
                    type="tel"
                    pattern="[0-9]*"
                    className="row-input" 
                    onChange={(event) => this.handleChangeInputText(event, 'shrink')}
                     />
            notes = <input 
                    type="text"
                    className="row-input" 
                    onChange={(event) => this.handleChangeInputText(event, 'notes')}
                     />
            editOrSaveButton = <button data-id={this.props.item.id} onClick={this.clickSave}>Save</button>
        }

         ////if 'Add Store' button is clicked, Edit changes to Add
         if(this.state.isAddable){
            editOrSaveButton = <button data-id={this.props.item.id} onClick={this.clickAdd}>Add</button>
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
                    <td>{editOrSaveButton}</td>
                </tr>
        );
    }
}

export default connect(mapStoreToProps)(DriverTableRow);
