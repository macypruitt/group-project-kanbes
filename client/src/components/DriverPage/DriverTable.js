import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import mapStoreToProps from '../../redux/mapStoreToProps';
// import  Fab  from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import DriverTableRow from './DriverTableRow';
import { Button } from '@material-ui/core';
import './DriverTable.css';
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

class DriverTable extends Component {
    state = {
        isAdding: this.props.isAdding || false,
        itemsToSubmit: [],
        showAlert: false
    };

    componentDidMount(){
        this.setState({
            ...this.state,
            isAdding: false,
        }, ()=> console.log('staaaaate', this.state))
    }

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

    clickSaveWithoutData = (event) => {
        this.setState({
            ...this.state,
            showAlert: true
        })
    }

    render() {
        
        const { classes, theme } = this.props;
        //this prevents error if driver reducer data is unavailable
        let driverDataForRender = this.props.dataForDriver || [];
        
        ////if reducer holds data, map it into rows of the table
        if (driverDataForRender.length > 0) {
            driverDataForRender = driverDataForRender.map((item, index) => {
                return <DriverTableRow key={index} item={item} />
            })
        }

        ////adds a new row that is ready to be edited

        return (
            <div>
                <div>
                    <Swal
                        show={this.state.showAlert}
                        title="ALERT!"
                        text="You did not fill out all inputs"
                        onConfirm={() => this.setState({ show: false })}
                    />
                </div>
                <div>
                    <table className="driver-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Sub-type</th>
                                <th>Supplier</th>
                                <th>Standard Par</th>
                                <th>Last Par</th>
                                <th>Sold</th>
                                <th>Shrink</th>
                                <th># Stocked</th>
                                <th>Notes</th>
                                <th>Last Modified</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {driverDataForRender}
                            { this.state.isAdding ? 
                                <DriverTableRow editable={true} addable={true} item={{}} 
                                    clickAddProduct={this.clickAddProduct} 
                                    clickSaveProductWithoutData={this.clickSaveWithoutData}
                                /> : null
                            }
                        </tbody>
                    </table>
                    <br />
                    { !this.state.isAdding ? 
                        <Button size="medium" className={this.props.classes.button}  onClick={this.clickAddProduct}>
                            <AddIcon/> Add Produce
                        </Button>
                     : <Button className={classes.buttonNegative} onClick={this.clickAddCancel}>Cancel</Button>
                    }
                </div>
            </div>
        );
    }
}

DriverTable.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(withRouter(DriverTable))
);
