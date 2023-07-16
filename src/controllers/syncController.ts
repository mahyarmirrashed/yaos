import { GitService } from "@/services/gitService";
import { GitignoreService } from "@/services/gitignoreService";
import logger from "@/utils/logger";
import { notifyUserAboutFailure } from "@/utils/notifier";

import { Notice } from "obsidian";

export default class SyncController {
  constructor(
    private gitService: GitService,
    private gitignoreService: GitignoreService
  ) {
    logger.debug("Initialized sync controller.");
  }

  private async createVaultBackup() {
    if (await this.gitService.unstagedChangesExist()) {
      await this.handleUnstagedChanges();
    } else {
      logger.info("No changes in vault detected for backup.");
    }

    if (await this.gitService.isLocalAhead()) {
      await this.handleLocalAhead();
    }
  }

  private async handleLocalAhead() {
    try {
      await this.gitService.gitPush();

      this.notifyUserAboutBackup();
    } catch {
      logger.warn("Remote and local have conflicting changes!");
      logger.info("Starting rebase process...");

      try {
        await this.gitService.gitPullWithRebase();
        await this.gitService.gitPush();

        this.notifyUserAboutBackup();

        logger.success("Created vault backup.");
      } catch {
        this.notifyUserAboutConflicts();

        logger.error("Automatic rebasing failed.");
      }
    }
  }

  private async handleUnstagedChanges() {
    logger.info("Unstaged changes detected. Creating backup...");

    await this.gitService.gitStageAll();
    await this.gitService.gitCommit();
  }

  private notifyUserAboutBackup() {
    new Notice("Successfully backed up vault!");
  }

  private notifyUserAboutConflicts() {
    new Notice("Your local and remote repositories had conflicting changes.");
    new Notice("Please fix the changes and then click the sync button again.");
  }

  async sync() {
    if (await this.gitService.isRepo()) {
      logger.debug("Vault is initialized as a Git repository.");
    } else {
      logger.fatal("Vault is not initialized as a Git repository.");
      notifyUserAboutFailure("Vault is not a Git repository.");
      return;
    }

    if (await this.gitService.isRemoteConfigured()) {
      logger.debug("Remote repository is configured.");
    } else {
      logger.fatal("Remote repository is not configured.");
      notifyUserAboutFailure("Remote repository is not configured.");
      return;
    }

    if (await this.gitService.isRebasing()) {
      logger.debug("Stopping in progress rebase.");

      await this.gitService.stopRebasing();
    }

    await this.createVaultBackup();
  }
}
