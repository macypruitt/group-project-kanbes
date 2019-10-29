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
import { Chart } from "react-google-charts";

// const styles = theme => ({
//     root: {
//         color: 'blue'
//     }
// )}

const options={
    chart: {
        title: 'Units of Produce Sold',
        subtitle: 'Monthly - 2019',
      },
    chartArea: { width: '100%' },
    colors: ['#60788f'],
    hAxis: {
      title: 'Month'
    },
    vAxis: {
        title: 'Units of Produce',
        minValue: 0,
    },
    legend: {
        position: "none"
  }
}

const data = [
    ["Month", "Units of Produce"],
    ['Jan', 12],
    ['Feb', 5.5],
    ['March', 14],
    ['April', 5],
    ['May', 3.5],
    ['June', 7]
];

const chartEvents = [
    {
      eventName: "select",
      callback({ chartWrapper }) {
        console.log("Selected ", chartWrapper.getChart().getSelection());
      }
    }
  ];

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
        value: 0    
    };

    componentDidMount = () => {
        window.onresize = () => {
            this.setState({
                width: this.refs.root.offsetWidth
            })
        }
    }


    handleChange = (event, newValue) => {
        console.log(newValue)
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
                        <Tabs value={this.state.value} 
                            onChange={this.handleChange} 
                            aria-label="simple tabs example"
                            // indicatorColor='white'
                            >
                            <Tab label="Units Sold" {...a11yProps(0)} />
                            <Tab label="Prices" {...a11yProps(1)} />
                            <Tab label="Sales" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={this.state.value} index={0}>
                        <div ref='root'>
                            <div style={{ width: '100%' }}>
                                <Chart
                                    chartType="Bar"
                                    data={data}
                                    options={options}
                                    width="100%"
                                    height="400px"
                                    // legendToggle
                                    chartEvents={chartEvents}
                                />
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