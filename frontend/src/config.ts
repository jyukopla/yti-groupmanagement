export interface Config {
  apiEndpoint: string;
  apiEndpointWithName(name: string): string;
}

class EnvironmentConfig implements Config {

  apiEndpointWithName(name: string) {
    return `${this.apiEndpoint}/rest/${name}`;
  }

  get apiEndpoint() {
    return process.env.API_ENDPOINT || '/api';
  }
}

export const config: Config = new EnvironmentConfig();
