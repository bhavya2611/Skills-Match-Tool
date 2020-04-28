import React, { Component } from "react";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import SkillsDiv from "../Components/SkillsDiv";
import axios from "axios";
import Loading from "../Components/Loading";
// import { sampleData } from "../Assets/sampleData";

class OutputScreen extends Component {
  state = {
    data: "",
    skillsMatched: [],
    skillsNotMatched: [],
    loading: false,
    percentDone: 0,
    jobRole: "",
    jobLocation: "",
    score: "33%",
  };

  getData = (loginInfo) => {
    console.log({ ...loginInfo });
    axios
      .post("http://46bdeba1.ngrok.io/matchSkills", {
        ...loginInfo,
      })
      .then((res) => {
        console.log(res.data);
        let sampleData = res.data;
        let topSkillsMatched = sampleData.skillsMatched;
        topSkillsMatched.sort(function (a, b) {
          return b.skillFrequency - a.skillFrequency;
        });

        let topSkillsNotMatched = sampleData.skillsNotMatched;
        topSkillsNotMatched.sort(function (a, b) {
          return b.skillFrequency - a.skillFrequency;
        });

        this.setState({
          data: sampleData,
          skillsMatched: topSkillsMatched.slice(0, 5),
          skillsNotMatched: topSkillsNotMatched.slice(0, 5),
        });
      });
  };

  componentDidMount = () => {
    console.log(this.props.location.loginInfo);
    this.setState({
      jobRole: this.props.location.loginInfo.role,
      jobLocation: this.props.location.loginInfo.location,
    });
    this.getData(this.props.location.loginInfo);
  };

  render() {
    let topFiveSkills = this.state.skillsMatched.map((skill, index) => (
      <SkillsDiv
        key={index}
        color={"#00af80"}
        skillName={skill.skillName}
        skillFrequency={skill.skillFrequency}
      />
    ));

    let topFiveSkillsNotMatched = this.state.skillsNotMatched.map(
      (skill, index) => (
        <SkillsDiv
          key={index}
          color={"#fb5151"}
          skillName={skill.skillName}
          skillFrequency={skill.skillFrequency}
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
              <h3 style={{ color: "#004390" }}>
                {this.state.jobRole} - {this.state.jobLocation}
                <h6 style={{ color: "#0a74ec" }}>Score: {this.state.score}</h6>
              </h3>
              <hr className="hrGreen" />
              <div
                className="col-lg-5 col-md-6 col-sm-11"
                style={{ flexBasis: 0, padding: 20 }}
              >
                <h4 className="skillsHeader">Skills Matched</h4>
                <hr className="hrGreen" />
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {topFiveSkills}
                </div>
              </div>
              <div
                className="col-lg-5 col-md-6 col-sm-11"
                style={{ flexBasis: 0, padding: 20 }}
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
