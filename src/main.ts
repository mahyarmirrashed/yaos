import { Notice, Plugin } from "obsidian";

const PLUGIN_ICON = "sync";
const PLUGIN_NAME = "YAOS";

export default class YaosPlugin extends Plugin {
  async onload() {
    this.addRibbonIcon(PLUGIN_ICON, PLUGIN_NAME, (_evt: MouseEvent) => {
      new Notice("Clicked!");
    });
  }
}
