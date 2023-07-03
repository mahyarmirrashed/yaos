import { GitService } from "@/services/gitService";
import { GitignoreService } from "@/services/gitignoreService";
import logger from "@/utils/logger";

export default class SyncController {
  constructor(
    private gitService: GitService,
    private gitignoreService: GitignoreService
  ) {
    logger.debug("Initialized sync controller.");
  }
  async sync(): Promise<void> {
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

    if (await this.gitService.isRebasing())
      await this.gitService.stopRebasing();
  }
}
