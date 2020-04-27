import React, { Component } from "react";
import Layout from "../Components/Layout";
import event from "../Assets/event.png";

class SplashScreen extends Component {
  render() {
    console.log();
    return (
      <Layout>
        <div className="centerContent" style={{ height: "100vh" }}>
          <div className="verticalContent">
            <img alt="" src={event} style={{ height: "40vh" }} />
            <div className="headerText">CLOUD SCHEDULER</div>
            <div
              className="linkText"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.history.push("/Schedule")}
            >
              Continue
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default SplashScreen;
