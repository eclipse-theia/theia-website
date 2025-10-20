# Theia's Website

The source for the [website](https://theia-ide.org) and [online documentation](https://theia-ide.org/docs/) for the [Theia IDE Framework](https://github.com/eclipse-theia/theia).

## Work locally

Building locally requires node 14.x. Alternatively, you can use `npm i --legacy-peer-deps` to ignore conflicting peer dependencies.

```bash
npm install && npm run start
```

To build for production and serve, run:

```bash
npm run build
npm run serve
```

## CI

The website is automatically built with [Github workflows](.github/workflows/) and deployed on Github pages, which are reachable via [theia-ide.org](https://theia-ide.org/).

A preview of every pull request is published at [eclipse-theia/theia-website-previews](https://github.com/eclipse-theia/theia-website-previews). You'll see a comment with the link to the preview once the build is finished.
For more information, see [`publish.yml`](.github/workflows/publish.yml) and [`preview.yml`](.github/workflows/preview.yml).

## License

- [Eclipse Public License 2.0](LICENSE)
- [一 (Secondary) GNU General Public License, version 2 with the GNU Classpath Exception](LICENSE)

## Trademark

"Theia" is a trademark of the Eclipse Foundation
<https://www.eclipse.dev/theia>
