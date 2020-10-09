import _ from "lodash";
import React, { Component } from "react";
import styled from "styled-components";
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
const Button = styled.button`
  padding: 10px 20px;
`;
class ClassifyingPage extends Component {
  state = {};
  componentDidMount = () => {
    let projectName = "project1";
    Server.requestNewImage(projectName).then(this.loadNewImage);
  };
  loadNewImage = res => {
    console.log({res})
    this.setState({ ...res })};
  classify = () => {
    const { img, selectedClass } = this.state;
    const { selectedProject } = this.props;
    Server.classifyImage({
      imageClass: selectedClass,
      project: selectedProject,
      image: img
    }).then(this.loadNewImage);
  };
  selectClass = event => this.setState({ selectedClass: event.target.value });
  discard() {
    const { img } = this.state;
    const { selectedProject } = this.props;
    Server.discardImage({ project: selectedProject, image: img }).then(
      this.loadNewImage
    );
  }
  render() {
    const { classes, img, selectedClass } = this.state;
    return (
      <Container>
        <Img src={img} />
        <Controls>
          <div>
            {_.map(classes, classOption => (
              <label>
                <input
                  type="radio"
                  name="classes"
                  value={classOption}
                  checked={selectedClass === classOption}
                  onChange={this.selectClass}
                />
                {classOption}
              </label>
            ))}
          </div>
          <div>
            <Button onClick={this.classify}>Submit</Button>
            <Button onClick={this.discard}>discard</Button>
          </div>
        </Controls>
      </Container>
    );
  }
}

export default ClassifyingPage;
