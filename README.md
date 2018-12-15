[![Gitpod - Code Now](https://img.shields.io/badge/Gitpod-code%20now-blue.svg?longCache=true)](https://gitpod.io#https://github.com/theia-ide/theia-website)
[![Build Status](https://travis-ci.org/theia-ide/typescript-language-server.svg?branch=master)](https://travis-ci.org/theia-ide/theia-website)

# Theia's Website

The source for the [website](http://www.theia-ide.org) and [online documentation](http://www.theia-ide.org/doc) for the [Theia IDE Framework](https://github.com/theia-ide/theia).

## Documentation Generation

Build the documentation from markdown files in `doc` using Gitbook

```bash
npm run build
```

To run a local http-server to browser the documentation type
```bash
npm run serve
```
and point your broswer to `localhost:8080`. The contents are automatically built and updated.

When the server is running, you can check for dangling links via
```bash
npm run check
```

## CI

The website is automatically build at and deployed to netlify.
A [Travis build](https://travis-ci.org/theia-ide/theia-website) checks for missing links.
