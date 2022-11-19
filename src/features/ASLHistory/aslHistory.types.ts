export interface IAslHistoryState {
  status: "idle" | "loading" | "failed";

  history: string[] | undefined;
}
