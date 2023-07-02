import { Notice, Plugin, FileSystemAdapter } from "obsidian";
import { GitService, SimpleGitService } from "@/services/gitService";

const PLUGIN_ICON = "sync";
const PLUGIN_NAME = "YAOS";

export default class YaosPlugin extends Plugin {
  private gitService?: GitService;

  async onload() {
    this.gitService = new SimpleGitService(this.getBasePath());

    this.addRibbonIcon(
      PLUGIN_ICON,
      PLUGIN_NAME,
      this.handleRibbonIconClick.bind(this)
    );
  }

  getBasePath(): string {
    return (this.app.vault.adapter as FileSystemAdapter).getBasePath();
  }

  showNotice(message: string): void {
    new Notice(`${PLUGIN_NAME}: ${message}`);
  }

  async handleRibbonIconClick(_evt: MouseEvent) {
    if (!this.gitService) {
      return;
    }

    if (await this.gitService.isGitInitialized()) {
      this.showNotice("Vault is initialized as a Git repository.");
    } else {
      this.showNotice("Vault is not initialized as a Git repository.");
    }

    if (await this.gitService.isRemoteConfigured()) {
      this.showNotice("Remote repository is configured.");
    } else {
      this.showNotice("Remote repository is not configured.");
    }
  }
}
