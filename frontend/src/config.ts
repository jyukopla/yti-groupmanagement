export interface Config {
  publicApiEndpoint: string;
  publicApiEndpointWithName(name: string): string;
}

class EnvironmentConfig implements Config {

  publicApiEndpointWithName(name: string) {
    return `${this.publicApiEndpoint}/${name}`;
  }

  get publicApiEndpoint() {
    return process.env.API_ENDPOINT || '/public-api';
  }
}

export const config: Config = new EnvironmentConfig();
