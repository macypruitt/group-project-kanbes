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
import { CSVLink } from "react-csv";
import "./globalSalesTable.css";
import { Button, Grid, Pagination } from "@material-ui/core/";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withRouter } from 'react-router';

function desc(a, b, orderBy) {
    if(orderBy === "storeName" || orderBy === "storeAddress"){
     if ((b[orderBy]) < (a[orderBy])) {
       return -1;
     }
     if ((b[orderBy]) > (a[orderBy])) {
       return 1;
     }
     return 0;
    } else {
     if (parseFloat(b[orderBy]) < parseFloat(a[orderBy])) {
       return -1;
     }
     if (parseFloat(b[orderBy]) > parseFloat(a[orderBy])) {
       return 1;
     }
     return 0;
   }
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
            {/* <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                    Units Sold, Avg Price and Total Sales by Store
                </Typography>
            </div> */}
            <div className={classes.spacer} />
            <Button id="csvButton" variant="contained" color="primary">
        {/* <CSVLink data={globalSalesArray}>Export to CSV</CSVLink> */}
      </Button>
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
        field: "storeName",
        align: "left",
        numeric: true
    },
    {
        title: "Store Address",
        field: "storeAddress",
        align: "left",
        numeric: true
    },
    { title: "Units Sold",
     field: "Total Product Count", numeric: false },
    {
        title: "Avg Price per Unit Sold",
        field: "Avg Price",
        format: value => "$"+(value.toFixed(2)),
        numeric: true
    },
    {
        title: "Total Sales",
        field: "Total Sales",
        format: value => "$"+(value.toFixed(2)),
        numeric: true
    }

];

class storeTable extends Component {

    columns = [
        {
            title: "Store Name",
            field: "storeName",
            align: "left",
            numeric: true
        },
        {
            title: "Store Address",
            field: "storeAddress",
            align: "left",
            numeric: true
        },
        { title: "Units Sold",
         field: "Total Product Count", numeric: false },
        {
            title: "Avg Price per Unit Sold",
            field: "Avg Price",
            format: value => "$"+(value.toFixed(2)),
            numeric: true
        },
        {
            title: "Total Sales",
            field: "Total Sales",
            format: value => "$"+(value.toFixed(2)),
            numeric: true
        }
    ];

    state = {
        page: 0,
        rowsPerPage: 15,
        order: "asc",
        orderBy: "storeName"
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

        let globalSalesArray = [];
        let tableArray = [];
        globalSalesArray = this.props.globalSales;

        if (globalSalesArray.length > 0) {
            for (let i = 0; i < globalSalesArray.length; i++) {
                
                tableArray.push({ storeId: globalSalesArray[i].store_id, storeName: globalSalesArray[i].store_name, storeAddress: globalSalesArray[i].store_address, productCount: globalSalesArray[i].sold_product_count, totalSales: globalSalesArray[i]["Total Sales"] })
            }
        }
        let reducedTableArray = [];
        tableArray.reduce(function (res, value) {
            if (!res[value.storeId]) {
                res[value.storeId] = { storeId: value.storeId, storeName: value.storeName, storeAddress: value.storeAddress, "Total Product Count": 0, "Total Sales": 0, "Avg Price": 0};
                reducedTableArray.push(res[value.storeId])
            }
            res[value.storeId]["Total Product Count"] = parseInt(res[value.storeId]["Total Product Count"]) + parseInt(value.productCount);
            res[value.storeId]["Total Sales"] = parseFloat(res[value.storeId]["Total Sales"]) + parseFloat(value.totalSales);
            res[value.storeId]["Avg Price"] = (res[value.storeId]["Total Sales"])/(res[value.storeId]["Total Product Count"]);

            return res;
        }, {});

        console.log(reducedTableArray)

        const emptyRows =
            this.state.rowsPerPage -
            Math.min(
                this.state.rowsPerPage,
                reducedTableArray.length - this.state.page * this.state.rowsPerPage
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
                                                    reducedTableArray,
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
                                    rowsPerPageOptions={[15, 30]}
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
