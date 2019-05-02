import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import "./style.css";
import LineRating from "../LineRating";

class Lines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      lineIds: [],
      linesStatus: [],
      ratings: {}
    };
  }

  async componentDidMount() {

    const response = await fetch("http://localhost:8090/lines");
    const data = await response.json();
    const lineIds = data.map(line => line.id);

    const linesStatus = [];
    const ratings = {};
    for (let i = 0; i < lineIds.length; i++) {
      try {
        const response = await fetch(
          "http://localhost:8090/lines/" + lineIds[i]
        );
        const data = await response.json();
        linesStatus.push(data[0][0]);

        ratings[lineIds[i]] = data[1];

        this.setState({
          lines: data,
          lineIds: lineIds,
          linesStatus: linesStatus,
          ratings: ratings
        });
      } catch (err) {
        alert(err);
      }
    }
  }

  render() {
    return (
      <Table fixed celled>
        <Table.Header>
          <Table.Row active>
            <Table.Cell>
              <b>Line Name</b>
            </Table.Cell>
            <Table.Cell>
              <b>Line Mode</b>
            </Table.Cell>
            <Table.Cell>
              <b>Line Status</b>
            </Table.Cell>
            <Table.Cell>
              <b>Line Status Code</b>
            </Table.Cell>
            <Table.Cell>
              <b>Rating</b>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.linesStatus.map(line => (
            <Table.Row key={line.id}>
              <Table.Cell className={line.id}>{line.name}</Table.Cell>
              <Table.Cell>
                {line.modeName === "dlr"
                  ? "DLR"
                  : line.modeName.charAt(0).toUpperCase() +
                    line.modeName.slice(1)}
              </Table.Cell>
              <Table.Cell
                className={
                  line.lineStatuses[0].statusSeverityDescription ===
                  "Good Service"
                    ? "positive"
                    : "negative"
                }
              >
                {line.lineStatuses[0].statusSeverityDescription}
              </Table.Cell>
              <Table.Cell
                className={
                  line.lineStatuses[0].statusSeverity === 10
                    ? "positive"
                    : "negative"
                }
              >
                {line.lineStatuses[0].statusSeverity}
              </Table.Cell>
              <Table.Cell>
                <LineRating
                  password={this.state.password}
                  lineId={line.id}
                  maxRating={5}
                  defaultRating={this.state.ratings[`${line.id}`]}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

Lines.defaultProps = {};

export default Lines;
