
const dev = process.env.NODE_ENV !== "production";
export default class Server {
  static createProject({ projectName, classes }) {
    return this.send({
      url: `/api/create-project`,
      data: {
        projectName,
        classes
      }
    });
  }
  static classifyImage({ imageClass, project, image }) {
    return this.send({
      url: `/api/classify-image`,
      data: {
        imageClass,
        project,
        image
      }
    });
  }
  static requestImageNewImage(project) {
    return this.get(`/api/request-image/${project}`);
  }
  static getProjectsAvailable() {
    return this.get(`/api/projects`)
      .then(({ projects }) => projects);
  }
  static send({ url, data }) {
    let payload = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      data
      //   credentials: 'same-origin'
    };
    return fetch(url, payload).then(this.getData);
    // .catch(err => console.log(err));
    // .then(this.parseJson);
  }
  static get(url) {
    let payload = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    return fetch(url, payload).then(res => this.getData(res));
    // .catch(err => console.log(err));
    // .then(this.parseJson);
  }
  static getData(response) {
    return response.json()
  }
}
