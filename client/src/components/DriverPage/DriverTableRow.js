import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class DriverTableRow extends Component {
    state = {
        heading: 'Class Component',
    };

    
    render() {
        return (
            <div>
                <tr>
                    <td>ka</td>
                </tr>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DriverTableRow);
