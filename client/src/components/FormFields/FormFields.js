import React, { Component } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { Done, Clear } from "@material-ui/icons";

import "./FormFields.css";

class FormFields extends Component {
  state = {
    status: false
  };

  handleChangeInputText = (event, fieldIdent) => {
    this.setState({
      [fieldIdent]: event.target.value
    });
  };

  render() {
    const iconStylesCheck = {
      color: "green"
    };
    const iconStylesX = {
      color: "red"
    };

    return (
      <FormControl>
        <div>
          <InputLabel htmlFor="status-select">Status</InputLabel>
          <Select
            className="iconDropdown"
            onChange={event => this.handleChangeInputText(event, "status")}
            value={this.state.status}
            inputProps={{
              name: "status",
              id: "status-select"
            }}
          >
            <MenuItem value={true}>
              <Done style={iconStylesCheck} />
            </MenuItem>
            <MenuItem value={false}>
              <Clear style={iconStylesX} />
            </MenuItem>
          </Select>
        </div>
      </FormControl>
    );
  }
}

export default FormFields;
