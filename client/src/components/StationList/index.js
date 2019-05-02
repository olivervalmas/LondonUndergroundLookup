import React, { Component } from "react";
import Station from "../Station";
import { Grid, Segment, Header, Icon } from "semantic-ui-react";

class StationList extends Component {
  render() {
    return (
      <div>
        {this.props.prompt ? (
          <Segment placeholder>
            <Header icon>
              <Icon name="search" />
              Please enter a query into the search bar to find associated stations on the London Underground network!
            </Header>
          </Segment>
        ) : (
          <Grid>
            {this.props.stationlist.map(station => (
              <Grid.Column key={station.id} width={4}>
                <Station
                  key={station.icsId}
                  name={station.name}
                  modes={station.modes}
                  zone={station.zone}
                  lat={station.lat}
                  long={station.lon}
                  icsId={station.icsId}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    );
  }
}

StationList.defaultProps = {
  stationlist: []
};

export default StationList;
