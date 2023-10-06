<div align="center">

<img height="120" src="https://i.imgur.com/HnEvlyD.png">

<h1>Drayman</h1>

Drayman is a server-side component framework.

[Docs](https://drayman.io) · [Blog](https://drayman.io/blog) · [Changelog](https://github.com/Claviz/drayman/releases) · [Join Discord](https://discord.gg/5GYZTvUSxV) · [X](https://x.com/draymanio)

![Version](https://img.shields.io/github/v/release/claviz/drayman)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/claviz/drayman/config.yml)

</div>

## ✨ Features

- Drayman is designed to be easily installed and used to get your website up and running quickly.
- Use any available HTML element, web component or custom Drayman third-party component together with server-side code in single script.
- With Drayman, browser only renders what user should see - all logic and calculations happen server-side.

## 📸 Snapshot

Do you want to create a web application that, for example, allows the user to select a file from the file system and view it's contents? With Drayman it would be a single script:

```tsx
import { promises as fs } from "fs";

export const component: DraymanComponent = async ({ forceUpdate }) => {
  const files = (await fs.readdir("./")).filter((x) => x.includes("."));
  let selectedFile;

  return async () => {
    return (
      <>
        <p>Select a file to view it directly from file system</p>
        <select
          onchange={async ({ value }) => {
            selectedFile = value;
            await forceUpdate();
          }}
        >
          {files.map((fileName) => (
            <option value={fileName}>{fileName}</option>
          ))}
        </select>
        <br />
        {selectedFile && <pre>{await fs.readFile(selectedFile, "utf-8")}</pre>}
      </>
    );
  };
};
```
