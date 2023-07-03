import { GitService, SimpleGitService } from "@/services/gitService";
import { GitignoreService } from "@/services/gitignoreService";
import { PLUGIN_NAME } from "@/utils/constants";
import logger from "@/utils/logger";

import { FileSystemAdapter, Plugin } from "obsidian";

const PLUGIN_ICON = "sync";

export default class YaosPlugin extends Plugin {
  private gitService?: GitService;
  private gitignoreService?: GitignoreService;

  async onload() {
    logger.debug("Initializing plugin...");

    this.gitService = new SimpleGitService(this.getBasePath());
    this.gitignoreService = new GitignoreService(
      this.getBasePath(),
      this.gitService
    );

    this.addRibbonIcon(
      PLUGIN_ICON,
      PLUGIN_NAME,
      this.handleRibbonIconClick.bind(this)
    );

    logger.debug("Plugin initialized.");
  }

  private getBasePath(): string {
    return (this.app.vault.adapter as FileSystemAdapter).getBasePath();
  }

  private async handleRibbonIconClick(_evt: MouseEvent) {
    if (!this.gitService || !this.gitignoreService) {
      logger.fatal("Services were not initialized.");
      return;
    }

    if (await this.gitService.isGitInitialized()) {
      logger.debug("Vault is initialized as a Git repository.");
    } else {
      logger.fatal("Vault is not initialized as a Git repository.");
      return;
    }

    if (await this.gitService.isRemoteConfigured()) {
      logger.debug("Remote repository is configured.");
    } else {
      logger.fatal("Remote repository is not configured.");
      return;
    }

    await this.gitignoreService.ensureObsidianIgnored();
  }
}
