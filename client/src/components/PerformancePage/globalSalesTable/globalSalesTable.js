import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
// import { CSVLink } from "react-csv";
import "./globalSalesTable.css";
import { Button, Grid, Pagination } from "@material-ui/core/";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withRouter } from 'react-router';

function desc(a, b, orderBy) {
    if (parseFloat(b[orderBy]) < parseFloat(a[orderBy])) {
        return -1;
    }
    if (parseFloat(b[orderBy]) > parseFloat(a[orderBy])) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort
    } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map(headCell => (
                    <TableCell
                        key={headCell.field}
                        align="left"
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.field ? order : false}
                        style={{ minWidth: 10, padding: 5 }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.field}
                            direction={order}
                            onClick={createSortHandler(headCell.field)}
                        >
                            {headCell.title}
                            {orderBy === headCell.field ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.secondary.main
                // backgroundColor: this.lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark
            },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: "0 0 auto"
    }
}));

let csvData = [];

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                    Units Sold, Avg Price and Total Sales by Store
                </Typography>
            </div>
            <div className={classes.spacer} />
            {/* <Button id="csvButton" variant="contained" color="primary">
        <CSVLink data={csvData}>Export to CSV</CSVLink>
      </Button> */}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        padding: 5
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: "100%"
    },
    tableWrapper: {
        overflowX: "auto",
        padding: 5
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
});

const columns = [
    {
        title: "Store Name",
        field: "Store Name",
        align: "left",
        // format: value => parseFloat(value).toFixed(4),
        numeric: true
    },
    {
        title: "Store Address",
        field: "Store Address",
        align: "left",
        // format: value => parseFloat(value).toFixed(4),
        numeric: true
    },
    { title: "Units Sold", field: "Units Sold", numeric: false },
    {
        title: "Avg Price",
        field: "Avg Price",
        // format: value => parseFloat(value * 100).toFixed(2),
        numeric: true
    },
    {
        title: "Total Sales",
        field: "Total Sales",
        // format: value => (value * 100).toFixed(2) + "%",
        numeric: true
    }

];

class storeTable extends Component {

    columns = [
        {
            title: "Store Name",
            field: "Store Name",
            align: "left",
            // format: value => parseFloat(value).toFixed(4),
            numeric: true
        },
        {
            title: "Store Address",
            field: "Store Address",
            align: "left",
            // format: value => parseFloat(value).toFixed(4),
            numeric: true
        },
        { title: "Units Sold", field: "Units Sold", numeric: false },
        {
            title: "Avg Price",
            field: "Avg Price",
            // format: value => parseFloat(value * 100).toFixed(2),
            numeric: true
        },
        {
            title: "Total Sales",
            field: "Total Sales",
            // format: value => (value * 100).toFixed(2) + "%",
            numeric: true
        }
    ];

    state = {
        page: 0,
        rowsPerPage: 50,
        order: "desc",
        orderBy: "Store Name"
    };

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({
            page: 0,
            rowsPerPage: +event.target.value
        });
    };

    handleRequestSort = (event, property) => {
        const isDesc =
            this.state.orderBy === property
            && this.state.order === "desc";
        this.setState({
            order: isDesc ? "asc" : "desc",
            orderBy: property
        });
    };

    render() {
        const { classes, theme } = this.props;

        let data = this.props.globalSales;

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

        console.log(reducedChartArray)

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



        const emptyRows =
            this.state.rowsPerPage -
            Math.min(
                this.state.rowsPerPage,
                csvData.length - this.state.page * this.state.rowsPerPage
            );

        return (
            <div>
                <div className="tableHolder">
                    <Grid container>
                        <Grid item xs={12} justify="flex-end" container spacing={0}>
                            <Paper className={classes.root}>
                                <EnhancedTableToolbar />
                                <div className={classes.tableWrapper}>
                                    <Table stickyHeader aria-labelledby="tableTitle">
                                        <EnhancedTableHead
                                            classes={classes}
                                            order={this.state.order}
                                            orderBy={this.state.orderBy}
                                            onRequestSort={this.handleRequestSort}
                                            rowCount={csvData.length}
                                        />
                                        <TableBody>
                                            {
                                                stableSort(
                                                    data,
                                                    getSorting(this.state.order, this.state.orderBy)
                                                )
                                                    //   {csvData
                                                    .slice(
                                                        this.state.page * this.state.rowsPerPage,
                                                        this.state.page * this.state.rowsPerPage +
                                                        this.state.rowsPerPage
                                                    )
                                                    .map(row => {
                                                        return (
                                                            <TableRow
                                                                hover
                                                                role="checkbox"
                                                                tabIndex={-1}
                                                                key={row.Market}
                                                                style={{ minWidth: 10, padding: 5 }}
                                                            >
                                                                {this.columns.map(column => {
                                                                    const value = row[column.field];
                                                                    return (
                                                                        <TableCell
                                                                            key={column.title}
                                                                            align="left"
                                                                            style={{ minWidth: 10, padding: 5 }}
                                                                        >
                                                                            {column.format
                                                                                ? // && typeof value === "number"
                                                                                column.format(value)
                                                                                : value}
                                                                            {/* {value} */}
                                                                        </TableCell>
                                                                    );
                                                                })}
                                                            </TableRow>
                                                        );
                                                    })}
                                        </TableBody>
                                    </Table>
                                </div>
                                <TablePagination
                                    rowsPerPageOptions={[50, 100]}
                                    component="div"
                                    count={csvData.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    backIconButtonProps={{
                                        "aria-label": "previous page"
                                    }}
                                    nextIconButtonProps={{
                                        "aria-label": "next page"
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

storeTable.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(
    withStyles(styles, { withTheme: true })(storeTable)
);
