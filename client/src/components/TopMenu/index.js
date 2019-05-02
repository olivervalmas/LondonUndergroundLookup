import React, { Component } from "react";
import {Menu, Input} from "semantic-ui-react";

class TopMenu extends Component {

  render() {
    return (
      <Menu>
        <Menu.Item as="h3" header>
          London Underground Lookup
        </Menu.Item>
        <Menu.Item
          as="a"
          active={this.props.activeItem === "lines"}
          onClick={this.props.handleClickLines}
        >
          Lines
        </Menu.Item>
        <Menu.Item
          as="a"
          active={this.props.activeItem === "stations"}
          onClick={this.props.handleClickStations}
        >
          Stations
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input
              focus
              className="icon"
              icon="search"
              placeholder="Search..."
              id="search-bar"
              onChange={this.props.handleSearchChange}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

TopMenu.defaultProps = {};

export default TopMenu;
