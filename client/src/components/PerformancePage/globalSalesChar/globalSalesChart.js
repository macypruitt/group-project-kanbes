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
import { Chart } from "react-google-charts";

const productCountChartOptions = {
    chart: {
        title: 'Units of Produce Sold',
        subtitle: 'Monthly',
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

const pricesChartOptions = {
    chart: {
        title: 'Avg Product Prices',
        subtitle: 'Monthly',
    },
    chartArea: { width: '100%' },
    colors: ['#60788f'],
    hAxis: {
        title: 'Month'
    },
    vAxis: {
        title: 'Avg Sale Price',
        minValue: 0,
    },
    legend: {
        position: "none"
    }
}

const salesChartOptions = {
    chart: {
        title: 'Total Sales',
        subtitle: 'Monthly',
    },
    chartArea: { width: '100%' },
    colors: ['#60788f'],
    hAxis: {
        title: 'Month'
    },
    vAxis: {
        title: 'Sales',
        minValue: 0,
    },
    legend: {
        position: "none"
    }
}

const comboChartOptions = {
    chart: {
        title: 'Avg Product Prices',
        subtitle: 'Monthly',
    },
    chartArea: { width: '100%' },
    colors: ['#60788f'],
    hAxis: {
        title: 'Month'
    },
    vAxis: {
        title: 'Avg Sale Price',
        minValue: 0,
    },
    legend: {
        position: "none"
    },
    seriesType: 'bars',
    series: { 2: { type: 'line' } },
}


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

        let globalSalesArray = [];
        let chartArray = [];
        globalSalesArray = this.props.globalSales;

        if (globalSalesArray.length > 0) {
            for (let i = 0; i < globalSalesArray.length; i++) {
                let month = '';
                switch (parseFloat(((globalSalesArray[i].last_modified).split("-"))[1])) {
                    case 1:
                        month = 'Jan';
                        break;
                    case 2:
                        month = 'Feb';
                        break;
                    case 3:
                        month = 'March';
                        break;
                    case 4:
                        month = 'April';
                        break;
                    case 5:
                        month = 'May';
                        break;
                    case 6:
                        month = 'June';
                        break;
                    case 7:
                        month = 'July';
                        break;
                    case 8:
                        month = 'Aug';
                        break;
                    case 9:
                        month = 'Sept';
                        break;
                    case 10:
                        month = 'Oct';
                        break;
                    case 11:
                        month = 'Nov';
                        break;
                    case 12:
                        month = 'Dec';
                        break;

                }
                chartArray.push({ mth: month, productCount: globalSalesArray[i].sold_product_count, totalSales: globalSalesArray[i]["Total Sales"] })
            }
        }
        let reducedChartArray = [];
        //sum product count by distinct month
        chartArray.reduce(function (res, value) {
            if (!res[value.mth]) {
                res[value.mth] = { mth: value.mth, "Total Product Count": 0, "Total Sales": 0 };
                reducedChartArray.push(res[value.mth])
            }
            res[value.mth]["Total Product Count"] = parseInt(res[value.mth]["Total Product Count"]) + parseInt(value.productCount);
            res[value.mth]["Total Sales"] = parseFloat(res[value.mth]["Total Sales"]) + parseFloat(value.totalSales);

            return res;
        }, {});


        let productCountChartData = [
            ["Month", "Units of Produce"],
        ]

        let pricesChartData = [
            ["Month", "Avg Sale Price"],
        ]

        let salesChartData = [
            ["Month", "Total Sales"],
        ]

        let comboChartData = [
            ["Month", "Units of Produce", "Avg Sale Price"],
        ]

        for(let i=0; i<reducedChartArray.length; i++){
            productCountChartData.push([reducedChartArray[i].mth, reducedChartArray[i]["Total Product Count"]])
            pricesChartData.push([reducedChartArray[i].mth, (reducedChartArray[i]["Total Sales"]/reducedChartArray[i]["Total Product Count"])])
            comboChartData.push([reducedChartArray[i].mth, reducedChartArray[i]["Total Product Count"], (reducedChartArray[i]["Total Sales"]/reducedChartArray[i]["Total Product Count"])])
            salesChartData.push([reducedChartArray[i].mth, reducedChartArray[i]["Total Sales"]])
        }


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
                                    data={productCountChartData}
                                    options={productCountChartOptions}
                                    width="100%"
                                    height="400px"
                                    // legendToggle
                                    chartEvents={chartEvents}
                                />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                    <div ref='root'>
                            <div style={{ width: '100%' }}>
                                <Chart
                                    chartType="Bar"
                                    data={pricesChartData}
                                    options={pricesChartOptions}
                                    width="100%"
                                    height="400px"
                                    // legendToggle
                                    chartEvents={chartEvents}
                                />
                            </div>
                        </div>
                </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                    <div ref='root'>
                            <div style={{ width: '100%' }}>
                                <Chart
                                    chartType="Bar"
                                    data={salesChartData}
                                    options={salesChartOptions}
                                    width="100%"
                                    height="400px"
                                    // legendToggle
                                    chartEvents={chartEvents}
                                />
                            </div>
                        </div>
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