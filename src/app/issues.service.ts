import { Injectable } from '@angular/core';
import { issues } from '../assets/mock-issues'; //loads our mock data.
import { Issue } from './issue';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private issues: Issue[] = issues;

  constructor() { }

  getPendingIssues(): Issue[] {
    return this.issues.filter(issue => !issue.completed); //returns our  issues that have not been completed.
  }

  //inserts new issue into the array.
  createIssue(issue: Issue) {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
  }

  //creates a clone of the issues and sets it to completed property to current date finds the initial issue in the array and replaces it with cloned instances.
  completeIssue(issue: Issue) {
    const selectedIssue: Issue = {
      ...issue,
      completed: new Date()
    };
    const index = this.issues.findIndex(i => i === issue);
    this.issues[index] = selectedIssue;
  }

  //takes teh title of an issues as parameter and searches for any issues that contain the same title.
  getSuggestions(title: string): Issue[] {
    if (title.length > 3) {
      return this.issues.filter(issue => issue.title.indexOf(title) !== -1);
    }
    return [];
  }

  //allows us to update the issue.
   updateIssue(issueNo: number, issue: Issue) {
    const existingIssue = this.issues.find(i => i.issueNo === issueNo);
    if(existingIssue) {
      const index = this.issues.indexOf(existingIssue);
      this.issues[index] = {
        ...existingIssue,
        ...issue
      };
    }
  }

}
