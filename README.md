# Drayman

Drayman is a server-side component framework.

- Drayman is designed to be easily installed and used to get your website up and running quickly.
- Use any available HTML element, web component or custom Drayman third-party component together with server-side code in single script.
- With Drayman, browser only renders what user should see - all logic and calculations happen server-side.

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

## Links

[Official website/docs](http://drayman.io)

[Join Discord](https://discord.gg/5GYZTvUSxV)

[Twitter](https://twitter.com/draymanio)
