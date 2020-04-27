import React, { Component } from "react";

class SkillsDiv extends Component {
  render() {
    return (
      <div
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
    );
  }
}

export default SkillsDiv;
