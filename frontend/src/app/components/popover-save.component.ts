import {Component, Input, OnInit} from '@angular/core';
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'popover-save-button',
  template: `
    <button type="button" class="btn btn-action pull-right" placement="top" triggers="manual" #p="ngbPopover" (click)="p.open()" triggers=":mouseleave"
        ngbPopover="{{'Changes saved' | translate}}"
        [popoverTitle]="popoverTitle" translate>Save
    </button>`
})
export class PopoverSaveButton {

  popoverText: string;
  popoverTitle: string;
  @Input() disabled: boolean = false;

  setTitle(title: string) {
    this.popoverTitle = title;
  }

  setText(text: string) {
    this.popoverText = text;
  }

  setDisabled(disabled: boolean) {
    this.disabled = disabled;
  }
}
