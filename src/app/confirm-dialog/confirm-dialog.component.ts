import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() issueNo: number | null = null;//gets issue number so we can display it on template
  @Output() confirm = new EventEmitter<boolean>();// emit a boolean value to indicate whether the user confirmed to resolve the issue or not.

  constructor() { }

  ngOnInit(): void {
  }

  agree() {
    this.confirm.emit(true);
    this.issueNo = null;
  }

  disagree() {
    this.confirm.emit(false);
    this.issueNo = null;
  }

}
