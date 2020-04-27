import React, { Component } from "react";

class Layout extends Component {
  render() {
    return (
      <div className="row">
        <div className="layout col-12" style={{ ...this.props.style }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
