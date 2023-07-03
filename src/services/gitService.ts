import logger from "@/utils/logger";
import simpleGit, { SimpleGit } from "simple-git";

export interface GitService {
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

  async isGitInitialized() {
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
