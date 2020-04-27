import React, { Component } from "react";

class TypeWriterComp extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      typeText: [
        "We are working on getting your results quickly.",
        "Please be patient",
        "Hope you smiled today",
        "Almost Done",
      ],
      speed: 200,
      counter: 0,
      counterArr: 0,
    };
  }

  typeWriter = () => {
    if (this.state.counterArr < this.state.typeText.length) {
      this.setState({
        text:
          this.state.text +
          this.state.typeText[this.state.counterArr].charAt(this.state.counter),
      });
      this.setState({ counter: this.state.counter + 1 });
      setTimeout(this.typeWriter, this.state.speed);
      if (
        this.state.counter === this.state.typeText[this.state.counterArr].length
      ) {
        this.setState({
          text: "",
          counter: 0,
          counterArr: this.state.counterArr + 1,
          speed: this.state.speed * 2,
        });
        setTimeout(this.typeWriter, this.state.speed);
      }
    } else {
      this.setState({ counterArr: 0 });
    }
  };

  componentDidMount = () => {
    this.typeWriter();
  };

  render() {
    return (
      <div className="col-12" style={{ height: 100 }}>
        <h4 className="pageHeader">{this.state.text}</h4>
      </div>
    );
  }
}

export default TypeWriterComp;
