# vauthenticator-management-ui


### ui local environment
In order to make simple the ui assets build for local development take in consideration to enable the following spring configuration properties:

```yaml
  document:
    engine: file-system
    fs-base-path: dist
```

in order to be sure to have the asset files in the correct path execute this script:

```shell
rm -rf node_modules
rm -rf dist

mkdir -p dist/static-asset/content/asset/

cd src/main/frontend
npm install --legacy-peer-deps
npm run-script build

cd dist/asset

cp * ../../../../../dist/static-asset/content/asset/

```