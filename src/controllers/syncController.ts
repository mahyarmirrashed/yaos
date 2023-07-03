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
}
