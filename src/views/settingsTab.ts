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

    this.addDeviceNameSetting(containerEl);
  }

  private addDeviceNameSetting(el: HTMLElement) {
    new Setting(el)
      .setName("Device name")
      .setDesc(
        "This name will be displayed in the commit messages to indicate the sync source. Leave empty to use the default name."
      )
      .addText((text) =>
        text
          .setPlaceholder(DEFAULT_YAOS_SETTINGS.deviceName)
          .setValue(this.plugin.settings.deviceName)
          .onChange(async (deviceName) => {
            this.plugin.settings.deviceName = deviceName;
            await this.plugin.saveSettings();
          })
      );
  }
}
