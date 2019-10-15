import React from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table';

export default function DriverView(){
    const [state, setState] =React.useState({
        columns: [
            {title: 'Product',field: 'product' },
            {title: 'type', field: 'type' },
            {title: 'Par', field: 'par'},
            {title: 'Last Par', field: 'lastPar' },
            {title: 'Sold', field: 'sold'},
            {title: 'Shrink', field: 'shrink'},
            {title: 'added', field: 'added'},
        ],
        data: [
            { product: 'Apple', 
              type: 'Granny Smith', 
              par: '12', 
              lastPar: '10', 
              sold: '5', 
              shrink: '3',
              added: '8'
            },
        ],
    });
    return (
        <MaterialTable
        title= "In Store Inventory"
        columns={state.columns}
        data={state.data}
        editable={{
            onRowAdd: newData =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                    const data = [...state.data];
                    data.push(newData);
                    setState({...state, data });
                }, 600);
            }),
            onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });
              }, 600);
            }),
            onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.splice(data.indexOf(oldData), 1);
                setState({ ...state, data });
              }, 600);
            }),
        }}
        />
    );
}









