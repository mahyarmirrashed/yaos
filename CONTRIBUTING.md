<!-- omit in toc -->

# Contributing to YAOS

First off, thanks for taking the time to contribute! :heart:

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It makes it a lot easier for me and smooth out the experience for all involved. The community looks forward to your contributions. :tada:

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which I would also be very happy about:
>
> - Star the project :star:
> - Tweet about it :bird:
> - Refer this project in your project's `README.md`
> - Mention the project at local meetups and tell your friends/colleagues

<!-- omit in toc -->

## Table of Contents

- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Your First Code Contribution](#your-first-code-contribution)
- [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
- [Commit Messages](#commit-messages)
- [Join The Project Team](#join-the-project-team)

## I Have a Question

> If you want to ask a question, I assume that you have read the available [FAQ](./FAQ.md).

Before you ask a question, it is best to search for existing [Issues](https://github.com/mahyarmirrashed/yaos/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, I recommend the following:

- Open an [Issue](https://github.com/mahyarmirrashed/yaos/issues/new);
- Provide as much context as you can about what you're running into; and
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

I will then take care of the issue as soon as possible.

## I Want To Contribute

> ### Legal Notice <!-- omit in toc -->
>
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project licence.

### Reporting Bugs

<!-- omit in toc -->

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, please investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help me fix any potential bug as fast as possible.

- Make sure that you are using the latest version;
- Determine if your bug is really a bug and not an error on your side (e.g. using incompatible environment components/versions);
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/mahyarmirrashed/yaos/issues?q=label%3Abug);
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue;
- Collect information about the bug:
  - Stack trace;
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM);
  - Git version, NodeJS version, and repository provider;
  - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

<!-- omit in toc -->

#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to <mahyarmirrashed@users.noreply.github.com>.

<!-- You may add a PGP key to allow the messages to be sent encrypted as well. -->

I use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/mahyarmirrashed/yaos/issues/new);
- Explain the behaviour you would expect and the actual behaviour;
- Please provide as much context as possible and describe the _reproduction steps_ that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case; and
- Provide the information you collected in the previous section.

Once it's filed:

- I'll label the issue accordingly;
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs with the `needs-repro` tag will not be addressed until they are reproduced.
- If I'm able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such as `critical`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).

<!-- You might want to create an issue template for bugs and errors that can be used as a guide and that defines the structure of the information to be included. If you do so, reference it here in the description. -->

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for YAOS, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help me and the community to understand your suggestion and find related suggestions.

<!-- omit in toc -->

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [FAQ](./FAQ.md) carefully and find out if the functionality is already covered, maybe by an individual configuration;
- Perform a [search](https://github.com/mahyarmirrashed/yaos/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one; and
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince users of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset. If you're just targeting a minority of users, consider forking this repository instead.

<!-- omit in toc -->

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/mahyarmirrashed/yaos/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion;
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible;
- **Describe the current behaviour** and **explain which behaviour you expected to see instead** and why. At this point you can also tell which alternatives do not work for you; and
- **Explain why this enhancement would be useful** to most YAOS users. You may also want to point out the other projects that solved it better and which could serve as inspiration.

### Your First Code Contribution

There is an `.editorconfig` included in this repository. Please adhere to its styles. I also use Prettier's default settings to format most documents in this repository. Like most Obsidian plugin development, I recommend enabling the [Hot Reload Plugin](https://github.com/pjeby/hot-reload) to speed up development. Run `yarn dev` to launch ESBuild in hot reload (development) mode and you're off to the races!

### Improving The Documentation

If good questions are asked, or if you have steps that you think would make this plugin more accessible to users, feel free to add edits to the [FAQ](./FAQ.md) page.

### Commit Messages

Use [Commitizen](https://github.com/commitizen/cz-cli) with the [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog) adapter and make commits _often_.

<!-- omit in toc -->

## Attribution

This guide is based on the **Contributing Generator**. [Make your own](https://github.com/bttger/contributing-gen)!
