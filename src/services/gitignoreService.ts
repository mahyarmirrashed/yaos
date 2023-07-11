import { GitService } from "@/services/gitService";
import logger from "@/utils/logger";

import { resolve } from "path";

const GITIGNORE_FILE_NAME = ".gitignore";

export class GitignoreService {
  private gitignorePath: string;

  constructor(basePath: string, private gitService: GitService) {
    logger.debug("Initializing GitignoreService...");
    this.gitignorePath = resolve(basePath, GITIGNORE_FILE_NAME);
    logger.debug("GitignoreService initialized.");
  }

  private async stageCommitAndPushGitignore(message: string) {
    await this.gitService.gitStage(GITIGNORE_FILE_NAME);
    await this.gitService.gitCommit(message);
    await this.gitService.gitPush();
  }
}
