THIS CONNECTOR NOW IS IN TREE AT evidence-dev/evidence, DO NOT USE THIS VERSION

# Evidence JS Source Plugin

This is a JavaScript source plugin for Evidence. It allows you to run arbitrary JavaScript code as a data source. It's meant to be a quick way to get data into Evidence without having to create a new connector.

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
4. Create a new source in the sources directory with a .js file like `pokedex.js`. The JS file should export a `data` object.
    ```javascript
    let url = 'https://pokeapi.co/api/v2/pokemon/'

    const response = await fetch(url)
    const json = await response.json()
    const data = json.results

    export { data }
    ```
5. You can then reference your data in markdown queries.
    ````markdown
    ```sql pokedex
    select * from pokedex
    ```
    ````

## Credentials

You can pass credentials via environment variables to your JS file. They must be prefixed with `EVIDENCE_`.

```javascript
let key = process.env.EVIDENCE_API_KEY
let url = 'https://whatever.com/api'

const response = await fetch(url, {
    headers: {
        'x-api-key': key
    }
})

const json = await response.json()
const data = json.results

export { data }
```


