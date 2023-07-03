

## 0.4.1 (2023-07-03)


### Bug Fixes

* add notices for when repository has not been setup ([6b538bf](https://github.com/mahyarmirrashed/yaos/commit/6b538bf418c4c3d322fd7a77660f223b8edeed24))

# [0.4.0](https://github.com/mahyarmirrashed/yaos/compare/0.3.0...0.4.0) (2023-07-03)


### Features

* add command to show conflicting files modal ([76fcd60](https://github.com/mahyarmirrashed/yaos/commit/76fcd6021ac437252a7e69d240a8bbf1231552da))
* add modal for displaying conflicting files ([a3bf15f](https://github.com/mahyarmirrashed/yaos/commit/a3bf15f0ed918621244a5086909cba69f4cd8c2f))
* add notice when vault successfully backs up ([104c154](https://github.com/mahyarmirrashed/yaos/commit/104c15453038f925c94242a6ca0c8cb3aad57c99))
* use simple git api to get list of conflicting files ([763774f](https://github.com/mahyarmirrashed/yaos/commit/763774f46b9028ab2c486931ca6bb392537c4a5f))

# [0.3.0](https://github.com/mahyarmirrashed/yaos/compare/0.2.0...0.3.0) (2023-07-03)


### Features

* add basic synchronizer method on controller for performing sync action ([918974e](https://github.com/mahyarmirrashed/yaos/commit/918974ec80fdb74cf7025f3a7899f532f164dc3c))
* add method to check if local branch is ahead of remote branch ([c51d8a7](https://github.com/mahyarmirrashed/yaos/commit/c51d8a716412789377f2061d8739b8a039f6ae35))
* add method to check if remote branch is ahead of local branch ([ce44aa9](https://github.com/mahyarmirrashed/yaos/commit/ce44aa9e2463a3df6b3294da4abebd31002f3626))
* add method to force stop of rebase ([bee9df1](https://github.com/mahyarmirrashed/yaos/commit/bee9df18422fe48a82b553e6030591dc8230cb3c))
* add method to list unmerged files in the repository ([002530e](https://github.com/mahyarmirrashed/yaos/commit/002530e402e95469bc8fde9ce3dbe8a1d405004c))
* add method to name if currently rebasing repository ([c1a9f3d](https://github.com/mahyarmirrashed/yaos/commit/c1a9f3d408b5abb25f7db3ea9e1039bc45970f3f))
* add method to pull with rebase merge conflict resolution ([82c9723](https://github.com/mahyarmirrashed/yaos/commit/82c9723a2da95748125359f6b2ba6d1fd3fb0087))
* complete vault backup process ([90eef2b](https://github.com/mahyarmirrashed/yaos/commit/90eef2bc8156271843ba50e606a0859d5b19b581))
* **sync:** add sync controller to manage logic and process ([fe5b771](https://github.com/mahyarmirrashed/yaos/commit/fe5b7717f22d70d948a346ec68ccf9a4008692b7))

# [0.2.0](https://github.com/mahyarmirrashed/yaos/compare/0.1.0...0.2.0) (2023-07-03)


### Bug Fixes

* check again if path is still being tracked after removing from history ([692c450](https://github.com/mahyarmirrashed/yaos/commit/692c450a2b0040f00c87407306682167ca49e0d2))
* pass correct path to git service ([3b340d8](https://github.com/mahyarmirrashed/yaos/commit/3b340d8d1cf2638cb5c3444bb248135940001261))
* properly check if path is being ignored ([576b6c4](https://github.com/mahyarmirrashed/yaos/commit/576b6c4ef55e4d42d7daa3d72063ec5fc89b53f7))
* specify in gitservice interface optional push parameter ([f9cf3b4](https://github.com/mahyarmirrashed/yaos/commit/f9cf3b48c5c0051e91f5dc38577159f793fe1337))
* specify in interface that argument is optional ([5034699](https://github.com/mahyarmirrashed/yaos/commit/503469996726f4a8ce8cbdee514edb623cbbd3e2))
* ungeneralize method ([c229223](https://github.com/mahyarmirrashed/yaos/commit/c229223a37b141b2380f74e0c3f2dd746b903748))
* use different message on stage, commit, and push process ([4fd6707](https://github.com/mahyarmirrashed/yaos/commit/4fd6707da0528ca4aafd8f3b7c43fc873a0cfb41))


### Features

* add basic implementation of git service interface with simple git backend ([dcae94f](https://github.com/mahyarmirrashed/yaos/commit/dcae94f462ef9dafbea75b2e90734761cd0ff290))
* add common git operations ([9ab8763](https://github.com/mahyarmirrashed/yaos/commit/9ab87636cef4d14c26bfe1765c1dca9324f91018))
* add git operation for commiting changes ([7a57d77](https://github.com/mahyarmirrashed/yaos/commit/7a57d77f2bfbb0d5dccb0a3db9029dd0c45a1964))
* add gitignore service ([d512a3d](https://github.com/mahyarmirrashed/yaos/commit/d512a3dedfe23ad71b691587b1ce6d9435162508))
* add interface for git service implementations ([32a6c9f](https://github.com/mahyarmirrashed/yaos/commit/32a6c9f2dc7a28c0a69554d5e347e801bd4c7556))
* add logger for debugging purposes ([987dd02](https://github.com/mahyarmirrashed/yaos/commit/987dd028b6a9b7de6c96d4f6807d0f9b5bb6ae3a))
* add logging message when making commits ([0b4017d](https://github.com/mahyarmirrashed/yaos/commit/0b4017de0e3bbf3f98fd1e710732a8083bbe2596))
* add logging messages when pushing to remote ([f89a93f](https://github.com/mahyarmirrashed/yaos/commit/f89a93f673fcb2673541a14ddbf1979dcd8cadb0))
* add method to check if a remote address is configured for the repository ([7a8776f](https://github.com/mahyarmirrashed/yaos/commit/7a8776f97c37e4cf764332c9f3462a5bdc2cd4ea))
* add method to check if path is being tracked ([460b7c8](https://github.com/mahyarmirrashed/yaos/commit/460b7c8b12c6cf3f5c29a7243690df1df2ea84fc))
* add method to check if unstaged files exist ([b0b0dbf](https://github.com/mahyarmirrashed/yaos/commit/b0b0dbfea4d1ae584cb4b0d51a821e05e6890296))
* add method to delete tracks to certain git ([22717b6](https://github.com/mahyarmirrashed/yaos/commit/22717b646cb2ca6e806f0bac9df352cea885c4f8))
* add, commit, and push newly created `.gitignore` files ([92ec554](https://github.com/mahyarmirrashed/yaos/commit/92ec554a3a7d77c8e7d8fd98250ccdc1ea8cfd5f))
* check if remote repository is configured ([98894a9](https://github.com/mahyarmirrashed/yaos/commit/98894a9cd398e0db39f64d28d56fb41a92f2f60d))
* consolidate logic directly into single try-catch ([7124933](https://github.com/mahyarmirrashed/yaos/commit/7124933398eb8029dd91abaa4bb1006601458acd))
* create distinction between currently and previously tracking files ([768b8d5](https://github.com/mahyarmirrashed/yaos/commit/768b8d5560e8a755e328792911b99fef9db40b74))
* force push after rewriting git commit history ([42281c1](https://github.com/mahyarmirrashed/yaos/commit/42281c11a758f66619f7efed47e1f33daa521b89))
* initialize `.gitignore` with necessary contents to ignore `.obsidian/` ([55cb3f4](https://github.com/mahyarmirrashed/yaos/commit/55cb3f4693b6b38b0de2125c0cc992cca19f340f))
* trigger vault backup every time sync button is pressed ([80d16cd](https://github.com/mahyarmirrashed/yaos/commit/80d16cd22cb5c1e0b24c2e9f9c4c2e7767c8807d))
* use git service to check if current vault is configured as a git repository ([3c935d4](https://github.com/mahyarmirrashed/yaos/commit/3c935d4b03a9adf2677d4da0364c4da92b5231d2))
* use gitignore service to ensure obsidian folder is ignored ([9e1b4fc](https://github.com/mahyarmirrashed/yaos/commit/9e1b4fc449254cbeb341307dfdb41ebfe34a4b8a))

# 0.1.0 (2023-07-02)


### Bug Fixes

* fix variable naming error for `versionsJson` ([c451bcc](https://github.com/mahyarmirrashed/yaos/commit/c451bccc0f59bf2f1a2a8b77c92b17a10ef27c7e))
* only allow release from `main` branch ([f15a5ee](https://github.com/mahyarmirrashed/yaos/commit/f15a5ee333974a2c03fa517242b303b0e7c11be8))
* properly retrive dirname in es module ([132f614](https://github.com/mahyarmirrashed/yaos/commit/132f614cbf4fb299d6cba4a46d4aa76ba5948ed3))


### Features

* add ribbon icon for plugin ([9015ff4](https://github.com/mahyarmirrashed/yaos/commit/9015ff4e9064c58eb06d9131ce3307337cffedcf))