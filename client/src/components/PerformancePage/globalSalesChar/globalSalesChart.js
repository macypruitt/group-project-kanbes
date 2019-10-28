import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from 'react-router';
import mapStoreToProps from './../../../redux/mapStoreToProps';
import {
    Grid,
    Paper,
    AppBar,
    Tabs,
    Tab,
    Typography,
    Box
} from '@material-ui/core';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import KanbeTemplate from '../../KanbeTemplate/KanbeTemplate';
import BarChart from 'react-bar-chart';

const data = [
    { text: 'Jan',backgroundColor: '#60788f', value: 500 },
    { text: 'Feb', value: 300 },
    { text: 'March', value: 200 },
    { text: 'April', value: 600 },
    { text: 'May', value: 400 },
    { text: 'June', value: 300 }
];

const margin = { top: 20, right: 50, bottom: 30, left: 60 };

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'theme.palette.background.paper',
    },
});

class GlobalSalesChart extends Component {
    state = {
        width: 1000,
        value: 0,
        colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
    };

    componentDidMount = () => {
        window.onresize = () => {
            this.setState({
                width: this.refs.root.offsetWidth
            })
        }
    }



    handleChange = (event, newValue) => {
        this.setState({
            ...this.state,
            value: newValue
        })
    }


    handleBarClick = (element, id) => {
        console.log(`The bin ${element.text} with id ${id} was clicked`);
    }


    render() {
        const { classes, theme } = this.props;
        const scale = value => {
            return 'grey'
        }
        console.log(this.props.globalSales);

        return (
            <Grid container>


                <div className={classes.root}>

                    <AppBar position="static">
                        <Tabs value={this.value} onChange={this.handleChange} aria-label="simple tabs example">
                            <Tab label="Units Sold" {...a11yProps(0)} />
                            <Tab label="Prices" {...a11yProps(1)} />
                            <Tab label="Sales" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={this.state.value} index={0}>
                        <div ref='root'>
                            <div style={{ width: '100%' }}>
                                <BarChart
                                    // colorScale={'#60788f'}
                                    colors={this.state.colors}
                                    ylabel='# units sold'
                                    colorByLabel={false}
                                    width={this.state.width}
                                    height={500}
                                    margin={margin}
                                    data={data}
                                    // color={'grey'}
                                    onBarClick={this.handleBarClick} />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        Item Two
                </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                        Item Three
                </TabPanel>
                </div>
            </Grid>
        );
    }
}


GlobalSalesChart.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(withRouter(GlobalSalesChart))
);