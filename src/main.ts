import SyncController from "@/controllers/syncController";
import { GitService, SimpleGitService } from "@/services/gitService";
import { GitignoreService } from "@/services/gitignoreService";
import { PLUGIN_NAME } from "@/utils/constants";
import logger from "@/utils/logger";
import { notifyUserAboutFailure } from "@/utils/notifier";
import UnmergedFilesView from "@/views/modals/unmergedFilesView";

import { FileSystemAdapter, Plugin } from "obsidian";

const PLUGIN_ICON = "sync";

export default class YaosPlugin extends Plugin {
  private gitService?: GitService;
  private gitignoreService?: GitignoreService;
  private syncController?: SyncController;

  async onload() {
    logger.debug("Initializing plugin...");

    const adapter = this.app.vault.adapter;

    if (adapter instanceof FileSystemAdapter) {
      const basePath = adapter.getBasePath();

      this.gitService = new SimpleGitService(basePath);
      this.gitignoreService = new GitignoreService(basePath, this.gitService);
      this.syncController = new SyncController(
        this.gitService,
        this.gitignoreService
      );

      this.addCommand({
        id: `show-unmerged`,
        name: "Show unmerged/conflicting files",
        callback: () => new UnmergedFilesView(this.app, this.gitService).open(),
      });
      this.addRibbonIcon(
        PLUGIN_ICON,
        PLUGIN_NAME,
        this.handleRibbonIconClick.bind(this)
      );

      logger.debug("Plugin initialized.");
    } else {
      notifyUserAboutFailure("Adapter type is not recognized.");

      logger.fatal("Logger type was not FileSystemAdapter.");
    }
  }

  private async handleRibbonIconClick(_evt: MouseEvent) {
    if (!this.gitService || !this.gitignoreService) {
      logger.fatal("Services were not initialized.");
    } else if (!this.syncController) {
      logger.fatal("Sync controller was not initialized.");
    } else {
      await this.syncController.sync();
    }
  }
}
