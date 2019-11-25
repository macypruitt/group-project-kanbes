import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import { Chart } from "react-google-charts";
import mapStoreToProps from './../../../redux/mapStoreToProps';


const styles = theme => ({
  root: {
    color: "rgb(56, 56, 56)",
  fontSize: "18",
  borderBottom: "3px solid #F18A00",
  marginBottom: "20",
  display: "inline-block",
  fontWeight: "bolder",
  },
});

class GlobalSalesChart2 extends Component {
    componentDidMount() {
        // Load the Visualization API and the corechart package.
        window.google.charts.load("current", { packages: ["corechart"] });
        // Set a callback to run when the Google Visualization API is loaded.
        window.google.charts.setOnLoadCallback(this.drawChart);
      }
    
      drawChart = () => {
    
        var globalSalesData = new window.google.visualization.arrayToDataTable([
            ['Move', 'Percentage'],
            ["King's pawn (e4)", 44],
            ["Queen's pawn (d4)", 31],
            ["Knight to King 3 (Nf3)", 12],
            ["Queen's bishop pawn (c4)", 10],
            ['Other', 3]
          ]);
    
          const globalSalesOptions={
            title: 'Units of Produce Sold Over Time',
            chartArea: { width: '100%' },
            colors: ['#b0120a', '#ffab91'],
            hAxis: {
              title: 'Month',
              minValue: 0,
            },
            vAxis: {
                title: 'Units of Produce',
            },
            legend: "none"
          }
    
        var all_charts = [];
    
        function initChart(chart, data, options) {
          all_charts.push({ chart: chart, data: data, options: options });
          chart.draw(data, options);
        }
    
        var globalSalesChart = new window.google.visualization.ColumnChart(
          document.getElementById("globalSalesChart")
        );
        initChart(globalSalesChart, globalSalesData, globalSalesOptions);
       
      };

  render() {

    const { classes, theme } = this.props;
    
    return (
      <div>
        <div className="newLeasesContainer container-fluid">
          <Typography className={classes.root}>
            New Leases - Rolling 12 Months
          </Typography>
        </div>

        <Paper className="newLeasesWrapper">
          <div id="globalSalesChart"></div>
        </Paper>
      </div>
    );
  }
}



export default (
  connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(GlobalSalesChart2)
  )
);
