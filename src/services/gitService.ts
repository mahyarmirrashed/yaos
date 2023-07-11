import logger from "@/utils/logger";

import dayjs from "dayjs";
import simpleGit, { SimpleGit } from "simple-git";

const DEFAULT_REMOTE = "origin";
const DEFAULT_BRANCH = "main";

export interface GitService {
  gitCommit(message?: string): Promise<void>;
  gitPullWithRebase(): Promise<void>;
  gitPush(forcePush?: boolean): Promise<void>;
  gitStage(...files: string[]): Promise<void>;
  gitStageAll(): Promise<void>;
  gitUnstageAll(): Promise<void>;

  isGitInitialized(): Promise<boolean>;
  isLocalAhead(): Promise<boolean>;
  isPathCurrentlyTracked(path: string): Promise<boolean>;
  isPathPreviouslyTracked(path: string): Promise<boolean>;
  isRebasing(): Promise<boolean>;
  isRemoteAhead(): Promise<boolean>;
  isRemoteConfigured(): Promise<boolean>;

  getConflictingFiles(): Promise<string[]>;
  stopRebasing(): Promise<void>;
  unstagedChangesExist(): Promise<boolean>;
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
    logger.info(`Committing... ${message}`);

    await this.gitProvider.commit(message);
  }

  async gitPullWithRebase(): Promise<void> {
    await this.gitProvider.pull(["--rebase"]);
  }

  async gitPush(forcePush = false): Promise<void> {
    const options = forcePush ? ["-f"] : [];

    await this.gitProvider.push(DEFAULT_REMOTE, DEFAULT_BRANCH, options);

    logger.info(`Pushed changes to ${DEFAULT_REMOTE}/${DEFAULT_BRANCH}.`);
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

  async isLocalAhead(): Promise<boolean> {
    const status = await this.gitProvider.status();

    return status.ahead > 0;
  }

  async isPathCurrentlyTracked(path: string): Promise<boolean> {
    const status = await this.gitProvider.status();

    return status.not_added.some((filePath) => filePath.startsWith(path));
  }

  async isPathPreviouslyTracked(path: string): Promise<boolean> {
    const log = await this.gitProvider.log({ file: path });

    return log.all.length > 0;
  }

  async isRebasing(): Promise<boolean> {
    const status = await this.gitProvider.status();

    return status.current !== DEFAULT_BRANCH;
  }

  async isRemoteAhead(): Promise<boolean> {
    const status = await this.gitProvider.status();

    return status.behind > 0;
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

  async getConflictingFiles(): Promise<string[]> {
    const status = await this.gitProvider.status();

    return status.conflicted;
  }

  async stopRebasing(): Promise<void> {
    process.env.GIT_EDITOR = "true";

    await this.gitStageAll();
    await this.gitProvider.rebase(["--continue"]);
    await this.gitPush();

    process.env.GIT_EDITOR = undefined;
  }

  async unstagedChangesExist(): Promise<boolean> {
    const status = await this.gitProvider.status();

    return status.files.length > 0 || status.not_added.length > 0;
  }
}
