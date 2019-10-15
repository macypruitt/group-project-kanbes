
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2-react'
import mapStoreToProps from '../../redux/mapStoreToProps';

class DriverViewModal extends Component {
    state = {
      show: 'Content Saved'
    };
    

render() {

    return (
        <div>
<button onClick={() => this.setState({ show: true })}>Alert</button>
      <Swal
        show={this.state.show}
        title="Demo"
        text="SweetAlert in React"
        onConfirm={() => this.setState({ show: false })}
      />


        </div>
    );
}
}

export default connect(mapStoreToProps)(DriverViewModal);
