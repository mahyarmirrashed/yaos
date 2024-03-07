import logger from "@/utils/logger";
import { YaosSettings } from "@/views/settingsTab";

import dayjs from "dayjs";
import simpleGit, { SimpleGit } from "simple-git";

const DEFAULT_REMOTE = "origin";
const DEFAULT_BRANCH = "main";

const CURRENT_TIME = () => dayjs().format("YYYY-MM-DDTHH:mm");
const COMMIT_MESSAGE = (deviceName: string) =>
  `chore: vault backup from ${deviceName} at ${CURRENT_TIME()}`;

export interface GitService {
  settings: YaosSettings;

  gitCommit(message?: string): Promise<void>;
  gitPullWithRebase(): Promise<void>;
  gitPull(branch?: string): Promise<void>;
  gitPushUpstream(branch?: string): Promise<void>;
  gitPush(forcePush?: boolean,branch?: string): Promise<void>;
  gitStage(...files: string[]): Promise<void>;
  gitStageAll(): Promise<void>;

  isLocalAhead(): Promise<boolean>;
  isRebasing(): Promise<boolean>;
  isRemoteConfigured(): Promise<boolean>;
  isRepo(): Promise<boolean>;

  getConflictingFiles(): Promise<string[]>;
  stopRebasing(): Promise<void>;
  unstagedChangesExist(): Promise<boolean>;
}

export class SimpleGitService implements GitService {
  private gitProvider: SimpleGit;

  constructor(repoPath: string, public settings: YaosSettings) {
    logger.debug("Initializing SimpleGitService...");
    this.gitProvider = simpleGit(repoPath);
    logger.debug("SimpleGitService initialized.");
  }

  async gitCommit(message = COMMIT_MESSAGE(this.settings.deviceName)) {
    logger.info(`Committing... ${message}`);

    await this.gitProvider.commit(message);
  }

  async gitPullWithRebase() {
    await this.gitProvider.pull(["--rebase"]);
  }

  async gitPull(branch = this.settings.branchName) {
    await this.gitProvider.pull(DEFAULT_REMOTE, branch, ["--rebase"]);
  }

  async gitPushUpstream(branch = this.settings.branchName) {
    await this.gitProvider.push(DEFAULT_REMOTE, branch, ["--set-upstream","--force"]);

    logger.info(`Pushed branch upstream to ${DEFAULT_REMOTE}/${branch}.`);
  }

  async gitPush(forcePush = false, branch = this.settings.branchName) {
    const options = forcePush ? ["-f"] : [];

    await this.gitProvider.push(DEFAULT_REMOTE, branch, options);

    logger.info(`Pushed changes to ${DEFAULT_REMOTE}/${branch}.`);
  }

  async gitStage(...files: string[]) {
    await Promise.all(files.map((file) => this.gitProvider.add(file)));
  }

  async gitStageAll() {
    await this.gitProvider.add("./*");
  }

  async isLocalAhead() {
    return this.gitProvider.status().then((status) => status.ahead > 0);
  }

  async isRebasing() {
    return this.gitProvider
      .raw(["status"])
      .then((status) => status.includes("rebase"));
  }

  async isRemoteConfigured() {
    let remoteConfigured = false;

    try {
      const remotes = await this.gitProvider.listRemote(["--get-url"]);
      remoteConfigured = !!remotes;
    } catch {
      remoteConfigured = false;
    }

    return remoteConfigured;
  }

  async isRepo() {
    return this.gitProvider.checkIsRepo();
  }

  async getConflictingFiles() {
    return this.gitProvider.status().then((status) => status.conflicted);
  }

  async stopRebasing() {
    process.env.GIT_EDITOR = "true";

    await this.gitStageAll();
    await this.gitProvider.rebase(["--continue"]);
    await this.gitPush();

    process.env.GIT_EDITOR = undefined;
  }

  async unstagedChangesExist() {
    return this.gitProvider
      .status()
      .then((status) => status.files.length > 0 || status.not_added.length > 0);
  }
}
