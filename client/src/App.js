import _ from "lodash";
import { Component, default as React } from "react";
import "./App.css";
import ClassesContainer from "./containers/ClassesContainer";
import ClassifyingPage from "./containers/ClassifyingPage";
import ProjectsContainer from "./containers/ProjectsContainer";
import Server from "./server";

const PROJECTS_PAGE = 0;
const SET_CLASSES_PAGE = 1;
const CLASSIFYING_PAGE = 2;
class App extends Component {
  state = {
    page: 0
  };
  componentDidMount() {
    Server.getProjectsAvailable()
      .then(this.setProjects)
      .catch(error => {
        console.log({ error });
        this.setProjects({ error: true });
      });
  }
  next = () => this.setState({ page: this.state.page + 1 });
  setProjects = projects => this.setState({ projects });
  selectProject = selectedProject => {
    const { projects } = this.state;
    this.setState({ selectedProject: _.trim(selectedProject) });
    if (_.includes(projects, selectedProject))
      this.setState({ page: CLASSIFYING_PAGE });
    else this.next();
  };
  renderPage = () => {
    const { page, projects, selectedProject } = this.state;
    switch (page) {
      case PROJECTS_PAGE:
        return (
          <ProjectsContainer
            selectProject={this.selectProject}
            next={this.next}
            projects={projects}
          />
        );
      case SET_CLASSES_PAGE:
        return (
          <ClassesContainer
            selectedProject={selectedProject}
            next={this.next}
          />
        );
      case CLASSIFYING_PAGE:
        return <ClassifyingPage selectedProject={selectedProject} />;
      default:
        break;
    }
  };
  render() {
    return this.renderPage();
  }
}

export default App;
