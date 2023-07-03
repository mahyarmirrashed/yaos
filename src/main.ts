import { GitService, SimpleGitService } from "@/services/gitService";
import { GitignoreService } from "@/services/gitignoreService";
import { PLUGIN_NAME } from "@/utils/constants";
import logger from "@/utils/logger";

import { FileSystemAdapter, Plugin } from "obsidian";
import SyncController from "./controllers/syncController";

const PLUGIN_ICON = "sync";

export default class YaosPlugin extends Plugin {
  private gitService?: GitService;
  private gitignoreService?: GitignoreService;
  private syncController?: SyncController;

  async onload() {
    logger.debug("Initializing plugin...");

    this.gitService = new SimpleGitService(this.getBasePath());
    this.gitignoreService = new GitignoreService(
      this.getBasePath(),
      this.gitService
    );
    this.syncController = new SyncController(
      this.gitService,
      this.gitignoreService
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
    } else if (!this.syncController) {
      logger.fatal("Sync controller was not initialized.");
      return;
    }

    await this.syncController.sync();
  }
}
