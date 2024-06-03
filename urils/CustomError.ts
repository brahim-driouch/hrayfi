import { ZodIssue } from "zod";


export class CustomError extends Error {
    issues :ZodIssue[]
  constructor(issues:ZodIssue[]) {
    super();
    this.issues = issues
  }
}
