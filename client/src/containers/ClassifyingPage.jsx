import _ from "lodash";
import React, { Component } from "react";
import styled from "styled-components";
import {
  LARGE_SCREEN_BREAK_POINT,
  MOBILE_BREAK_POINT,
  PURPLE
} from "../config";
import Server from "../server";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Controls = styled.div`
  display: flex;
  flex-direction: column;
`;
const OptionsContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 4vw;
  padding: 2vw 2vw;
  position: sticky;
  top: 0;
  @media only screen and (max-width: ${MOBILE_BREAK_POINT}) {
    width: 100%;
    border-radius: 6vw;
    padding: 0 2vw 2vw 2vw;
    position: relative;
  }
  @media only screen and (min-width: ${LARGE_SCREEN_BREAK_POINT}) {
    border-radius: 36px;
    padding: 38.4px 19.2px;
  }
  width: 30vw;
  margin: 0 auto;
  label {
    margin-top: 10px;
    display: block;
  }
`;
const Img = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  img {
    width: 300px;
    border-radius: 1vw;
    object-fit: cover;
    height: fit-content;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  min-width: 300px;
`;
const Button = styled.button`
  color: white;
  cursor: pointer;
  background: ${PURPLE};
  text-align: center;
  border-radius: 10px;
  padding: 1.2vw 1.2vw;
  font-weight: 500;
  font-size: 1vw;
  margin: 3px 0;
  border: none;
  @media only screen and (min-width: ${LARGE_SCREEN_BREAK_POINT}) {
    border-radius: 13px;
    font-size: 18px;
    padding: 23px;
  }
`;
class ClassifyingPage extends Component {
  state = {};
  componentDidMount = () => {
    Server.requestNewImage(this.props.selectedProject).then(this.loadNewImage);
  };
  loadNewImage = res => {
    console.log({ res });
    this.setState({ ...res });
  };
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
        <Img>
          <img src={img} alt="car image" />
        </Img>
        <Controls>
          <OptionsContainer>
            <div style={{margin: "0 auto", width: "fit-content"}}>
              {_.map(classes, classOption => (
                <label>
                  <input
                    type="radio"
                    name="classes"
                    value={classOption}
                    checked={selectedClass === classOption}
                    onChange={this.selectClass}
                  />
                  {_.upperFirst(classOption)}
                </label>
              ))}
            </div>
            <ButtonContainer>
              <Button onClick={this.classify}>Submit</Button>
              <Button onClick={this.discard}>Discard Image</Button>
            </ButtonContainer>
          </OptionsContainer>
        </Controls>
      </Container>
    );
  }
}

export default ClassifyingPage;
