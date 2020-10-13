import _ from "lodash";
import { Component, default as React } from "react";
import styled from "styled-components";
import Input from "../components/DefaultInput";
import {
  LARGE_SCREEN_BREAK_POINT,

  PURPLE
} from "../config";

const Container = styled.div`
width: 40vw;
margin: 5vw auto;
`
const ProjectsBox = styled.div`
  border-radius: 5px;
  width: 30vw;
`;
const CustomInput = styled(Input)`
width: 30vw;
`
const Project = styled.a`
  display: block;
  padding: 10px 0;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  text-align: center;
  width: 100%;
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
const Error = styled.p`
  color: red;
`;

class ProjectsContainer extends Component {
  state = { newProjectName: "", error: null };
  handleChange = event => this.setState({ newProjectName: event.target.value });
  createProject = () => {
    const { projects, selectProject, next } = this.props;
    const { newProjectName } = this.state;
    if (!/^[ A-Za-z0-9_@.#&+-]*$/.test(newProjectName)) {
      this.setState({ error: "Invalid character(s)" });
    } else if (!_.includes(projects, newProjectName)) {
      //   Server.createProject(newProjectName)
      selectProject(newProjectName);
    } else
      this.setState({ error: "Project Name exists. Please try another name" });
  };
  render = () => {
    const { selectProject, projects } = this.props;
    const { newProjectName, error } = this.state;
    return (
      <Container>
        {projects && projects.error && <p>Error loading Projects</p>}
        <p>Select a project to continue classifying</p>
        <ProjectsBox>
          {projects && _.size(projects) === 0 && (
            <Project>No projects found</Project>
          )}
          {!projects && <Project>Loading</Project>}
          {_.map(projects, (project, projectName) => (
            <Project onClick={() => selectProject(projectName)}>
              {projectName}
            </Project>
          ))}
        </ProjectsBox>
        <p>Or Create A New Project</p>
        <CustomInput
          placeholder="New Project Name"
          value={newProjectName}
          onChange={this.handleChange}
        />
        <Button onClick={this.createProject}>Add new Project</Button>
        <Error>{error}</Error>
      </Container>
    );
  };
}

export default ProjectsContainer;
