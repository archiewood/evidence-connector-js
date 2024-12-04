# Evidence JS Source Plugin

This is a JavaScript source plugin for Evidence. It allows you to run arbitrary JavaScript code as a data source.

1. Install this plugin in an Evidence app with
    ```bash
    npm install evidence-connector-js
    ```
2. Register the plugin in your project in your evidence.plugins.yaml file with
    ```bash
    datasources:
      evidence-connector-js: {}
    ```
3. Launch the development server with `npm run dev` and navigate to the settings menu (localhost:3000/settings) to add a data source using this plugin.
4. Create a new source in the sources directory with a .js file. The file should export a `data` object, e.g.
    ```javascript
    export const data = [
      {
        name: "John Doe",
        age: 30,
      },
    ];
    ```