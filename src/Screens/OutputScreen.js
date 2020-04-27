import React, { Component } from "react";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import ProgressBarComp from "../Components/ProgressBarComp";

class OutputScreen extends Component {
  render() {
    console.log();
    return (
      <Layout>
        <div className="row">
          <Header />
        </div>
        <div
          className="centerContent"
          style={{ flexDirection: "column", height: "80vh" }}
        >
          <div className="col-lg-3 col-md-4 col-sm-8" style={{ flexBasis: 0 }}>
            <ProgressBarComp />
          </div>
        </div>
      </Layout>
    );
  }
}

export default OutputScreen;
