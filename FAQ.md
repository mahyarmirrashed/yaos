# Frequently Asked Questions (FAQ)

## How do I install Git on my machine?

### Windows

1. Download the official Git for Windows installer from the [Git website](https://git-scm.com/download/win); and
2. Run the installer and follow the prompts to install Git.

### macOS

1. If you have installed Xcode (or its Command Line Tools), Git may already be installed. You can check by opening Terminal and typing `git --version`;
2. If Git is not installed, you can install it using Homebrew. First, install Homebrew by following the instructions on the [Homebrew website](https://brew.sh). Then, install Git by typing: brew `install git`.

### Linux

1. Open a terminal;
2. Install Git using your distribution's package manager. For example, on Ubuntu or Debian, you would type `sudo apt install git`.

## How do I create a new Git Repository?

1. Open a terminal;
2. Navigate to the directory where you want to create the repository; and
3. Type `git init` to initialize a new Git repository.

You can find more detailed instructions in the [Git Documentation](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#_git_cloning) or [GitHub's Help Pages](https://docs.github.com/en/get-started/quickstart/create-a-repo).

## How do I clone an existing Git Repository?

1. Open a terminal;
2. Navigate to the directory where you want to clone the repository;
3. Type `git clone [url]`, replacing `[url]` with the URL of the Git repository you want to clone.

You can find more detailed instructions in the [Git Documentation](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#_git_cloning) or [GitHub's Help Pages](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

## How do I use YAOS with my Obsidian Vault?

After you have installed Git and initialized or cloned a Git repository for your Obsidian vault, you can use YAOS to sync your vault with the repository. Simply press the "Sync" button in Obsidian to sync your vault. If there are conflicts between your local vault and the remote repository, YAOS will prompt you to resolve these conflicts.
