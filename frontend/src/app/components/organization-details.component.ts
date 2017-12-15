import { Component, EventEmitter, Input } from '@angular/core';
import { OrganizationDetails } from '../entities/organization-details';

@Component({
  selector: 'app-organization-details',
  template: `
    <div class="row">
      <div class="col-md-4">

        <h4 translate>In finnish</h4>
        <div class="form-group section" name="details" (change)="(dataChanged())" >
          <label for="name_fi" translate>Name</label>
          <input type="text" class="form-control" id="name_fi" [(ngModel)]="organization.nameFi" required>
          <label for="description_fi" translate>Description</label>
          <textarea id="description_fi" class="form-control" rows="4" [(ngModel)]="organization.descriptionFi"></textarea>
        </div>
        <p></p>
        <label for="url_input">Url: </label>
        <input type="text" class="form-control" id="url_input" [(ngModel)]="organization.url">
      </div>

      <div class="col-md-4">

        <h4 translate>In english</h4>

        <div class="form-group section">
          <label for="name_en" translate>Name</label>
          <input type="text" class="form-control" id="name_en" [(ngModel)]="organization.nameEn" required>
          <label for="description_en" translate>Description</label>
          <textarea id="description_en" class="form-control" rows="4" [(ngModel)]="organization.descriptionEn"></textarea>
        </div>
      </div>

      <div class="col-md-4">

        <h4 translate>In swedish</h4>

        <div class="form-group section">
          <label for="name_sv" translate>Name</label>
          <input type="text" class="form-control" id="name_sv" [(ngModel)]="organization.nameSv" required>
          <label for="description_sv" translate>Description</label>
          <textarea id="description_sv" class="form-control" rows="4" [(ngModel)]="organization.descriptionSv"></textarea>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./organization-details.component.scss'],
  outputs:['onDataChanged']
})
export class OrganizationDetailsComponent {

  @Input()
  organization: OrganizationDetails;

  public onDataChanged = new EventEmitter();

  dataChanged() {
    this.onDataChanged.emit();
  }
}
