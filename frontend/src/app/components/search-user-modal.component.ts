import {
  AfterViewInit,
  Component, ElementRef, Injectable, Input, OnInit, Renderer,
  ViewChild
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchUserModalService {

  constructor(private modalService: NgbModal) {
  }

  open(excludedUserEmails: string[]): Promise<User> {
    const modalRef = this.modalService.open(SearchUserModalComponent, { size: 'lg' });
    const instance = modalRef.componentInstance as SearchUserModalComponent;
    instance.excludedUserEmails = excludedUserEmails;
    return modalRef.result;
  }
}

@Component({
  selector: 'app-search-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">
        <a><i class="fa fa-times" (click)="cancel()"></i></a>
        <span translate>Select user</span>
      </h4>
    </div>

    <div class="modal-body full-height">
      <div class="row">
        <div class="col-md-6">
          <div class="input-group input-group-lg input-group-search">
            <input #searchInput type="text" class="form-control" placeholder="{{'Search user...' | translate}}"
                   [(ngModel)]="search"/>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="search-results">
            <div class="search-result"
                 *ngFor="let user of searchResults$ | async"
                 (click)="selectUser(user)">
              
              <h6>{{user.name}}</h6>
              <p>{{user.email}}></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-footer">
      
      <button type="button"
              class="btn btn-secondary cancel"
              (click)="cancel()" translate>Cancel
      </button>
      
    </div>
  `,
  styleUrls: ['./search-user-modal.component.scss']
})

export class SearchUserModalComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput: ElementRef;

  @Input()
  excludedUserEmails: string[];

  search$  = new BehaviorSubject('');
  searchResults$: Observable<User[]>;

  constructor(public modal: NgbActiveModal,
              private userService: UserService,
              private renderer: Renderer) {
  }

  ngOnInit() {
    this.searchResults$ =
      Observable.combineLatest(this.search$, this.userService.getUsers()).map(([search, users]) => {

        const isUserAddable = (user: User) => {
          return !this.isExcluded(user) && (!search || user.name.toLowerCase().indexOf(search) !== -1);
        };

        return users.filter(user => isUserAddable(user));
      });
  }

  isExcluded(user: User) {
    for (const excludedEmail of this.excludedUserEmails) {
      if (user.email === excludedEmail) {
        return true;
      }
    }
    return false;
  }

  selectUser(user: User) {
    this.modal.close(user);
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
}
