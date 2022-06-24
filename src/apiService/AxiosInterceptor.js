import axios, { AxiosError, AxiosResponse } from "axios";
import Environment from "../config/environment";

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // Do something with response data like console.log, change header, or as we did here just added a conditional behaviour, to change the route or pop up an alert box, based on the reponse status
    if (response.status === 200 || response.status === 201) {
    }
    if (
      response.config.url ===
      new Environment().apiUrl + ""
    ) {
      return response.data;
    }

    return response;
  },
  (err: AxiosError) => {
    if (err.response) {
      return err.response;
    }
    return err;
  },
);
