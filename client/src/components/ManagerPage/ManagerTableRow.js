import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
class ManagerTableRow extends Component {
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
        });
    }

    handleChangeInputText(event, dataKey) {
        const fieldValue = event.target.value;
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                [dataKey]: fieldValue
            }
        });
        console.log(this.state);
    }

    clickSave = (event) => {
        this.setState({
            isEditable: !this.state.isEditable
        })
        console.log(this.state);
        ////WILL BE SENT TO DATABASE ONCE CONNECTED TO SERVER

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
        let origin = this.props.item.origin;
        let unit_sale_price = this.props.item.unit_sale_price;
        let expiration_date = this.props.item.expiration_date;
        let donated = this.props.item.donated;
        let count = this.props.item.count;
        let supplier_id = this.props.item.supplier_id;
        let pounds = this.props.item.pounds;
        let editOrSaveButton = <button onClick={this.clickEdit}>Edit</button>

        if (this.state.isEditable) {

            origin = <input
                type="text"
                className="row-input"
                placeholder={origin}
                onChange={(event) => this.handleChangeInputText(event, 'origin')}
            />
        
        unit_sale_price = <input
            type="text"
            className="row-input"
            placeholder={unit_sale_price}
            onChange={(event) => this.handleChangeInputText(event, 'unit_sale_price')}
        />

        expiration_date = <input
            type="text"
            className="row-input"
            placeholder={expiration_date}
            onChange={(event) => this.handleChangeInputText(event, 'last_par')}
        />
        donated = <input
            type="text"
            className="row-input"
            placeholder={donated}
            onChange={(event) => this.handleChangeInputText(event, 'sold')}
        />
        count= <input
            type="number"
            className="row-input"
            placeholder={count}
            onChange={(event) => this.handleChangeInputText(event, 'count')}
        />
        supplier_id= <input
            type="number"
            className="row-input"
            placeholder={supplier_id}
            onChange={(event) => this.handleChangeInputText(event, 'supplier_id')}
        />
        pounds= <input
            type="number"
            className="row-input"
            placeholder={pounds}
            onChange={(event) => this.handleChangeInputText(event, 'pounds')}
        />
        editOrSaveButton = <button data-id={this.props.item.id} 
        onClick={this.clickSave}>Save</button>
        }
        return (
            <div>
                <h2>{this.state.heading}</h2>

            <tr id={this.props.key}>
            <td>{origin}</td>
            <td>{unit_sale_price}</td>
            <td>{expiration_date}</td>
            <td>{donated}</td>
            <td>{count}</td>
            <td>{supplier_id}</td>
            <td>{pounds}</td>
            <td>{editOrSaveButton}</td>
        </tr>
        </div>

        );
    }
}

export default connect(mapStoreToProps)(ManagerTableRow);