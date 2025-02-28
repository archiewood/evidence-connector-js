import { EvidenceType } from "@evidence-dev/db-commons";
import { pathToFileURL } from 'url';

/**
 * @see https://docs.evidence.dev/plugins/create-source-plugin/#options-specification
 * @see https://github.com/evidence-dev/evidence/blob/main/packages/postgres/index.cjs#L316
 */
export const options = {};

/**
 * Implementing this function creates a "file-based" connector
 *
 * Each file in the source directory will be passed to this function, and it will return
 * either an array, or an async generator {@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function*}
 * that contains the query results
 *
 * @see https://docs.evidence.dev/plugins/create-source-plugin/
 * @type {import("@evidence-dev/db-commons").GetRunner<ConnectorOptions>}
 */
export const getRunner = (options) => {

  return async (queryText, queryPath) => {
    // Check if the file is a JavaScript file
    if (queryPath.endsWith(".js")) {
      try {
        // Convert the file path to a file URL
        const module = await import(pathToFileURL(queryPath).href);

        // Access the exported 'data' variable
        const data = module.data;

        console.debug(data)

        // Extract column names from the first row
        const columnNames = Object.keys(data[0]);

        // Example output, modify as needed
        const output = {
          rows: data, // Assuming 'data' is an array of rows
          columnTypes: columnNames.map((name) => ({
            name,
            evidenceType:
              typeof data[0][name] === "number"
                ? EvidenceType.NUMBER
                : EvidenceType.STRING,
            typeFidelity: "inferred",
          })),
          expectedRowCount: data.length,
        };

        return output;
      } catch (error) {
        console.error(`Failed to load or process file ${queryPath}:`, error);
        throw error;
      }
    }
  };
};

/** @type {import("@evidence-dev/db-commons").ConnectionTester<ConnectorOptions>} */
export const testConnection = async (opts) => {
  return true;
};
