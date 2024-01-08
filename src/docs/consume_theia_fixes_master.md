
# Consuming Theia Features/Fixes Without Upgrading Theia

This guide outlines how to incorporate specific bug fixes or features from Theia's master branch into your project without needing to fully upgrade to a new version of Theia.

## Scenario

Imagine you are developing a Theia application using version 1.43.0. You encounter a bug in Theia, report it, and the community fixes it. However, there is no immediate Theia release including this fix. This guide describes how to use this fix in your local development, e.g. to validate it or to just already consume it before the next Theia release is published.

We also assume that:
- the bug fix you need has minimal changes; it involved changes to only a few packages
- the bug fix does not build upon or interact with any other Theia changes made since 1.43.0. i.e., it's a no-brainer to [backport](https://en.wikipedia.org/wiki/Backporting)

## Steps to Incorporate the Fix

Note: In the following, we assume you are adopting the Theia version 1.43 which you want to hotfix(backport). Please replace "1.43" with the correct version of Theia that you currently build your project against.

1. **Clone and Branch Theia Codebase**
    \
    Clone the Theia codebase and checkout the version you are adopting in your project. Create a new branch from this version to apply the fix. 
   
    For convenience, make sure to clone it next to where your Theia application repo is cloned. E.g., if your Theia app is in ~/git/myapp , make sure you clone the Theia repo such that it ends up at ~/git/theia . This isn't absolutely necessary, but will make things easier in a subsequent step. We'll be assuming you've done it that way.

    ```bash
    git clone -b v1.43.0 https://github.com/eclipse-theia/theia.git
    cd theia
    git checkout -b v1.43.0_with_fix
    ```
    Now you have a local clone of the same exact Theia version your application is currently using. It doesn't have the backported fix, but the next steps will take care of that.

2. **Identify the commit to backport on master**
    \
    Browse the commit history of the Theia project in the master branch to identify the commit you want to backport. It will typically be linked on the corresponding ticket on Github. Identify the commit SHA that has the fix in the master branch. In the following, we assume it is *0a615512*.

3. **Cherry-Pick the Fix**
    \
    Use the commit SHA of the fix to cherry-pick it onto your local Theia branch.

    ```bash
    git cherry-pick 0a615512
    ```

    Given the assumptions for this scenario, the cherry-pick should occur without any merge conflicts. If there are conflicts, you will need to address them. Now you have a local clone of Theia that includes the fix you want to backport.

4. **Check Modified Files**
    \
    Use the following command to see what files were altered by the fix.

    ```bash
    git show --name-only --pretty="" 0a615512
    ```

5. **Adjust Package.json Files**
    \
    If the list of changes shows that any `package.json` files were modified, ensure that Theia package versions are not newer than 1.43. Open each one in an editor and replace any instances where a Theia package is referenced using a version newer than 1.43.0. E.g., if you find
    ```json
    "dependencies": {
       "@theia/core": "1.44.0",
       ...
    }
    ```
    change 1.44.0 to 1.43.0 . 
    If you overlook or forget to adjust any such forward version references, you will probably encounter errors when you try to  build your local Theia version.

6. **Note Modified Packages**
    \
    Identify which packages in `packages/` and `dev-packages/` were affected.

7. **Build Theia**
    \
    Run `yarn` to build Theia in the modified branch.
    \
    We assume here that everything builds without errors. If there are errors, double check your steps above (particular #5). If you didn't make any mistakes, then it's likely that the fix has dependencies on other changes that have happened in the codebase since Theia 1.43.0. That is not necessarily a deal breaker. You may be able to adjust the fix to make it work on top of the 1.43.0 codebase. It may require that you cherry-pick another small change or two (but hopefully not more than that). 

8. **Use Modified Theia in Your App**
    \
    In your application's `package.json`, add resolutions for each modified package.

    ```json
    "resolutions": {
      "**/@theia/core": "file:../theia/packages/core",
      "**/@theia/terminal": "file:../theia/packages/terminal",
      // more resolutions as needed
    }
    ```

9. **Update Node Modules**
    \
    Use `yarn install` with appropriate flags to update your `node_modules`.
    ```bash
    yarn install --check-files --ignore-scripts
    ```
    `--check-files` tells yarn to skip the optimization it normally does and to ensure `node_modules` has what it should have.\
    `--ignore-scripts` lets us skip subsequent yarn lifecycle activity that isn't necessary in this particular step. We just want the `node_modules` to get updated.\
    **Please Note:** You will have to re-run this step if you later make any additional changes to the Theia codebase that affect the packages you specified in the resolutions section above (e.g., if you cherry-pick another commit). Keep in mind that the yarn install cmdline above does not create symlinks. It makes copies of directories in your Theia workspace and puts them in your apps's node_modules . Any subsequent changes in those Theia directories need to be copied over again.

10. **Build Your Application**
    \
    Finally, run `yarn` in your application directory to build it with the new fixes.

## Conclusion

By following these steps, you can backport Theia fixes or features into your application without waiting for an official release. This process is particularly useful for minor changes that don't depend on other recent codebase updates.
