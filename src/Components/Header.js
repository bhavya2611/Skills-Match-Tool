import React, { Component } from "react";
import match from "../Assets/match.png";

class Header extends Component {
  render() {
    return (
      <div className="col-12" style={{ height: "20vh" }}>
        <h2 className="pageHeader">
          <img alt="" src={match} style={{ height: 70, marginRight: 20 }} />
          Skill-Nalysis
        </h2>
      </div>
    );
  }
}

export default Header;
