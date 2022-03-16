import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {

  @Output() formClose = new EventEmitter();//output data to parent component which iss issuelist component.
  issueForm: FormGroup | undefined;
  suggestions: Issue[] = [];

  constructor(private builder: FormBuilder, private issueService: IssuesService) { }

  ngOnInit(): void {
    //our keys for the form
    this.issueForm = this.builder.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      type: ['', Validators.required]
    });
    //uses the data title value to return suggestions of related issues.
    this.issueForm.controls['title'].valueChanges.subscribe((title: string) => {
      this.suggestions = this.issueService.getSuggestions(title);
    });
  }

  addIssue() {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();//validates our form
      return;
    }

    this.issueService.createIssue(this.issueForm?.value);//calling the createIssue method from injected service.
    this.formClose.emit();//closing the form upon cancel button.
  }

}
