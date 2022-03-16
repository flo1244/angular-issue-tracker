import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {


  issues: Issue[] = [];
  showReportIssue = false; //toggle the appearance  of the report.
  selectedIssue: Issue | null = null;
  editIssue: Issue | null = null;

  constructor(private issueService: IssuesService) { }

  ngOnInit(): void {
    this.getIssues(); //get all pending issues upon initialization.
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.getIssues();
  }

  //calls the complete issue method of issue service property only when the confirmed parameter is true. getissues method to refresh data.
  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = null;
  }

   onCloseEdit() {
    this.editIssue = null;
    this.getIssues();
  }

  private getIssues() {
    this.issues = this.issueService.getPendingIssues(); //calling getPendingIssues of the injected service and keep its returned value.
  }


}
