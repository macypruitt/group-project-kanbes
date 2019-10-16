import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import StoreTableRow from './StoreTableRow';
import Swal from 'sweetalert2-react';


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


class StoreTable extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_STORES' })
    }

    state = {
        isAdding: false,
        orderIsEditable: false,
        show: false
    };

    clickAddStore = (event) => {
        this.setState({
            ...this.state,
            isAdding: !this.state.isAdding
        })
    }

    clickAddCancel = (event) => {
        this.setState({
            ...this.state,
            isAdding: false,
            orderIsEditable: false
        })
        this.props.dispatch({ type: 'UPDATE_DELIVERY_ORDER_STATE', payload: this.props.store.editDeliveryOrderStatus })
    }

    clickEditDeliveryOrder = (event) => {
        this.setState({
            orderIsEditable: !this.state.orderIsEditable
        })

        this.props.dispatch({ type: 'UPDATE_DELIVERY_ORDER_STATE', payload: this.props.store.editDeliveryOrderStatus })

        //check if delivery order array has duplicate values
        var values = this.props.store.deliveryOrderArray
        console.log(values)
        var valueArr = values.map(function(item){ return item.delivery_route_order });
        var isDuplicate = valueArr.some(function(item, idx){ 
            return valueArr.indexOf(item) != idx 
        });
        console.log(isDuplicate);
    }



    clickSaveDeliveryOrder = (event) => {
        this.setState({
            orderIsEditable: !this.state.orderIsEditable
        })
       
        //check if delivery order array has duplicate values
        var values = this.props.store.deliveryOrderArray
        console.log(values)
        var valueArr = values.map(function(item){ return parseFloat(item.delivery_route_order) });
        console.log(valueArr)
        var isDuplicate = valueArr.some(function(item, idx){ 
            return valueArr.indexOf(item) != idx 
        });
        console.log(isDuplicate);

        if(isDuplicate)
        this.setState({ show: true })

this.props.dispatch({ type: 'UPDATE_DELIVERY_ROUTES', payload: this.props.store.deliveryOrderArray })
        
    }

    render() {

        const { classes, theme } = this.props;
        const storesArray = this.props.store.stores

        let storeTableData = storesArray.map((item, index) => {
            return (

                <StoreTableRow
                    key={index}
                    item={item}
                />

            )
        })

        ////adds a new row when 'Add Store' button is clicked
        let newRow;
        if (this.state.isAdding) {
            const emptyItem = {}
            newRow = <StoreTableRow clickAddStore={this.clickAddStore} editable={true} addable={true} item={emptyItem} />
        }

        let editorSaveDeliveryButton = <Button className={classes.buttonPositive} onClick={this.clickEditDeliveryOrder}>Edit Delivery Order</Button>
        if (this.props.store.editDeliveryOrderStatus) {
            editorSaveDeliveryButton = <Button className={classes.buttonPositive} onClick={this.clickSaveDeliveryOrder}>Save New Delivery Order</Button>
        }

        return (
            <div>
                <table className="admin-table">
                    <tr>
                        <th>Delivery Order</th>
                        <th>Store name</th>
                        <th>Address</th>
                        <th>Active?</th>
                        <th>Store Contact Name</th>
                        <th>Store Contact Phone</th>
                        <th>Store Contact Email</th>
                        <th>Store Phone</th>
                        <th>Actions</th>
                    </tr>
                    {storeTableData}

                    {newRow}
                </table>
                {editorSaveDeliveryButton}
                <Button className={classes.buttonPositive} onClick={this.clickAddStore}>Add Store</Button>
                <Button className={classes.buttonNegative} onClick={this.clickAddCancel}>Cancel</Button>
                <Swal
                    show={this.state.show}
                    title="ALERT!"
                    text="You entered a duplicate delivery route order"
                    onConfirm={() => this.setState({ show: false })}
                />
            </div>
        );
    }
}


StoreTable.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(StoreTable)
);