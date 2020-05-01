import React, { Component } from "react";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import SkillsDiv from "../Components/SkillsDiv";
import axios from "axios";
import Loading from "../Components/Loading";

import { getDummyData } from "../Components/RequestHandler";

class OutputScreen extends Component {
  state = {
    data: "",
    skillsMatched: [],
    skillsNotMatched: [],
    loading: false,
    percentDone: 0,
    jobRole: "React Developer",
    jobLocation: "Spain",
    score: "33%",
  };

  getData = (loginInfo) => {
    console.log({ ...loginInfo });
    axios
      .post("http://608058f7.ngrok.io", {
        ...loginInfo,
      })
      .then((res) => {
        console.log(res.data);
        let fetchedData = res.data;
        this.setState({
          score: fetchedData.score,
          data: fetchedData,
          skillsMatched: fetchedData.topSkillsMatched,
          skillsNotMatched: fetchedData.topSkillsNotMatched,
        });
      });
  };

  componentDidMount = () => {
    console.log(this.props.location.loginInfo);
    this.getData(this.props.location.loginInfo);

    /*let fetchedData = getDummyData(this.props.location.loginInfo);

    this.setState({
      score: fetchedData.score,
    });
    this.setState({
      data: fetchedData,
      skillsMatched: fetchedData.topSkillsMatched,
      skillsNotMatched: fetchedData.topSkillsNotMatched,
    });
    */
  };

  render() {
    let topFiveSkills = this.state.skillsMatched.map((skill, index) => (
      <SkillsDiv
        key={index}
        color={"#00af80"}
        skillName={skill.skillName}
        skillFrequency={skill.skillFrequency}
        companyNames={skill.company}
      />
    ));

    let topFiveSkillsNotMatched = this.state.skillsNotMatched.map(
      (skill, index) => (
        <SkillsDiv
          key={index}
          color={"#fb5151"}
          skillName={skill.skillName}
          skillFrequency={skill.skillFrequency}
          companyNames={skill.company}
        />
      )
    );

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
                  flexDirection: "column",
                }}
              >
                <Loading />
                <h2 className="pageHeader">
                  Loading
                  {/* {this.state.percentDone}%.....DONE */}
                </h2>
              </div>
              {/* <TypeWriterComp /> */}
            </div>
          ) : (
            <div style={{ display: "contents" }}>
              <div
                className="col-lg-5 col-md-6 col-sm-11"
                style={{ flexBasis: 0, padding: 20, paddingBottom: 0 }}
              >
                <h3 style={{ color: "#0a74ec" }}>
                  {this.state.jobRole} - {this.state.jobLocation}
                  <h6 style={{ color: "#0a74ec" }}>
                    Score: {this.state.score}
                  </h6>
                </h3>
                {/* <hr className="hrGreen" /> */}
              </div>
              <div
                className="col-lg-5 col-md-6 col-sm-11"
                style={{ flexBasis: 0, padding: 20, paddingBottom: 0 }}
              >
                <h4 className="skillsHeader">Skills Matched</h4>
                <hr className="hrGreen" />
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {topFiveSkills}
                </div>
              </div>
              <div
                className="col-lg-5 col-md-6 col-sm-11"
                style={{ flexBasis: 0, padding: 20, paddingBottom: 0 }}
              >
                <h4 className="skillsHeader">Skills Not Matched</h4>
                <hr className="hrGreen" />
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {topFiveSkillsNotMatched}
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
