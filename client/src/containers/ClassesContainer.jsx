import _ from "lodash";
import React, { Component } from "react";
import styled from "styled-components";
import Input from "../components/DefaultInput";
import Server from "../server";

const Container = styled.div``;
const InputContainer = styled.div`
  display: flex;
  width: 30vw;
`;
const ClassesBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 30vw;
`;
const ClassItem = styled.a`
  padding: 10px 0;
  width: 100%;
`;
const NewClass = styled.button`
  padding: 10px 20px;
`;
const Proceed = styled.button`
  padding: 10px 20px;
`;
const Error = styled.p`
  color: red;
`;
class ClassesContainer extends Component {
  state = {
    classes: [],
    inputError: false,
    newClassName: ""
  };
  addClass = () => {
    const { classes, newClassName } = this.state;
    if (!/^[ A-Za-z0-9_@.#&+-]*$/.test(newClassName)) {
      this.setState({ inputError: "Invalid character(s)" });
    } else if (_.includes(classes, newClassName))
      this.setState({ inputError: "Class Name already used" });
    else
      this.setState({
        classes: [...classes, _.trim(newClassName)],
        inputError: false
      });
  };
  handleChange = event => this.setState({ newClassName: event.target.value });
  renderClass = classItem => <ClassItem>{classItem}</ClassItem>;
  createProject = () => {
    const { selectedProject } = this.props;
    const { projectName, classes } = this.state;
    Server.createProject({ projectName: selectedProject, classes });
    this.props.next();
  };
  render() {
    const { newClassName, classes, inputError } = this.state;
    return (
      <Container>
        <InputContainer>
          <Input
            value={newClassName}
            placeHolder="Enter a Class name"
            onChange={this.handleChange}
          />
          <NewClass onClick={this.addClass}>ADD</NewClass>
        </InputContainer>
        {inputError && <Error>{inputError}</Error>}
        <ClassesBox>{_.map(classes, this.renderClass)}</ClassesBox>
        <Proceed onClick={this.createProject}>Proceed</Proceed>
      </Container>
    );
  }
}

export default ClassesContainer;
