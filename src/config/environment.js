type EnvVars = Partial<{
  NODE_ENV: string;
  REACT_APP_API_URL: string;
}>;

export default class Environment {
  constructor( config = process.env ) {
    this.config = config;
  }

  get nodeEnv() {
    return this.config.NODE_ENV;
  }

  get apiUrl() {
    if (process.env.NODE_ENV != "development") {
      return "development URL put here";
    } else {
      return this.config.REACT_APP_API_URL;
    }
  }
}
