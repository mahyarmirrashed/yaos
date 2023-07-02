import { GitService, SimpleGitService } from "@/services/gitService";
import { GitignoreService } from "@/services/gitignoreService";
import { FileSystemAdapter, Notice, Plugin } from "obsidian";

const PLUGIN_ICON = "sync";
const PLUGIN_NAME = "YAOS";

export default class YaosPlugin extends Plugin {
  private gitService?: GitService;
  private gitignoreService?: GitignoreService;

  async onload() {
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
  }

  private getBasePath(): string {
    return (this.app.vault.adapter as FileSystemAdapter).getBasePath();
  }

  private showNotice(message: string): void {
    new Notice(`${PLUGIN_NAME}: ${message}`);
  }

  private async handleRibbonIconClick(_evt: MouseEvent) {
    if (!this.gitService || !this.gitignoreService) {
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

    await this.gitignoreService.ensureObsidianIgnored();
  }
}
