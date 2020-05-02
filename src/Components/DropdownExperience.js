import React, { Component } from "react";
import "../Styles/styles.css";

class DropdownExperience extends Component {
  render() {
    return (
      <div>
        <select
          className="textInput"
          value={this.props.value}
          onChange={this.props.handleChangeSelect}
          id={this.props.ID}
          style={{ display: "block", backgroundColor: "#0b0c10", padding: 0 }}
        >
          <option value="any">Any</option>
          <option value="1">Internship</option>
          <option value="2">Entry Level</option>
          <option value="3">Associate</option>
          <option value="4">Mid-Senior Level</option>
          <option value="5">Director</option>
          <option value="6">Executive</option>
        </select>
      </div>
    );
  }
}

export default DropdownExperience;
