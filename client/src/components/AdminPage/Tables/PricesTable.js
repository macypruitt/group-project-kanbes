import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import PricesTableRow from './PricesTableRow';
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


class PricesTable extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PRICES' })
    }

    state = {
        isAdding: false,
        show: false
    };

    clickAddProduct = (event) => {
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
        const pricesArray = this.props.store.prices

        let priceTableData = pricesArray.map((item, index) => {
            return (

                <PricesTableRow
                    key={index}
                    item={item}
                />

            )
        })

        ////adds a new row when 'Add Product' button is clicked
        let newRow;
        let addOrCancelButton = <Button className={classes.buttonPositive} onClick={this.clickAddProduct}>Add Product</Button>
        if (this.state.isAdding) {
            const emptyItem = {}
            newRow = <PricesTableRow clickAddProduct={this.clickAddProduct} editable={true} addable={true} item={emptyItem} />
            addOrCancelButton = <Button className={classes.buttonNegative} onClick={this.clickAddCancel}>Cancel</Button>
        }

        let priceColumnWidth = columnWidthFinder(5);
        console.log( "priceColumnWidth: ", priceColumnWidth);
        
        return (
            <div className="tableFixedHead">
                {/* First table generates the table head */}
                <div className="tableFixedHead-hd">
                <table className="baseTable">
                    <thead>
                    <tr>
                        <th className="product-col-width">Product Name</th>
                        <th className="product-col-width">Product Sub-Type</th>
                        <th className="product-col-width">Price-Per-Unit</th>
                        <th className="product-col-width">On shelf</th>
                        <th className="product-col-width">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {priceTableData}
                        {newRow}
                    </tbody>
                </table>
                </div>
                {/* Second table generates the table body */}
                <div  className="tableFixedHead-scroll">
                <table className="baseTable">
                    <thead>
                    <tr>
                        <th className="product-col-width">Product Name</th>
                        <th className="product-col-width">Product Sub-Type</th>
                        <th className="product-col-width">Price-Per-Unit</th>
                        <th className="product-col-width">Active Product?</th>
                        <th className="product-col-width">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {priceTableData}
                        {newRow}
                    </tbody>
                </table>
                </div>








                {addOrCancelButton}
            </div>
        );
    }
}


PricesTable.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(PricesTable)
);