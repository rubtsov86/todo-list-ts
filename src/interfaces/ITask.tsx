export interface ITask {
  title: string;
  status: "complete" | "incomplete";
  id: string;
  date: Date;
}
