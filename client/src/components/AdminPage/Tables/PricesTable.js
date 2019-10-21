import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import PricesTableRow from './PricesTableRow';


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
        priceIsEditable: false,
        show: false
    };

    clickEditPrice = (event) => {
        this.setState({
            ...this.state,
            isAdding: !this.state.isAdding
        })
    }

    // clickAddCancel = (event) => {
    //     this.setState({
    //         ...this.state,
    //         isAdding: false,
    //         priceIsEditable: false
    //     })
    //     this.props.dispatch({ type: 'UPDATE_PRICES_STATE', payload: this.props.store.editDeliveryOrderStatus })
    // }

    


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
        if (this.state.isAdding) {
            const emptyItem = {}
            newRow = <PricesTableRow clickEditPrice={this.clickEditPrice} editable={true} addable={true} item={emptyItem} />
        }

        return (
            <div>
                <table className="admin-table">
                    <tr>
                        <th>Product Name</th>
                        <th>Product Sub-Type</th>
                        <th>Price-Per-Unit</th>
                        <th>Actions</th>
                    </tr>
                    {priceTableData}

                    {newRow}
                </table>
                <Button className={classes.buttonPositive} onClick={this.clickAddUser}>Add Product</Button>
                <Button className={classes.buttonNegative} onClick={this.clickAddCancel}>Cancel</Button>
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