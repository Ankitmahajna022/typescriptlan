export interface IssueBook{
  id: string;
  bookId: string;
  memberId: string;
  issueDate: number;
  dueDate: string;
  returnDate?: string;
  fine: number;
}