import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

class SkillsDiv extends Component {
  render() {
    return (
      <div>
        <div
          data-tip
          data-for={this.props.skillName}
          style={{
            borderColor: this.props.color,
            borderRadius: 25,
            backgroundColor: this.props.color,
            color: "#fcfcfc",
            padding: 10,
            maxWidth: "max-content",
            marginRight: 20,
            marginBottom: 15,
          }}
        >
          {this.props.skillName} - {this.props.skillFrequency}
        </div>
        <ReactTooltip id={this.props.skillName} aria-haspopup="true">
          <h5 style={{ color: "#0a74ec" }}>Companies</h5>
          {this.props.companyNames.split(",").map((name, index) => {
            return (
              <h5 style={{ color: "#c5c6c7" }}>
                {index}. {name}
              </h5>
            );
          })}
        </ReactTooltip>
      </div>
    );
  }
}

export default SkillsDiv;
