<!-- [![Build Status](https://travis-ci.org/Claviz/drayman-elements.svg?branch=master)](https://travis-ci.org/Claviz/drayman-elements)
[![codecov](https://codecov.io/gh/Claviz/drayman-elements/branch/master/graph/badge.svg)](https://codecov.io/gh/Claviz/drayman-elements)
![npm](https://img.shields.io/npm/v/drayman-elements.svg) -->

# @drayman/elements

[Docs](https://drayman-elements-new.netlify.app/)

Default drayman elements library.

## Available elements
* [drayman-button](https://drayman-elements-new.netlify.app/interfaces/__global.draymanbuttonprops.html)
* [drayman-menu](https://drayman-elements-new.netlify.app/interfaces/__global.draymanmenuprops.html)
* [drayman-checkbox](https://drayman-elements-new.netlify.app/interfaces/__global.draymancheckboxprops.html)
* [drayman-claviz-charts](https://drayman-elements-new.netlify.app/interfaces/__global.draymanclavizchartsprops.html)
* [drayman-datepicker](https://drayman-elements-new.netlify.app/interfaces/__global.draymandatepickerprops.html)
* [drayman-file-uploader](https://drayman-elements-new.netlify.app/interfaces/__global.draymanfileuploaderprops.html)
* [drayman-ngx-charts](https://drayman-elements-new.netlify.app/interfaces/__global.draymanngxchartsprops.html)
* [drayman-ngx-graph](https://drayman-elements-new.netlify.app/interfaces/__global.draymanngxgraphprops.html)
* [drayman-number-field](https://drayman-elements-new.netlify.app/interfaces/__global.draymannumberfieldprops.html)
* [drayman-pdf-viewer](https://drayman-elements-new.netlify.app/interfaces/__global.draymanpdfviewerprops.html)
* [drayman-radio-group](https://drayman-elements-new.netlify.app/interfaces/__global.draymanradiogroupprops.html)
* [drayman-select](https://drayman-elements-new.netlify.app/interfaces/__global.draymanselectprops.html)
* [drayman-table](https://drayman-elements-new.netlify.app/interfaces/__global.draymantableprops.html)
* [drayman-text-field](https://drayman-elements-new.netlify.app/interfaces/__global.draymantextfieldprops.html)
* [drayman-textarea-field](https://drayman-elements-new.netlify.app/interfaces/__global.draymantextareafieldprops.html)
* [drayman-timepicker](https://drayman-elements-new.netlify.app/interfaces/__global.draymantimepickerprops.html)
* [drayman-youtube-player](https://drayman-elements-new.netlify.app/interfaces/__global.draymanyoutubeplayerprops.html)
* [drayman-modal](https://drayman-elements-new.netlify.app/interfaces/__global.draymanmodalprops.html)
* [drayman-snack-bar](https://drayman-elements-new.netlify.app/interfaces/__global.draymansnackbarprops.html)

## Development

### Adding new drayman element

1. Run command:
```bash
sudo npm run create-element -- %%element-name-in-kebab-case%% %%ElementNameInPascalCase%%
```

2. Update `package.json` with `scripts` and `drayman`.

3. Update `tsconfig.json` with `inputFiles`.

4. Serve!