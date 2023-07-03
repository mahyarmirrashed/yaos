import { GitService } from "@/services/gitService";
import logger from "@/utils/logger";

import { promises as fs } from "fs";
import { resolve } from "path";

const GITIGNORE_FILE_NAME = ".gitignore";
const OBSIDIAN_FOLDER_NAME = ".obsidian/";

const GITIGNORE_LINE = "# ignore obsidian vault state\n.obsidian/\n";

export class GitignoreService {
  private gitignorePath: string;

  constructor(private basePath: string, private gitService: GitService) {
    logger.debug("Initializing GitignoreService...");
    this.gitignorePath = resolve(basePath, GITIGNORE_FILE_NAME);
    logger.debug("GitignoreService initialized.");
  }

  async ensureObsidianIgnored(): Promise<void> {
    logger.debug(`Ensuring ${OBSIDIAN_FOLDER_NAME} directory is ignored...`);

    const obsidianFolderPath = resolve(this.basePath, OBSIDIAN_FOLDER_NAME);

    if (await this.gitService.isPathPreviouslyTracked(obsidianFolderPath)) {
      await this.handlePreviouslyTrackedObsidian();
    }

    if (await this.gitService.isPathCurrentlyTracked(obsidianFolderPath)) {
      await this.handleCurrentlyTrackedObsidian();
    }
  }

  private async handleCurrentlyTrackedObsidian() {
    logger.warn(`${OBSIDIAN_FOLDER_NAME} is being tracked.`);

    try {
      await fs.access(this.gitignorePath);
      await fs.appendFile(this.gitignorePath, `\n${GITIGNORE_LINE}`);
      await this.stageCommitAndPushGitignore("chore: ignore `.obsidian/`");
    } catch {
      logger.warn(`${GITIGNORE_FILE_NAME} file did not exist.`);
      logger.info(`Created ${GITIGNORE_FILE_NAME}.`);

      await fs.writeFile(this.gitignorePath, GITIGNORE_LINE);
      await this.stageCommitAndPushGitignore("chore: create `.gitignore`");
    }
  }

  private async handlePreviouslyTrackedObsidian() {
    logger.warn(`${OBSIDIAN_FOLDER_NAME} was being previously tracked.`);

    await this.gitService.removePathFromHistory(`${OBSIDIAN_FOLDER_NAME}*`);
    await this.gitService.gitPush(true);
  }

  private async stageCommitAndPushGitignore(message: string): Promise<void> {
    await this.gitService.gitStage(GITIGNORE_FILE_NAME);
    await this.gitService.gitCommit(message);
    await this.gitService.gitPush();
  }
}
