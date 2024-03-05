import YaosPlugin from "@/main";
import { BooleanKeys } from "@/types";

import { App, PluginSettingTab, Setting } from "obsidian";

import os from "os";
import simpleGit, { SimpleGit } from "simple-git";

const GITHUB_ISSUE_LINK =
  "https://github.com/mahyarmirrashed/yaos/issues/new/choose";
const SAMPLE_REPO = "git@github.com:adapole/obsidian-yaos.git";


export interface YaosSettings {
  deviceName: string;
  remoteRepo: string;
  basePath: string;
  branchName: string;
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
  remoteRepo: SAMPLE_REPO,
  basePath: __dirname,
  branchName: "main",
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
  private gitProvider: SimpleGit;

  constructor(app: App, plugin: YaosPlugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.gitProvider = simpleGit();
  }

  display() {
    const { containerEl } = this;

    containerEl.empty();

    this.addGeneralSection(containerEl);
    this.addGitSetup(containerEl)
  }

  private addGeneralSection(el: HTMLElement) {
    el.createEl("h2", { text: "General" });
    this.addDeviceNameSetting(el);
    this.addCreateIssueSetting(el);
  }

  private addGitSetup(el: HTMLElement) {
    el.createEl("h2", { text: "Setup Git" });
    this.addBranchName(el);
    this.addRemoteRepoURL(el);
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

  private addRemoteRepoURL(el: HTMLElement) {
    new Setting(el)
      .setName("Import repository")
      .setDesc(
        "If you want to import a vault from a remote repository, add the URL and Import to the directory you want."
      ).addText((text) =>
      text
        .setPlaceholder(SAMPLE_REPO)
        .setValue(this.plugin.settings.remoteRepo)
        .onChange(async (remoteRepo) => {
          this.plugin.settings.remoteRepo = remoteRepo;
          await this.plugin.saveSettings();
        })
    );
    new Setting(el).addText((text) =>
    text
      .setPlaceholder("C:/Users/")
      .setValue(this.plugin.settings.basePath)
      .onChange(async (basePath) => {
        this.plugin.settings.basePath = basePath;
        await this.plugin.saveSettings();
      })
  );
      
    new Setting(el).addButton((button) =>
    button
      .setButtonText("Import")
      .setTooltip("Import a remote repository")
      .setCta()
      .onClick(async () => {
        try {
          const remoteRepo =  `${this.plugin.settings.remoteRepo}`;
          await this.gitProvider.clone(remoteRepo,`${this.plugin.settings.basePath}`).fetch();
        } catch (error) {
          
        }
      })
  );
  }

  private addBranchName(el: HTMLElement) {
    new Setting(el)
      .setName("Select branch")
      .setDesc(
        "Set the working branch."
      ).addText((text) =>
      text
        .setPlaceholder("main")
        .setValue(this.plugin.settings.branchName)
        .onChange(async (branchName) => {
          this.plugin.settings.branchName = branchName;
          await this.plugin.saveSettings();
        })
    );
    new Setting(el).addButton((button) =>
    button
      .setButtonText("Switch")
      .setTooltip("Switch to this branch")
      .setCta()
      .onClick(async () => {
        let git = simpleGit(this.plugin.settings.basePath);
        try {
          await git.checkoutBranch(`${this.plugin.settings.branchName}`,"HEAD");

        } catch (error) {
          await git.checkout(`${this.plugin.settings.branchName}`);
          
        }
      })
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
