import YaosPlugin from "@/main";

import { App, PluginSettingTab, Setting } from "obsidian";

import os from "os";

export interface YaosSettings {
  deviceName: string;
}

export const DEFAULT_YAOS_SETTINGS: YaosSettings = {
  deviceName: os.hostname(),
};

export default class YaosSettingTab extends PluginSettingTab {
  plugin: YaosPlugin;

  constructor(app: App, plugin: YaosPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;

    containerEl.empty();
  }
}
