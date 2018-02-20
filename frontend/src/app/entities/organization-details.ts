import { Localizable } from 'yti-common-ui/types/localization';
import { Organization } from '../apina';

export class OrganizationDetails {

  constructor(public url: string,
              public nameFi: string,
              public nameEn: string,
              public nameSv: string,
              public descriptionFi: string,
              public descriptionEn: string,
              public descriptionSv: string,
              public removed: boolean) {
  }

  static empty() {
    return new OrganizationDetails('', '', '', '', '', '', '', false);
  }

  static fromOrganization(model: Organization) {
    return new OrganizationDetails(
      model.url,
      model.nameFi,
      model.nameEn,
      model.nameSv,
      model.descriptionFi,
      model.descriptionEn,
      model.descriptionSv,
      model.removed
    );
  }

  get name(): Localizable {
    return {
      'fi': this.nameFi,
      'en': this.nameEn,
      'sv': this.nameSv
    };
  }

  get description(): Localizable {
    return {
      'fi': this.descriptionFi,
      'en': this.descriptionEn,
      'sv': this.descriptionSv
    };
  }

  clone() {
    return new OrganizationDetails(
      this.url,
      this.nameFi,
      this.nameEn,
      this.nameSv,
      this.descriptionFi,
      this.descriptionEn,
      this.descriptionSv,
      this.removed
    );
  }
}
