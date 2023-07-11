import { Notice } from "obsidian";

export const notifyUserAboutFailure = (message: string) =>
  new Notice(`FATAL: ${message}`);
