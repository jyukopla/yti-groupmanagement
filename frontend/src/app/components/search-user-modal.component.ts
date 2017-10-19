import {
  Component, ElementRef, Injectable, Input, OnInit, Optional, Pipe, PipeTransform, Renderer,
  ViewChild
} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserModel} from "../apina";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {UserService} from "../services/user.service";
import {Http} from "@angular/http";


@Injectable()
export class SearchModalService {

  constructor(private modalService: NgbModal) {
  }

  open(): Promise<UserModel> {
    const modalRef = this.modalService.open(SearchUserModalComponent, { size: 'lg' });
    return modalRef.result;
  }
}

@Component({
  selector: 'app-search-modal',
  template: `<div class="modal-header">
  <h4 class="modal-title">
    <a><i class="fa fa-times" (click)="cancel()"></i></a>
    <span translate>Select user</span>
  </h4>
    </div>

    <div class="modal-body full-height ">
        <div class="row">
            <div class="col-md-4">
                <div class="input-group input-group-lg input-group-search" style="margin-bottom: 10px;">
                <input #searchInput type="text" class="form-control" placeholder="{{'Search user...' | translate}}"
                [(ngModel)]="search"/>
                </div>
            <div class="search-panel">
        </div>
                
            <ul id="users" [(ngModel)] = "selectedItem" ngDefaultControl>            
                <li *ngFor="let user of allUsers" (click)="userSelected(user)">{{user.name}}</li>
            </ul>
              
    </div>
          <div id="userdetails" class="col-md-7">
            <label id="userdetailname" translate>Name</label>
            <p>{{userdetail_name}}</p>
            
            <label id="userdetailemail" translate>Email</label>
            <p>{{userdetail_email}}</p>
          </div>

          <div class="col-md-4">
        <div class="search-results">
            <div class="search-result" [class.selected]="user === selectedItem"
            *ngFor="let user of searchResults$ | async; trackBy: userModel"
            (click)="select(user)">
            <h6>{{user.name | translateValue}}</h6>
            <p> {{user.email | translateValue}}></p>

                <div class="origin">
                <span class="pull-left">LABEL</span>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
    </div>
    </div>
  </div>

  <div class="modal-footer">

    <div class="alert alert-danger" style="display: inline; padding: 6px; margin: 0 5px 0 0;" role="alert">
<span class="fa fa-exclamation-circle" aria-hidden="true"></span>
 
</div>

<button type="button"
class="btn btn-secondary cancel"
(click)="cancel()" translate>Cancel</button>

    <button type="button"
            class="btn btn-default confirm"
            (click)="confirm()"
            translate>Select user</button>
</div>
  `,
  styleUrls: ['./search-user-modal.component.scss']
})

export class SearchUserModalComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;

  @Input() userId: string;
  @Input() initialSearch: string;

  searchResults$ = new BehaviorSubject<UserModel[]>([]);

  allUsers:UserModel[] = [];

  selectedItem = new UserModel();
  selection = new UserModel();

  userdetail_name: string;

  userdetail_email: string;

  search$ = new BehaviorSubject('');
  users$: Observable<UserModel[]>;

  constructor(public modal: NgbActiveModal,
              private userService: UserService,
              private renderer: Renderer,
              private http: Http) { }


  ngOnInit() {
    this.search = this.initialSearch;
    this.users$ = this.userService.getUsers();
    this.users$.subscribe(users => this.allUsers = users);
  }

  userSelected(user: UserModel) {
    this.userdetail_name = user.name;
    this.userdetail_email = user.email;
    this.selectedItem.name = this.userdetail_name;
    this.selectedItem.email = this.userdetail_email;

  }


  userModel(index: number, item: UserModel) {
    return item.name;;
  }


  select(userModel: UserModel) {

    this.selectedItem = userModel;

    this.userService.getUsers().subscribe(users => {
      this.selection = users.pop() as UserModel;
      this.selectedItem.email = this.selection.email;
    })
  }





  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'focus');
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

    this.selectedItem.name = this.userdetail_name;
    this.selectedItem.email = this.userdetail_email;
    this.modal.close(this.selectedItem);
  }
}


@Pipe({
  name: 'searchPipe',
  pure: false
})
export class SearchPipe implements PipeTransform {
  transform(data: any[], searchTerm: string): any[] {
    searchTerm = searchTerm.toUpperCase();
    return data.filter(item => {
      return item.toUpperCase().indexOf(searchTerm) !== -1
    });
  }
}
