import { GitService } from "@/services/gitService";
import { promises as fs } from "fs";
import { resolve } from "path";

const GITIGNORE_FILE_NAME = ".gitignore";
const OBSIDIAN_FOLDER_NAME = ".obsidian/";

const GITIGNORE_LINE = "\n# ignore obsidian vault state\n.obsidian/\n";

export class GitignoreService {
  private gitignorePath: string;

  constructor(private basePath: string, private gitService: GitService) {
    this.gitignorePath = resolve(basePath, GITIGNORE_FILE_NAME);
  }

  private async ensureGitignoreExists() {
    try {
      await fs.access(this.gitignorePath);
    } catch {
      await fs.writeFile(this.gitignorePath, "");
    }
  }

  async ensureObsidianIgnored(): Promise<void> {
    const obsidianFolderPath = resolve(this.basePath, OBSIDIAN_FOLDER_NAME);

    if (await this.gitService.isPathTracked(obsidianFolderPath)) {
      await this.gitService.removePathFromHistory(`${OBSIDIAN_FOLDER_NAME}*`);

      await this.ensureGitignoreExists();
      await fs.appendFile(this.gitignorePath, GITIGNORE_LINE);
    }
  }
}
