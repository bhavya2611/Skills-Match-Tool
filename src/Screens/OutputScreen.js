import React, { Component } from "react";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import SkillsDiv from "../Components/SkillsDiv";
import axios from "axios";
import Loading from "../Components/Loading";

class OutputScreen extends Component {
  state = {
    data: "",
    loading: false,
  };

  // getData = () => {
  //   axios.get("http://d0f834da.ngrok.io/matchSkills").then((res) => {
  //     console.log(res.data);
  //   });
  // };

  componentDidMount = () => {
    //this.getData();
  };

  render() {
    return (
      <Layout>
        <div className="row">
          <Header />
        </div>
        <div
          className="centerContent"
          style={{
            flexDirection: "column",
          }}
        >
          {this.state.data === "" ? (
            <div
              className="col-lg-3 col-md-3 col-sm-7"
              style={{ flexBasis: 0 }}
            >
              <div
                style={{
                  height: "70vh",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Loading />
              </div>
              {/* <TypeWriterComp /> */}
            </div>
          ) : (
            <div>
              <div
                className="col-lg-5 col-md-6 col-sm-11"
                style={{ flexBasis: 0, padding: 20 }}
              >
                <h4 className="skillsHeader">Skills Matched</h4>
                <hr className="hrGreen" />
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <SkillsDiv
                    color={"#00af80"}
                    skillName={"React.js"}
                    skillFrequency={"10"}
                  />
                  <SkillsDiv
                    color={"#00af80"}
                    skillName={"JavaScript"}
                    skillFrequency={"10"}
                  />
                  <SkillsDiv
                    color={"#00af80"}
                    skillName={"HTML"}
                    skillFrequency={"10"}
                  />
                  <SkillsDiv
                    color={"#00af80"}
                    skillName={"CSS3"}
                    skillFrequency={"10"}
                  />
                  <SkillsDiv
                    color={"#00af80"}
                    skillName={"MongoDB"}
                    skillFrequency={"10"}
                  />
                </div>
              </div>
              <div
                className="col-lg-5 col-md-6 col-sm-11"
                style={{ flexBasis: 0, padding: 20 }}
              >
                <h4 className="skillsHeader">Skills Not Matched</h4>
                <hr className="hrGreen" />
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <SkillsDiv
                    color={"#fb5151"}
                    skillName={"Redux"}
                    skillFrequency={"10"}
                  />
                  <SkillsDiv
                    color={"#fb5151"}
                    skillName={"AWS"}
                    skillFrequency={"10"}
                  />
                  <SkillsDiv
                    color={"#fb5151"}
                    skillName={"SQL Server"}
                    skillFrequency={"10"}
                  />
                  <SkillsDiv
                    color={"#fb5151"}
                    skillName={"Skilled Labor"}
                    skillFrequency={"10"}
                  />
                  <SkillsDiv
                    color={"#fb5151"}
                    skillName={"Software as a Service (SaaS)"}
                    skillFrequency={"10"}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default OutputScreen;
