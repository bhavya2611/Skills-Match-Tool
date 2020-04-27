import React, { Component } from "react";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import UserTextInput from "../Components/UserTextInput";
import TimePickerComp from "../Components/TimePickerComp";

class ScheduleScreen extends Component {
  state = {
    value: "",
    cloudProvider: "",
    serverName: "",
    serverIp: "",
    project: "",
    startTime: "",
    stopTime: "",
  };

  changeTextInput = (element) => {
    if (element.target.id === "cloudProvider") {
      this.setState({ cloudProvider: element.target.value });
    } else if (element.target.id === "serverName") {
      this.setState({ serverName: element.target.value });
    } else if (element.target.id === "serverIp") {
      this.setState({ serverIp: element.target.value });
    } else if (element.target.id === "project") {
      this.setState({ project: element.target.value });
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
        serverName: this.state.serverName,
        serverIP: this.state.serverIp,
        cloudProvider: this.state.cloudProvider,
        project: this.state.project,
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
                  ID={"cloudProvider"}
                  changeText={this.changeTextInput}
                  placeholder="Cloud Provider"
                  inputValue={this.state.cloudProvider}
                />
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0 }}
              >
                <UserTextInput
                  ID={"serverName"}
                  changeText={this.changeTextInput}
                  inputValue={this.state.servverName}
                  placeholder="Server Name"
                />
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0 }}
              >
                <UserTextInput
                  ID={"serverIp"}
                  changeText={this.changeTextInput}
                  inputValue={this.state.servverIp}
                  placeholder="Server IP"
                />
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0 }}
              >
                <UserTextInput
                  ID={"project"}
                  changeText={this.changeTextInput}
                  inputValue={this.state.project}
                  placeholder="Project / RG"
                />
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0, display: "flex" }}
              >
                <div className="col-6" style={{ margin: 0, padding: 0 }}>
                  <TimePickerComp
                    label={"Start Time"}
                    timeValue={this.state.startTime}
                    changeTime={this.changeStartTimeValue}
                  />
                </div>
                <div className="col-6" style={{ margin: 0, padding: 0 }}>
                  <TimePickerComp
                    label={"Stop Time"}
                    timeValue={this.state.stopTime}
                    changeTime={this.changeStopTimeValue}
                  />
                </div>
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-10"
                style={{ flexBasis: 0, marginTop: "10vh", textAlign: "center" }}
              >
                <button onClick={this.saveData} className="scheduleButton">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ScheduleScreen;
