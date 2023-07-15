import YaosPlugin from "@/main";
import { BooleanKeys } from "@/types";

import { App, PluginSettingTab, Setting } from "obsidian";

import os from "os";

const GITHUB_ISSUE_LINK =
  "https://github.com/mahyarmirrashed/yaos/issues/new/choose";

export interface YaosSettings {
  deviceName: string;
  syncImages: boolean;
  syncAudio: boolean;
  syncVideos: boolean;
  syncPdfs: boolean;
  syncOtherFiles: boolean;
  syncMainSettings: boolean;
  syncAppearanceSettings: boolean;
  syncThemesAndSnippets: boolean;
  syncHotkeys: boolean;
  syncCorePluginSettings: boolean;
  syncCommunityPluginSettings: boolean;
}

type YaosSettingOptions<K extends BooleanKeys<YaosSettings>> = {
  propertyName: K;
  settingName: string;
  settingDesc: string;
};

export const DEFAULT_YAOS_SETTINGS: YaosSettings = {
  deviceName: os.hostname(),
  syncImages: false,
  syncAudio: false,
  syncVideos: false,
  syncPdfs: false,
  syncOtherFiles: false,
  syncMainSettings: false,
  syncAppearanceSettings: false,
  syncThemesAndSnippets: false,
  syncHotkeys: false,
  syncCorePluginSettings: false,
  syncCommunityPluginSettings: false,
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

    this.addGeneralSection(containerEl);
    this.addSelectiveSection(containerEl);
  }

  private addGeneralSection(el: HTMLElement) {
    el.createEl("h2", { text: "General" });
    this.addDeviceNameSetting(el);
    this.addCreateIssueSetting(el);
  }

  private addSelectiveSection(el: HTMLElement) {
    el.createEl("h2", { text: "Selective sync" });
    this.addToggleSetting(el, {
      propertyName: "syncImages",
      settingName: "Sync images",
      settingDesc:
        "Sync image files with these extensions: bmp, png, jpg, jpeg, gif, svg, webp.",
    });
    this.addToggleSetting(el, {
      propertyName: "syncAudio",
      settingName: "Sync audio",
      settingDesc:
        "Sync audio files with these extensions: mp3, wav, m4a, 3gp, flac, ogg, oga, opus.",
    });
    this.addToggleSetting(el, {
      propertyName: "syncVideos",
      settingName: "Sync videos",
      settingDesc:
        "Sync video files with these extensions: mp4, webm, ogv, mov, mkv.",
    });
    this.addToggleSetting(el, {
      propertyName: "syncPdfs",
      settingName: "Sync PDFs",
      settingDesc: "Sync PDF files.",
    });
    this.addToggleSetting(el, {
      propertyName: "syncOtherFiles",
      settingName: "Sync all other types",
      settingDesc: "Sync unsupported file types.",
    });
  }

  private addVaultSection(el: HTMLElement) {
    el.createEl("h2", { text: "Vault configuration sync" });
    this.addDisabledToggleSetting(el, {
      propertyName: "syncMainSettings",
      settingName: "Sync main settings",
      settingDesc: "Sync editor settings, files, link settings, and others.",
    });
    this.addDisabledToggleSetting(el, {
      propertyName: "syncAppearanceSettings",
      settingName: "Sync appearance settings",
      settingDesc:
        "Sync appearance settings like dark mode, active theme, and enabled snippets.",
    });
    this.addDisabledToggleSetting(el, {
      propertyName: "syncThemesAndSnippets",
      settingName: "Sync themes and snippets",
      settingDesc:
        "Sync downloaded themes and snippets. Whether they are enabled depends on the previous setting.",
    });
    this.addDisabledToggleSetting(el, {
      propertyName: "syncHotkeys",
      settingName: "Sync hotkeys",
      settingDesc: "Sync custom hotkeys.",
    });
    this.addDisabledToggleSetting(el, {
      propertyName: "syncCorePluginSettings",
      settingName: "Sync core plugin settings",
      settingDesc: "Sync core plugin settings.",
    });
    this.addDisabledToggleSetting(el, {
      propertyName: "syncCommunityPluginSettings",
      settingName: "Sync community plugin settings",
      settingDesc: "Sync core plugin settings.",
    });
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

  private addCreateIssueSetting(el: HTMLElement) {
    new Setting(el)
      .setName("Contact support")
      .setDesc(
        "If you run into any issues working with this plugin, please let us know by creating an issue on our GitHub page."
      )
      .addButton((button) =>
        button
          .setButtonText("Create issue")
          .setTooltip("Create an issue on GitHub")
          .setCta()
          .onClick(() => self.open(GITHUB_ISSUE_LINK, "_blank", "norefferrer"))
      );
  }

  private addDisabledToggleSetting<K extends BooleanKeys<YaosSettings>>(
    el: HTMLElement,
    options: YaosSettingOptions<K>
  ) {
    this.addToggleSetting(el, options, true);
  }

  private addToggleSetting<K extends BooleanKeys<YaosSettings>>(
    el: HTMLElement,
    options: YaosSettingOptions<K>,
    disabled = false
  ) {
    const { propertyName, settingName, settingDesc } = options;

    new Setting(el)
      .setName(settingName)
      .setDesc(settingDesc)
      .addToggle((toggle) =>
        toggle
          .setValue(disabled ? true : this.plugin.settings[propertyName])
          .setDisabled(disabled)
          .onChange(async (value) => {
            this.plugin.settings[propertyName] = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
