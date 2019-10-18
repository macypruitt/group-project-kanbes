import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Collapse from '@material-ui/core/Collapse';
import StoreIcon from '@material-ui/icons/Store';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { 
    createStyles,
    withStyles
} from "@material-ui/core";
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withRouter } from 'react-router';




const styles = (theme: Theme) => 
    createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  });

class NavAdmin extends Component {
    state = {
        expand: false,
        expandWarehouse: false
    }

    handleToggle = () => {
        this.setState({ expand: !this.state.expand })
    }

    handleToggleWarehouse = () => {
        this.setState({ expandWarehouse: !this.state.expandWarehouse })
    }

    moveToAdminPage = (event) => {
        this.props.history.push("/admin");
    }
   
    moveToInvoicePage = (event) => {
        this.props.history.push("/invoice");
    }
    
    moveToInventoryPage = (event) => {
        this.props.history.push("/inventory");
    }

    moveToPurchasePage = (event) => {
        this.props.history.push("/purchase");
    }

    moveToStorePage = (event) => {
        this.props.history.push("/store");
    }

    moveToSupplierPage = (event) => {
        this.props.history.push("/supplier");
    }

    moveToProducePage = (event) => {
        this.props.history.push("/produce");
    }
      
    render() {
        

        
        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={this.props.classes.root}
            >
                <ListItem button onClick={this.handleToggle}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Performance" />
                    {this.state.expand ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                    <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button onClick={this.moveToStorePage} className={this.props.classes.nested}>
                            <ListItemIcon>
                            <StoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="Store" />
                        </ListItem>
                        <ListItem button onClick={this.moveToSupplierPage} className={this.props.classes.nested}>
                            <ListItemIcon>
                            <SupervisorAccountIcon />
                            </ListItemIcon>
                            <ListItemText primary="Supplier" />
                        </ListItem>
                        <ListItem button onClick={this.moveToProducePage} className={this.props.classes.nested}>
                            <ListItemIcon>
                            <ListAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Produce" />
                        </ListItem>
                        </List>
                    </Collapse>
                <ListItem button onClick={this.moveToAdminPage}>
                <ListItemIcon>
                    <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
                </ListItem>
                <ListItem button onClick={this.handleToggleWarehouse}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Warehouse" />
                {this.state.expandWarehouse ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.expandWarehouse} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button onClick={this.moveToInventoryPage} className={this.props.classes.nested}>
                            <ListItemIcon>
                            <StoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inventory" />
                        </ListItem>
                        <ListItem button onClick={this.moveToPurchasePage} className={this.props.classes.nested}>
                            <ListItemIcon>
                            <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Purchases" />
                        </ListItem>
                        </List>
                    </Collapse>
                <ListItem button onClick={this.moveToInvoicePage}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Invoices" />
                </ListItem>

            </List>

        )
    }
}

export default connect(mapStoreToProps) (withStyles(styles)(withRouter(NavAdmin)));
