import React, { Component } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "antd/dist/antd.css";

class TimePickerComp extends Component {
  render() {
    return (
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <label className="labelTime">{this.props.label}</label>
        {/* <TimePicker
          defaultValue={moment("12:08", format)}
          size="large"
          format={format}
          value={this.props.timeValue}
          onChange={this.props.changeTime}
        /> */}
        <DatePicker
          format="YYYY-MM-DD HH:mm"
          value={this.props.timeValue}
          onChange={this.props.changeTime}
          showTime={{ defaultValue: moment("00:00:00", "HH:mm") }}
        />
      </div>
    );
  }
}

export default TimePickerComp;
