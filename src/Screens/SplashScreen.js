import React, { Component } from "react";
import Layout from "../Components/Layout";
import match from "../Assets/match.png";

class SplashScreen extends Component {
  render() {
    console.log();
    return (
      <Layout>
        <div className="centerContent" style={{ height: "100vh" }}>
          <div className="verticalContent">
            <img alt="" src={match} style={{ height: "40vh" }} />
            <div className="headerText">Skill-Nalysis</div>
            <div
              className="linkText"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.history.push("/Info")}
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
