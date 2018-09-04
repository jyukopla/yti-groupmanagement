export class Config {

  constructor(
              public terminologyUrl: string,
              public codeListUrl: string,
              public dataModelUrl: string,
              public dev: boolean) {
  }

  get showIncompleteFeature() {
    return this.dev;
  }
}
