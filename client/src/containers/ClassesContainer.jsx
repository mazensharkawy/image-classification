import _ from "lodash";
import React, { Component } from "react";
import styled from "styled-components";
import Input from "../components/DefaultInput";

const Container = styled.div``;
const InputContainer = styled.div`
  display: flex;
  width: 30vw;
`;
const ClassesBox = styled.div`
  border-radius: 5px;
  width: 30vw;
`;
const Class = styled.a`
  padding: 10px 0;
  width: 100%;
`;
const NewClass = styled.button`
  padding: 10px 20px;
`;
class ClassesContainer extends Component {
  state = {
    classes: [],
    inputError: false
  };
  addClass = className => {
    const { classes } = this.state;
    if (!/^[ A-Za-z0-9_@.#&+-]*$/.test(className)) {
      this.setState({ inputError: "Invalid character(s)" });
    } else if (_.includes(classes, className))
      this.setState({ inputError: "Class Name already used" });
    else this.setState({ inputError: false });
  };
  handleChange = event => this.setState({ newClassName: event.target.value });
  render() {
    const {newClassName} = this.state;
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
      </Container>
    );
  }
}

export default ClassesContainer;
