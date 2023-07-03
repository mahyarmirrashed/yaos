import logger from "@/utils/logger";

import dayjs from "dayjs";
import simpleGit, { SimpleGit } from "simple-git";

const DEFAULT_REMOTE = "origin";
const DEFAULT_BRANCH = "main";

export interface GitService {
  gitPush(forcePush: boolean): Promise<void>;
  gitCommit(message: string): Promise<void>;
  gitStage(...files: string[]): Promise<void>;
  gitStageAll(): Promise<void>;
  gitUnstageAll(): Promise<void>;

  isGitInitialized(): Promise<boolean>;
  isPathCurrentlyTracked(path: string): Promise<boolean>;
  isPathPreviouslyTracked(path: string): Promise<boolean>;
  isRemoteConfigured(): Promise<boolean>;

  removePathFromHistory(path: string): Promise<void>;
}

export class SimpleGitService implements GitService {
  private gitProvider: SimpleGit;

  constructor(private repoPath: string) {
    logger.debug("Initializing SimpleGitService...");
    this.gitProvider = simpleGit(this.repoPath);
    logger.debug("SimpleGitService initialized.");
  }

  async gitCommit(
    message = `chore: vault backup from ${dayjs().format("YYYY-MM-DD-HH:mm")}`
  ): Promise<void> {
    await this.gitProvider.commit(message);
  }

  async gitPush(forcePush = false): Promise<void> {
    const options = forcePush ? ["-f"] : [];

    await this.gitProvider.push(DEFAULT_REMOTE, DEFAULT_BRANCH, options);
  }

  async gitStage(...files: string[]): Promise<void> {
    await Promise.all(files.map((file) => this.gitProvider.add(file)));
  }

  async gitStageAll(): Promise<void> {
    this.gitProvider.add("./*");
  }

  async gitUnstageAll(): Promise<void> {
    this.gitProvider.reset();
  }

  async isGitInitialized(): Promise<boolean> {
    let gitInitialized = true;

    try {
      await this.gitProvider.revparse(["--is-inside-work-tree"]);
    } catch {
      gitInitialized = false;
    }

    return gitInitialized;
  }

  async isPathCurrentlyTracked(path: string): Promise<boolean> {
    const status = await this.gitProvider.status();

    return !status.not_added.includes(path);
  }

  async isPathPreviouslyTracked(path: string): Promise<boolean> {
    const log = await this.gitProvider.log({ file: path });

    return log.all.length > 0;
  }

  async isRemoteConfigured(): Promise<boolean> {
    let remoteConfigured = false;

    try {
      const remotes = await this.gitProvider.listRemote(["--get-url"]);
      remoteConfigured = !!remotes;
    } catch {
      remoteConfigured = false;
    }

    return remoteConfigured;
  }

  async removePathFromHistory(path: string): Promise<void> {
    await this.gitProvider.raw([
      "filter-branch",
      "--force",
      "--index-filter",
      `git rm --cached --ignore-unmatch ${path}`,
      "--prune-empty",
      "--tag-name-filter",
      "cat",
      "--",
      "--all",
    ]);
  }
}
