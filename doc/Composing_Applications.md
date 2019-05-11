# Build your own IDE

This guide will teach you how to build your own Theia application.

## Requirements

You'll need node in version 8:

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
nvm install 8
```

and yarn

```
npm install -g yarn
```

Also make sure your `python --version` points to a Python 2.x installation.

## Setup

Start with creating a new empty directory and moving into it:

    mkdir my-app
    cd my-app

Create `package.json` in this directory:

```json
{
  "private": true,
  "dependencies": {
    "typescript": "latest",
    "@theia/typescript": "next",
    "@theia/navigator": "next",
    "@theia/terminal": "next",
    "@theia/outline-view": "next",
    "@theia/preferences": "next",
    "@theia/messages": "next",
    "@theia/git": "next",
    "@theia/file-search": "next",
    "@theia/markers": "next",
    "@theia/preview": "next",
    "@theia/callhierarchy": "next",
    "@theia/merge-conflicts": "next",
    "@theia/search-in-workspace": "next",
    "@theia/json": "next",
    "@theia/textmate-grammars": "next",
    "@theia/mini-browser": "next"
  },
  "devDependencies": {
    "@theia/cli": "next"
  }
}
```

In a nutshell, Theia applications and extensions are [Node.js packages](https://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/). Each package has a `package.json` file that manifests package metadata, 
like `name`, `version`, its runtime and build time dependencies and so on.

Let's have a look at the created package:
  - Its `name` and `version` are omitted since we are not going to use it as a dependency, and 
    it's marked as `private` since it is not going to be published as a Node.js package on its own.
  - We've listed required extensions as runtime dependencies, e.g. `@theia/navigator`.
    - Some extensions require additional tooling installed,
    For instance, [@theia/python](https://www.npmjs.com/package/@theia/python) requires 
    [the Python Language Server](https://github.com/palantir/python-language-server) to be installed.
    In such cases, please consult the corresponding extension documentation.
    - Use [this link](https://www.npmjs.com/search?q=keywords:theia-extension) too see all published extensions.
  - We've listed [@theia/cli](https://www.npmjs.com/package/@theia/cli) as a build-time dependency. It provides scripts to build and run the application.

## Building

First, install all dependencies.

    yarn

Second, use Theia CLI to build the application.

    yarn theia build

`yarn` looks up `theia` executable provided by `@theia/cli` in the context of our application
and then executes the `build` command with `theia`.
This can take a while since the application is built in production mode by default, 
i.e. obfuscated and minified.

## Running

After the build is finished, we can start the application:

    yarn theia start

You can provide a workspace path to open as a first argument
and `--hostname`, `--port` options to deploy the application on specific network interfaces and ports,
e.g. to open `/workspace` on all interfaces and port `8080`:

    yarn theia start /my-workspace --hostname 0.0.0.0 --port 8080

In the terminal, you should see that Theia application is up and listening:

<img src="https://user-images.githubusercontent.com/3082655/44617667-1c053000-a867-11e8-8eba-750daeb295a9.png" height="182px" />

Open the application by entering the printed address in a new browser page.

## Troubleshooting

### Building native dependencies behind a proxy

If you run the `yarn` command behind a proxy you may encounter issues in building native dependencies (like `oniguruma`), in the last part of the build, with the following error stack:

    [4/4] Building fresh packages...
    [1/9]  XXXXX
    [2/9]  XXXXX
    [3/9]  XXXXX
    [4/9]  XXXXX
    error /theiaide/node_modules/XXXXX: Command failed.
    Exit code: 1
    Command: node-gyp rebuild
    Arguments:
    Directory: /theiaide/node_modules/XXXXX
    Output:
    gyp info it worked if it ends with ok
    gyp info using node-gyp@3.8.0
    gyp info using node@8.15.0 | linux | x64
    gyp http GET https://nodejs.org/download/release/v8.15.0/node-v8.15.0-headers.tar.gz
    gyp WARN install got an error, rolling back install
    gyp ERR! configure error
    gyp ERR! stack Error: read ECONNRESET
    gyp ERR! stack at TLSWrap.onread (net.js:622:25)
    gyp ERR! System Linux 3.10.0-862.11.6.el7.x86_64
    gyp ERR! command "/usr/bin/node" "/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
    gyp ERR! cwd /theiaide/node_modules/XXXXX
    gyp ERR! node -v v8.15.0
    
This happens because node-gyp does not rely on system/NPM proxy settings. In that case, download the `node-headers` file using the link provided in the error stack 
(in the example above `https://nodejs.org/download/release/v8.15.0/node-v8.15.0-headers.tar.gz`) and run the build with the following command:

     npm_config_tarball=/path/to/node-v8.15.0-headers.tar.gz yarn install
     

    

