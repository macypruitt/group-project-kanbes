import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SupplierTableRow from './SupplierTableRow';
import { Button } from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
    buttonPositive: {
        margin: 2,
        color: 'blue'
        //   backgroundColor: 'whitesmoke'
    },
    buttonNegative: {
        margin: 2,
        color: 'red'
        //   backgroundColor: 'whitesmoke'
    },
    input: {
        display: 'none',
    }
});

class SupplierTable extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_SUPPLIERS' })
    }

    state = {
        isAdding: false
    };

    clickAddSupplier = (event) => {
        this.setState({
            ...this.state,
            isAdding: !this.state.isAdding
        })
    }

    clickAddCancel = (event) => {
        this.setState({
            ...this.state,
            isAdding: false
        })
    }

    render() {
        const { classes, theme } = this.props;
        const suppliersArray = this.props.store.suppliers

        let supplierTableData = suppliersArray.map((item, index) => {
            return (
                <SupplierTableRow 
                    key={index} 
                    item={item} />
            )
        })

        ////a new row is added when 'Add Supplier' button is clicked
        let newRow;
        if(this.state.isAdding){
            const emptyItem = {}
            newRow = <SupplierTableRow clickAddSupplier={this.clickAddSupplier} editable={true} addable={true} item={emptyItem} />
        }

        return (
            <div>
                <table className="admin-table">
                    <tr>
                        <th>Name</th>
                        <th>Contact name</th>
                        <th>Contact #</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {supplierTableData}

                    {newRow}
                </table>
                <Button className={classes.buttonPositive} onClick={this.clickAddSupplier}>Add Supplier</Button>
                <Button className={classes.buttonNegative} onClick={this.clickAddCancel}>Cancel</Button>
            </div>
        );
    }
}

SupplierTable.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(SupplierTable)
);
