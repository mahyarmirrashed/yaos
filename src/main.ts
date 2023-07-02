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

  async handleRibbonIconClick(_evt: MouseEvent) {
    if (!this.gitService) {
      return;
    }

    if (await this.gitService.isGitInitialized()) {
      new Notice("Vault is initialized as a Git repository.");
    } else {
      new Notice("Vault is not initialized as a Git repository.");
    }
  }
}
