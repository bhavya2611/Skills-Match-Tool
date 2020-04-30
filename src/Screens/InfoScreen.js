import React, { Component } from "react";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import UserTextInput from "../Components/UserTextInput";
import DropdownExperience from "../Components/DropdownExperience";

class InfoScreen extends Component {
  state = {
    mailId: "",
    password: "",
    role: "",
    location: "",
    experience: "experience-2",
  };

  changeTextInput = (element) => {
    if (element.target.id === "mailId") {
      this.setState({ mailId: element.target.value });
    } else if (element.target.id === "password") {
      this.setState({ password: element.target.value });
    } else if (element.target.id === "role") {
      this.setState({ role: element.target.value });
    } else if (element.target.id === "location") {
      this.setState({ location: element.target.value });
    } else if (element.target.id === "experience") {
      this.setState({ experience: element.target.value });
    }
  };

  changeStartTimeValue = (time) => {
    this.setState({ startTime: time });
  };

  changeStopTimeValue = (time) => {
    this.setState({ stopTime: time });
  };

  saveData = () => {
    fetch("http://localhost:3004/configs", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startTime: this.state.startTime,
        stopTime: this.state.stopTime,
        password: this.state.password,
        role: this.state.role,
        mailId: this.state.mailId,
        location: this.state.location,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  };

  redirectToResults = () => {
    this.props.history.push({
      pathname: "/Results",
      loginInfo: {
        ...this.state,
      },
    });
  };

  render() {
    return (
      <Layout>
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <div className="col-12">
            <div className="centerContent" style={{ flexDirection: "column" }}>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0 }}
              >
                <UserTextInput
                  ID={"mailId"}
                  changeText={this.changeTextInput}
                  placeholder="Linked In Email Id"
                  inputValue={this.state.mailId}
                />
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0 }}
              >
                <UserTextInput
                  ID={"password"}
                  changeText={this.changeTextInput}
                  inputValue={this.state.password}
                  placeholder="Linked In Password"
                  type="password"
                />
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0, display: "flex" }}
              >
                <div style={{ flexBasis: 0, marginRight: 40, flex: 1 }}>
                  <UserTextInput
                    ID={"role"}
                    changeText={this.changeTextInput}
                    inputValue={this.state.role}
                    placeholder="Job Role"
                  />
                </div>
                <div style={{ flexBasis: 0, flex: 1 }}>
                  <UserTextInput
                    ID={"location"}
                    changeText={this.changeTextInput}
                    inputValue={this.state.location}
                    placeholder="Location"
                  />
                </div>
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0 }}
              >
                <DropdownExperience
                  value={this.state.experience}
                  handleChangeSelect={this.changeTextInput}
                  ID={"experience"}
                />
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0, marginTop: "7vh", textAlign: "center" }}
              >
                <button
                  onClick={this.redirectToResults}
                  className="scheduleButton"
                >
                  Match
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default InfoScreen;
