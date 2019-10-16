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

class NavDriver extends Component {
    state = {
        expand: false,
        
    }

    handleToggle = () => {
        this.setState({ expand: !this.state.expand })
    }

   

    moveToDriverPage = (event) => {
        this.props.history.push("/driver");
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
                        <StoreIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delivery" />
                    {this.state.expand ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                    <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button onClick={this.moveTo} className={this.props.classes.nested}>
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
                
            </List>

        )
    }
}

export default connect(mapStoreToProps) (withStyles(styles)(withRouter(NavDriver)));
