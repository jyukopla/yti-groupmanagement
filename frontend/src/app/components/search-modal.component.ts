import {Component, ElementRef, Injectable, Input, OnInit, Optional, Renderer, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserModel} from "../apina";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Localizable} from "../entities/localization";
import {Observable} from "rxjs/Observable";
import {UserService} from "../services/user.service";
import {Http} from "@angular/http";

type Mode = 'include'|'exclude';

export interface Restrict {
  graphId: string;
  conceptId: string;
  reason: string;
}

@Injectable()
export class SearchModalService {

  constructor(private modalService: NgbModal) {
  }

  openForGraph(graphId: string, initialSearch: string, restricts: Restrict[]): Promise<UserModel> {
    const modalRef = this.modalService.open(SearchModalComponent, { size: 'lg' });
    const instance = modalRef.componentInstance as SearchModalComponent;
    console.log("instance: ");;
    console.log(instance);
    console.log(instance.userModel);
    console.log(instance.userModel.toString());
    instance.graphId = graphId;
    instance.mode = 'include';
    instance.initialSearch = initialSearch;
    instance.restricts = restricts;
    return modalRef.result;
  }

  openOtherThanGraph(graphId: string, initialSearch = '', restricts: Restrict[]): Promise<UserModel> {
    const modalRef = this.modalService.open(SearchModalComponent, { size: 'lg' });
    const instance = modalRef.componentInstance as SearchModalComponent;
    instance.graphId = graphId;
    instance.mode = 'exclude';
    instance.initialSearch = initialSearch;
    instance.restricts = restricts;
    return modalRef.result;
  }
}

@Component({
  selector: 'app-search-modal',
  template: `<div class="modal-header">
  <h4 class="modal-title">
  <a><i class="fa fa-times" (click)="cancel()"></i></a>
  <!--span translate>Select user</span-->
</h4>
</div>
<div class="modal-body full-height">
<div class="row">
<div class="col-md-4">

<!--div class="input-group input-group-lg input-group-search">
  <input #searchInput type="text" class="form-control" placeholder="{{'Search user...' | translate}}"
  [(ngModel)]="search"/>
  </div-->

  <div class="search-panel">


  


<!--div class="form-group" *ngIf="mode === 'exclude'">
  <label for="vocabularyFilter" translate>Vocabulary</label>
<!--select id="vocabularyFilter" class="form-control" [(ngModel)]="onlyVocabulary">
<option [ngValue]="null" translate>All vocabularies</option>

</select>
</div-->
</div>
  <!--ul id="users" *ngFor="let user of this.allUsers ">
    {#user.name}
  </ul-->
  <select id="users" [(ngModel)] = "allUsers">
    <option *ngFor="let user of allUsers" [value]="user | json">{{user.name}}</option>
  </select>

</div>
<div class="col-md-4">
<!--(scrolled)="loadUsers()"-->
<div class="search-results">
<div class="search-result" [class.selected]="user === selectedItem"
*ngFor="let user of searchResults$ | async; trackBy: userModel"
(click)="select(user)">
<h6 [innerHTML]="user.name | translateValue"></h6>
<p [innerHTML]="user.email | translateValue"></p>

  <div class="origin">
<span class="pull-left">LABEL</span>
</div>
</div>
</div>
</div>
<div class="col-md-4">
<!--form>
  <app-concept-form *ngIf="selection && !loadingSelection"
  [concept]="selection"
  [form]="formNode"></app-concept-form>
</form-->

  </div>
  </div>
  </div>
  <div class="modal-footer">

<!--div class="alert alert-danger" style="display: inline; padding: 6px; margin: 0 5px 0 0;" role="alert" *ngIf="restrictionReasonForSelection"-->
    <div class="alert alert-danger" style="display: inline; padding: 6px; margin: 0 5px 0 0;" role="alert">
<span class="fa fa-exclamation-circle" aria-hidden="true"></span>
  <!--span>{{restrictionReasonForSelection | translate}}</span-->
</div>

<button type="button"
class="btn btn-secondary cancel"
(click)="cancel()" translate>Cancel</button>

<!--button type="button"
class="btn btn-default confirm"
(click)="confirm()"
  [disabled]="cannotSelect()" translate>Select concept</button-->
    <button type="button"
            class="btn btn-default confirm"
            (click)="confirm()"
            translate>Select user</button>
</div>
  `,
  styleUrls: ['./search-modal.component.scss']
})

export class SearchModalComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;

  @Input() mode: Mode;
  @Input() graphId: string;
  @Input() initialSearch: string;
  @Input() restricts: Restrict[];


  searchResults$ = new BehaviorSubject<UserModel[]>([]);

  allUsers:UserModel[];

  selectedItem: UserModel|null = null;
  selection: UserModel|null = null;


  search$ = new BehaviorSubject('');
  onlyStatus$ = new BehaviorSubject<string|null>(null);

  loading = true;
  loaded = 0;
  canLoadMore = true;


  constructor(public modal: NgbActiveModal,
              private userService: UserService,
              private renderer: Renderer,
              private http: Http) { }

  ngOnInit() {
       //TODO: Actual way of doing it commented out, now testing
    this.userService.getUsers().subscribe(userModels => {
    this.allUsers = userModels.map(userModel => new UserModel());

    });
  }

  loadUsers(reset = false) {

    const batchSize = 100;

    if (reset) {
      this.loaded = 0;
      this.canLoadMore = true;
    }

    if (this.canLoadMore) {

      this.loading = true;

      const appendResults = (users: UserModel[]) => {
        if (users.length < batchSize) {
          this.canLoadMore = false;
        }

        this.loaded += users.length;

        this.searchResults$.next(reset ? users : [...this.searchResults, ...users]);
        this.loading = false;
      };
    }
  }

  get searchResults() {
    return this.searchResults$.getValue();
  }

  userModel(index: number, item: UserModel) {
    return item.name;;
  }


  select(userModel: UserModel) {

    this.selectedItem = userModel;

    this.userService.getUsers().subscribe(users => {
      this.selection = users.pop();
      this.selectedItem = this.selection;
    })
  }

  get loadingSelection() {
    return this.selectedItem && (!this.selection || this.selectedItem.email !== this.selection.email);
  }

  ngAfterViewInit() {

  }

  get search() {
    return this.search$.getValue();
  }

  set search(value: string) {
    this.search$.next(value);
  }

  cancel() {
    this.modal.dismiss('cancel');
  }

  confirm() {
    this.modal.close(this.selection);
  }
}


export function isDefined<T>(obj): obj is T {
  return obj !== null && obj !== undefined;
}


class User {
  public _value: String;
  constructor(private userModel: UserModel) {
  this._value = this.userModel.name;
  }
  setName() {

  }
  value() {
    return this.userModel.name;
  }

  print() {
    return `${this.userModel.name}`;
  }
}
