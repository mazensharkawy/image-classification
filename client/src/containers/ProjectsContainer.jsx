import _ from "lodash";
import { Component, default as React } from "react";
import styled from "styled-components";
import Input from "../components/DefaultInput";

const ProjectsBox = styled.div`
  border-radius: 5px;
  width: 30vw;
`;
const Project = styled.a`
  display: block;
  padding: 10px 0;
  border-top:1px solid #ececec;
  border-bottom:1px solid #ececec;
  text-align: center;
  width: 100%;
`;
const NewProject = styled.button`
  padding: 10px 20px;
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
      <div>
        {!projects && <p>Loading</p>}
        {projects && projects.error && <p>Error loading Projects</p>}
        <p>Select a project to continue classifying</p>
        <ProjectsBox>
        {_.size(projects) === 0 && <Project>
              No projects found
            </Project>}
          {_.map(projects, (project, projectName) => (
            <Project onClick={() => selectProject(projectName)}>
              {projectName}
            </Project>
          ))}
        </ProjectsBox>
        <p>Or Create A New Project</p>
        <Input
          placeholder="New Project Name"
          value={newProjectName}
          onChange={this.handleChange}
        />
        <NewProject onClick={this.createProject}>Add new Project</NewProject>
        <Error>{error}</Error>
      </div>
    );
  };
}

export default ProjectsContainer;
