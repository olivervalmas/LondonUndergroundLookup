import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import StationList from "./components/StationList";
import Lines from "./components/Lines";
import TopMenu from "./components/TopMenu";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClickStations = this.handleClickStations.bind(this);
    this.handleClickLines = this.handleClickLines.bind(this);
    this.state = {
      stations: [],
      prompt: true,
      activeItem: "stations"
    };
  }

  handleClickLines() {
    this.setState({
      stations: [],
      prompt: true,
      activeItem: "lines"
    });
    document.getElementById("search-bar").value = "";
  }

  handleClickStations() {
    this.setState({
      stations: [],
      prompt: true,
      activeItem: "stations"
    });
    document.getElementById("search-bar").value = "";
  }

  async handleSearchChange() {
    const search_query = document.getElementById("search-bar").value;

    // checks if string is not just whitespace
    if (!search_query.replace(/\s/g, "").length) {
      this.setState({ stations: [], prompt: true });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8090/stations/" + search_query
      );

      const data = await response.json();
      const matches = data.matches;
      const filtered_matches = matches.filter(match =>
        match.modes.includes("tube")
      );

      this.setState({
        stations: filtered_matches,
        prompt: false,
        activeItem: "stations"
      });
    } catch (err) {
      alert(err);
    }
  }
  
  render() {
    return (
      <div>
        <TopMenu
          handleClickLines={this.handleClickLines}
          handleClickStations={this.handleClickStations}
          handleSearchChange={this.handleSearchChange}
          activeItem={this.state.activeItem}
        />

        <Container
          id="app-container"
          style={{ marginTop: "2em", marginBottom: "2em" }}
        >
          {this.state.activeItem === "stations" ? (
            <StationList
              stationlist={this.state.stations}
              prompt={this.state.prompt}
            />
          ) : (
            <Lines />
          )}
        </Container>
      </div>
    );
  }
}

export default App;
