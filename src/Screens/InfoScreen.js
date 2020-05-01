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
    location: "India",
    experience: "any",
    err: "",
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
    this.setState({ err: "" });
  };

  redirectToResults = () => {
    if (
      this.state.mailId !== "" &&
      this.state.password !== "" &&
      this.state.role !== "" &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.mailId)
    ) {
      this.props.history.push({
        pathname: "/Results",
        loginInfo: {
          ...this.state,
        },
      });
    } else {
      this.state.err = "Please enter all fields correctly.";
    }
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
                {this.state.err ? (
                  <h5 style={{ color: "#fb5151" }}>{this.state.err}</h5>
                ) : null}
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
