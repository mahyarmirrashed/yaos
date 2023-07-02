export interface GitService {
  isGitInitialized(): Promise<boolean>;
}
