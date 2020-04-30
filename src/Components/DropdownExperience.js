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
          <option value="experience-1">Internship</option>
          <option value="experience-2">Entry Level</option>
          <option value="experience-3">Associate</option>
          <option value="experience-4">Mid-Senior Level</option>
          <option value="experience-5">Director</option>
          <option value="experience-6">Executive</option>
        </select>
      </div>
    );
  }
}

export default DropdownExperience;
