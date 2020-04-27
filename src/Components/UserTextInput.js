import React, { Component } from "react";
import "../Styles/styles.css";

class UserTextInput extends Component {
  render() {
    return (
      <div>
        <input
          id={this.props.ID}
          className="textInput"
          value={this.props.inputValue}
          placeholder={this.props.placeholder}
          onChange={this.props.changeText}
        />
      </div>
    );
  }
}

export default UserTextInput;
