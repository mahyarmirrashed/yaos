import { GitService } from "@/services/gitService";
import logger from "@/utils/logger";

import { promises as fs } from "fs";
import { resolve } from "path";

const GITIGNORE_FILE_NAME = ".gitignore";
const OBSIDIAN_FOLDER_NAME = ".obsidian/";

const GITIGNORE_LINE = "\n# ignore obsidian vault state\n.obsidian/\n";

export class GitignoreService {
  private gitignorePath: string;

  constructor(private basePath: string, private gitService: GitService) {
    logger.debug("Initializing GitignoreService...");
    this.gitignorePath = resolve(basePath, GITIGNORE_FILE_NAME);
    logger.debug("GitignoreService initialized.");
  }

  private async ensureGitignoreExists() {
    try {
      await fs.access(this.gitignorePath);
    } catch {
      logger.warn(`${GITIGNORE_FILE_NAME} file did not exist... creating one.`);

      await fs.writeFile(this.gitignorePath, "");
    }
  }

  async ensureObsidianIgnored(): Promise<void> {
    logger.debug(`Ensuring ${OBSIDIAN_FOLDER_NAME} directory is ignored...`);

    const obsidianFolderPath = resolve(this.basePath, OBSIDIAN_FOLDER_NAME);

    if (await this.gitService.isPathTracked(obsidianFolderPath)) {
      logger.warn(`${OBSIDIAN_FOLDER_NAME} was being tracked.`);

      await this.gitService.removePathFromHistory(`${OBSIDIAN_FOLDER_NAME}*`);

      await this.ensureGitignoreExists();
      await fs.appendFile(this.gitignorePath, GITIGNORE_LINE);
    }
  }
}
