import React, { Component } from "react";
import loading from "../Assets/loadinggif.gif";

class Loading extends Component {
  render() {
    return (
      <div className="centerContent" style={{ height: "80vh" }}>
        <div className="verticalContent">
          <img alt="" src={loading} style={{ height: "40vh" }} />
          {/* <div className="headerText">Loading</div> */}
        </div>
      </div>
    );
  }
}

export default Loading;
