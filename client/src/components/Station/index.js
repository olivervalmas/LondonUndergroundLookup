import React, { Component } from "react";
import { Card, Button, Image, Container } from "semantic-ui-react";
import "./style.css";

class Station extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  formatModes(modes) {
    const joined = modes.join(" ").replace("-", " ");
    const splitModes = joined.split(" ");
    const text = splitModes.map(
      s => s.charAt(0).toUpperCase() + s.substring(1)
    );
    return text.join(", ").replace(/, ([^,]*)$/, " and $1");
  }

  // redirect to google maps
  handleButtonClick() {
    window.location.href =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURI(this.props.name + " Underground Station");
  }

  getImage(modes) {
    if (modes.includes("dlr")) {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/DLR_roundel.svg/300px-DLR_roundel.svg.png"
    } else if (modes.includes("overground")) {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Overground_roundel.svg/300px-Overground_roundel.svg.png"
    } else {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Underground.svg/300px-Underground.svg.png"
    }
  }

  render() {
    return (
      <div className="station">
        <Card>
          <div style={{ marginTop: "1em", marginBottom: "1em"}}>
            <Container>
              <Image
                className="small ui centered image"
                src={this.getImage(this.props.modes)}
              />
            </Container>
          </div>
          <Card.Content>
            <Card.Header>{this.props.name}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <p>Zone: {this.props.zone}</p>
            <p>Latitude: {this.props.lat}</p>
            <p>Longitude: {this.props.long}</p>
          </Card.Content>
          <Card.Content extra>
            <div style={{ 'textAlign': "center" }}>
              <Button as="a" onClick={this.handleButtonClick}>
                View in Google Maps
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

Station.defaultProps = {
  name: "Station",
  modes: "Modes",
  zone: "Unknown",
  lat: 0,
  long: 0
};

export default Station;
