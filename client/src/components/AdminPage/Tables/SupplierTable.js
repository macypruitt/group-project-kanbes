import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SupplierTableRow from './SupplierTableRow';
import { Button } from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import columnWidthFinder from './columnWidthFinder';

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
        let addOrCancelButton = <Button className={classes.buttonPositive} onClick={this.clickAddSupplier}>Add Supplier</Button>
        if(this.state.isAdding){
            const emptyItem = {}
            newRow = <SupplierTableRow clickAddSupplier={this.clickAddSupplier} editable={true} addable={true} item={emptyItem} />
            addOrCancelButton = <Button className={classes.buttonNegative} onClick={this.clickAddCancel}>Cancel</Button>
        }

        return (
            <div className="tableFixedHead">
                {/* First table generates the table head */}
                <div className="tableFixedHead-hd">
                    <table className="baseTable">
                        <thead>
                            <tr>
                                <th className="five-col-width">Name</th>
                                <th className="five-col-width">Contact name</th>
                                <th className="five-col-width">Contact #</th>
                                <th className="five-col-width">Address</th>
                                <th className="five-col-width">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supplierTableData}
                            {newRow}
                        </tbody>
                    </table>
                </div>
                {/* Second table generates the table body */}
                <div className="tableFixedHead-scroll">
                <table className="baseTable">
                    <thead>
                        <tr>
                            <th className="five-col-width">Name</th>
                            <th className="five-col-width">Contact name</th>
                            <th className="five-col-width">Contact #</th>
                            <th className="five-col-width">Address</th>
                            <th className="five-col-width">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplierTableData}
                        {newRow}
                    </tbody>
                </table>
                </div>

                {addOrCancelButton}
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
