import axios from "axios";
import _ from "lodash";

const dev = process.env.NODE_ENV !== "production";
export default class Server {
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
    return this.get({
      url: `/api/request-image/${project}`
    });
  }
  static getProjectsAvailable() {
    return this.get({
      url: `/api/getProjects`
    });
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
    return axios(url, payload).then(this.getData);
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
    return axios(url, payload).then(res => this.getData(res));
    // .catch(err => console.log(err));
    // .then(this.parseJson);
  }
  static getData(response) {
    return _.get(response, "data", {});
  }
}
