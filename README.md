# YAOS (Yet Another Obsidian Synchronizer) :arrows_clockwise:

![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22yet-another-obsidian-synchronizer%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)

YAOS is a minimalist Obsidian plugin designed to provide a simple and intuitive Git synchronization experience for your Obsidian vault. It's inspired by the simplicity of Obsidian's paid sync functionality and aims to bring that same ease of use to users who prefer to privately manage their vault with Git.

## Features

- **Single Sync Button**: YAOS provides a single sync button that handles all your Git operations. No need to worry about multiple commands or complex workflows.
- **Conflict Resolution**: If YAOS detects conflicts between your local vault and the remote repository, it will prompt you to resolve these conflicts before proceeding with the sync.
- **Minimalist Design**: YAOS is designed with minimalism in mind. It provides just the features that you need to manage your vault with Git, without any added unnecessary complexity.
- **Easy Branch Switch Setting**: YAOS provides a simple branch switch setting. No need to use git commands to switch branch or for pushing new branch to remote.

## Prerequisites

YAOS assumes that you have a basic understanding of Git. Check the links below to get started.

- **Install Git**: download git from [this link](https://git-scm.com/downloads).
- **Configure username and email**: follow this [guide](https://support.atlassian.com/bitbucket-cloud/docs/configure-your-dvcs-username-for-commits/) to setup git username and email for local machine.
- **Optional (ssh-key)**: Generate ssh-key and add to github account. Refer to [docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

## Usage

After installing the plugin, you'll find a new "Sync" button in Obsidian. Simply press this button to sync your vault with your remote Git repository.

If there are conflicts between your local vault and the remote repository that cannot be resolved automagically with Git, YAOS will prompt you to resolve these conflicts manually. Once you're resolved the conflicts, press the "Sync" button again to complete the sync process.

## Installation

To install YAOS, follow these steps:

1. In Obsidian, open "Settings" &rarr; "Community plugins".
2. Click "Browse" and search for "Yet Another Obsidian Synchronizer".
3. Click "Install".
4. In the "Installed plugins" section, enable "Yet Another Obsidian Synchronizer".

## Contributing

Contributions to YAOS are welcome! Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) file for more information.

## License

YAOS is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Support

If you encounter any issues or have any questions about YAOS, please open an issue on the GitHub repository.

---

I hope you find YAOS useful in your Obsidian workflow. Happy writing!
