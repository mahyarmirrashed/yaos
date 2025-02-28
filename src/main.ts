import SyncController from "@/controllers/syncController";
import { GitService, SimpleGitService } from "@/services/gitService";
import { GitignoreService } from "@/services/gitignoreService";

import { PLUGIN_NAME } from "@/utils/constants";
import logger from "@/utils/logger";
import { notifyUserAboutFailure } from "@/utils/notifier";

import UnmergedFilesView from "@/views/modals/unmergedFilesView";
import YaosSettingTab, {
  DEFAULT_YAOS_SETTINGS,
  YaosSettings,
} from "@/views/settingsTab";

import { FileSystemAdapter, Notice, Plugin } from "obsidian";

const PLUGIN_ICON = "sync";

export default class YaosPlugin extends Plugin {
  private gitService?: GitService;
  private gitignoreService?: GitignoreService;
  private syncController?: SyncController;

  settings: YaosSettings = DEFAULT_YAOS_SETTINGS;

  async onload() {
    logger.debug("Initializing plugin...");

    try {
      await this.loadSettings();

      logger.info("Loaded settings.");
    } catch {
      logger.error("Failed to load settings.");
    }

    const adapter = this.app.vault.adapter;

    if (adapter instanceof FileSystemAdapter) {
      const basePath = adapter.getBasePath();

      this.gitService = new SimpleGitService(basePath, this.settings);
      this.gitignoreService = new GitignoreService(basePath, this.gitService);
      this.syncController = new SyncController(
        this.gitService,
        this.gitignoreService
      );

      this.addCommand({
        id: "show-unmerged",
        name: "Show unmerged/conflicting files",
        callback: () => new UnmergedFilesView(this.app, this.gitService).open(),
      });
      this.addCommand({
        id: "sync",
        name: "Sync your vault",
        callback: async () => {
          await this.syncVault();
        },
      });
      this.addRibbonIcon(PLUGIN_ICON, PLUGIN_NAME, this.syncVault.bind(this));
      this.addSettingTab(new YaosSettingTab(this.app, this));

      logger.debug("Plugin initialized.");

      if (this.settings.onLoadSync) await this.syncVault();
    } else {
      notifyUserAboutFailure("Adapter type is not recognized.");

      logger.fatal("Logger type was not FileSystemAdapter.");
    }
  }

  async onunload() {
    if (this.settings.onLoadSync) await this.syncVault();
  }

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_YAOS_SETTINGS,
      await this.loadData()
    );

    if (this.settings.deviceName === "")
      this.settings.deviceName = DEFAULT_YAOS_SETTINGS.deviceName;
  }

  async saveSettings(settings = this.settings) {
    await this.saveData(settings);
  }

  private async syncVault(_evt?: MouseEvent) {
    if (!this.gitService || !this.gitignoreService) {
      logger.fatal("Services were not initialized.");
    } else if (!this.syncController) {
      logger.fatal("Sync controller was not initialized.");
    } else {
      try {
        await this.syncController.sync();
      } catch (e) {
        new Notice("Unknown error occurred. Please create an issue.");

        logger.fatal("Unknown error:", e);
      }
    }
  }
}
