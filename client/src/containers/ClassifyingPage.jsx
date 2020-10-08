import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import Server from "../server";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Controls = styled.div`
  display: flex;
  flex-direction: column;
`;
const Img = styled.img`
  width: 65vw;
`;
class ClassifyingPage extends Component {
  state = {};
  //   componentDidMount() {
  //     let projectName = this.props.projectName;
  //     Server.requestProjectInfo(projectName)
  //       .then(res => res.json())
  //       .then(res => this.setState(res));
  //   }
  getImageUrl() {
    return;
  }
  render() {
    const { classes } = this.state;
    return (
      <Container>
        <Img />
        <Controls>
          <div>
            {_.map(classes, c => (
              <input type="radio" name="classes" value={c} />
            ))}
          </div>
          <div>
            <button>Submit</button>
            <button>discard</button>
          </div>
        </Controls>
      </Container>
    );
  }
}

export default ClassifyingPage;
