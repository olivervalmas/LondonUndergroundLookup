import React, { Component } from "react";
import { Rating } from "semantic-ui-react";

class LineRating extends Component {
  constructor(props) {
    super(props);
    this.handleRate = this.handleRate.bind(this);
  }

  async handleRate(e, { rating, maxRating }) {
    const password = prompt(
      "Please enter the password to edit a line's rating."
    );
    fetch("http://localhost:8090/lines/" + this.props.lineId, {
      method: "POST",
      body: JSON.stringify({
        rating,
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 401) {
          alert(
            `HTTP ${
              res.status
            } - Unauthorised Access. Please type in the correct password.`
          );
        }
      })
      .catch();
  }

  render() {
    return (
      <Rating
        maxRating={this.props.maxRating}
        defaultRating={this.props.defaultRating}
        icon="star"
        size="small"
        onRate={this.handleRate}
      />
    );
  }
}

export default LineRating;
