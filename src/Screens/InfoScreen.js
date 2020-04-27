import React, { Component } from "react";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import UserTextInput from "../Components/UserTextInput";

class InfoScreen extends Component {
  state = {
    value: "",
    Email: "",
    password: "",
    role: "",
    location: "",
  };

  changeTextInput = (element) => {
    if (element.target.id === "Email") {
      this.setState({ Email: element.target.value });
    } else if (element.target.id === "password") {
      this.setState({ password: element.target.value });
    } else if (element.target.id === "role") {
      this.setState({ role: element.target.value });
    } else if (element.target.id === "location") {
      this.setState({ location: element.target.value });
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
        Email: this.state.Email,
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
                  ID={"Email"}
                  changeText={this.changeTextInput}
                  placeholder="Linked In Email Id"
                  inputValue={this.state.Email}
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
                />
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0 }}
              >
                <UserTextInput
                  ID={"role"}
                  changeText={this.changeTextInput}
                  inputValue={this.state.role}
                  placeholder="Job Role"
                />
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0 }}
              >
                <UserTextInput
                  ID={"location"}
                  changeText={this.changeTextInput}
                  inputValue={this.state.location}
                  placeholder="Location"
                />
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0, marginTop: "10vh", textAlign: "center" }}
              >
                <button onClick={this.saveData} className="scheduleButton">
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
