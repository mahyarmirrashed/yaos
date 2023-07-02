import simpleGit, { SimpleGit } from "simple-git";

export interface GitService {
  isGitInitialized(): Promise<boolean>;
  isRemoteConfigured(): Promise<boolean>;
}

export class SimpleGitService implements GitService {
  private gitProvider: SimpleGit;

  constructor(private repoPath: string) {
    this.gitProvider = simpleGit(this.repoPath);
  }

  async isGitInitialized() {
    let gitInitialized = true;

    try {
      await this.gitProvider.revparse(["--is-inside-work-tree"]);
    } catch (_err) {
      gitInitialized = false;
    }

    return gitInitialized;
  }

  async isRemoteConfigured(): Promise<boolean> {
    let remoteConfigured = false;

    try {
      const remotes = await this.gitProvider.listRemote(["--get-url"]);
      remoteConfigured = !!remotes;
    } catch (_err) {
      remoteConfigured = false;
    }

    return remoteConfigured;
  }
}
