// @ts-check
// Enables TypeScript type checking for this JavaScript file.

/** This script modifies the project to support TS (TypeScript) code in .svelte files like:

  <script lang="ts">
  	export let name: string;
  </script>
 
  As well as validating the code for CI (Continuous Integration).
  */

/**  To work on this script:
  rm -rf test-template template && git clone sveltejs/template test-template && node scripts/setupTypeScript.js test-template
  This command removes any existing `test-template` directory, clones the Svelte template into a new directory named `test-template`, and runs this script on it.
*/

import fs from "fs"
// Imports the Node.js `fs` module to work with the file system.

import path from "path"
// Imports the Node.js `path` module to work with file and directory paths.

import { argv } from "process"
// Imports the `argv` property from the `process` module to access command-line arguments.

import url from 'url';
// Imports the Node.js `url` module to work with URLs.

const __filename = url.fileURLToPath(import.meta.url);
// Gets the current file name using `import.meta.url` and converts it to a file path.

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
// Gets the current directory name using `import.meta.url` and converts it to a directory path.

const projectRoot = argv[2] || path.join(__dirname, "..")
// Sets `projectRoot` to the second command-line argument or, if not provided, the parent directory of the current directory.

// Add dependencies to package.json
const packageJSON = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8"))
// Reads the `package.json` file, parses it as JSON, and stores it in `packageJSON`.

packageJSON.devDependencies = Object.assign(packageJSON.devDependencies, {
  "svelte-check": "^3.0.0",
  "svelte-preprocess": "^5.0.0",
  "@rollup/plugin-typescript": "^11.0.0",
  "typescript": "^4.9.0",
  "tslib": "^2.5.0",
  "@tsconfig/svelte": "^3.0.0"
})
// Adds necessary TypeScript-related dependencies to the `devDependencies` section of `packageJSON`.

// Add script for checking
packageJSON.scripts = Object.assign(packageJSON.scripts, {
  "check": "svelte-check"
})
// Adds a `check` script to `packageJSON` that runs `svelte-check` for type checking.

// Write the package JSON
fs.writeFileSync(path.join(projectRoot, "package.json"), JSON.stringify(packageJSON, null, "  "))
// Writes the updated `package.json` back to the file system, formatting it with two spaces of indentation.

// Rename src/main.js to main.ts - note, we need to edit rollup.config.js for this too
const beforeMainJSPath = path.join(projectRoot, "src", "main.js")
// Defines the path to the original `main.js` file.

const afterMainTSPath = path.join(projectRoot, "src", "main.ts")
// Defines the path where the renamed `main.ts` file will be saved.

fs.renameSync(beforeMainJSPath, afterMainTSPath)
// Renames `main.js` to `main.ts` to switch from JavaScript to TypeScript.

// Switch the App.svelte file to use TS
const appSveltePath = path.join(projectRoot, "src", "App.svelte")
// Defines the path to the `App.svelte` file.

let appFile = fs.readFileSync(appSveltePath, "utf8")
// Reads the contents of `App.svelte` as a UTF-8 string.

appFile = appFile.replace("<script>", '<script lang="ts">')
// Replaces the `<script>` tag with `<script lang="ts">` to enable TypeScript.

appFile = appFile.replace("export let name;", 'export let name: string;')
// Adds a TypeScript type annotation to the `name` prop in `App.svelte`.

fs.writeFileSync(appSveltePath, appFile)
// Writes the modified content back to `App.svelte`.

// Edit rollup config
const rollupConfigPath = path.join(projectRoot, "rollup.config.js")
// Defines the path to the `rollup.config.js` file.

let rollupConfig = fs.readFileSync(rollupConfigPath, "utf8")
// Reads the contents of `rollup.config.js` as a UTF-8 string.

// Edit imports
rollupConfig = rollupConfig.replace(`'rollup-plugin-css-only';`, `'rollup-plugin-css-only';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';`)
// Adds imports for `sveltePreprocess` and `@rollup/plugin-typescript` to the Rollup configuration.

// Replace name of entry point
rollupConfig = rollupConfig.replace(`'src/main.js'`, `'src/main.ts'`)
// Changes the entry point in Rollup from `main.js` to `main.ts`.

// Add preprocessor
rollupConfig = rollupConfig.replace(
  'compilerOptions:',
  'preprocess: sveltePreprocess({ sourceMap: !production }),\n\t\t\tcompilerOptions:'
);
// Adds the `sveltePreprocess` preprocessor to the Rollup configuration.

// Add TypeScript
rollupConfig = rollupConfig.replace(
  'commonjs(),',
  'commonjs(),\n\t\ttypescript({\n\t\t\tsourceMap: !production,\n\t\t\tinlineSources: !production\n\t\t}),'
);
// Configures TypeScript in the Rollup build process.

fs.writeFileSync(rollupConfigPath, rollupConfig)
// Writes the modified content back to `rollup.config.js`.

// Add tsconfig.json
const tsconfig = `{
  "extends": "@tsconfig/svelte/tsconfig.json",

  "include": ["src/**/*"],
  "exclude": ["node_modules/*", "__sapper__/*", "public/*"]
}`
// Defines the content for the `tsconfig.json` file, extending the Svelte-specific TypeScript configuration.

const tsconfigPath =  path.join(projectRoot, "tsconfig.json")
// Defines the path to save `tsconfig.json`.

fs.writeFileSync(tsconfigPath, tsconfig)
// Writes the `tsconfig.json` file to the file system.

// Add svelte.config.js
const svelteConfig = `import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess()
};
`
// Defines the content for the `svelte.config.js` file, setting up Svelte with `sveltePreprocess`.

const svelteConfigPath =  path.join(projectRoot, "svelte.config.js")
// Defines the path to save `svelte.config.js`.

fs.writeFileSync(svelteConfigPath, svelteConfig)
// Writes the `svelte.config.js` file to the file system.

// Add global.d.ts
const dtsPath =  path.join(projectRoot, "src", "global.d.ts")
// Defines the path to save the `global.d.ts` file.

fs.writeFileSync(dtsPath, `/// <reference types="svelte" />`)
// Writes a `global.d.ts` file that references Svelte types, allowing for type checking within `.svelte` files.

// Delete this script, but not during testing
if (!argv[2]) {
  // If the script was not run with an argument (indicating it's not a test):

  fs.unlinkSync(path.join(__filename))
  // Deletes this script file from the file system.

  // Check for Mac's DS_store file, and if it's the only one left, remove it
  const remainingFiles = fs.readdirSync(path.join(__dirname))
  // Reads the list of remaining files in the current directory.

  if (remainingFiles.length === 1 && remainingFiles[0] === '.DS_store') {
    fs.unlinkSync(path.join(__dirname, '.DS_store'))
    // If `.DS_store` is the only file left, deletes it.
  }

  // Check if the scripts folder is empty
  if (fs.readdirSync(path.join(__dirname)).length === 0) {
    // If the scripts folder is empty, removes the folder.
    fs.rmdirSync(path.join(__dirname))
  }
}

// Adds the extension recommendation
fs.mkdirSync(path.join(projectRoot, ".vscode"), { recursive: true })
// Creates the `.vscode` directory in the project root, including any necessary parent directories.

fs.writeFileSync(path.join(projectRoot, ".vscode", "extensions.json"), `{
  "recommendations": ["svelte.svelte-vscode"]
}
`)
// Writes an `extensions.json` file in the `.vscode` directory, recommending the Svelte extension for Visual Studio Code.

console.log("Converted to TypeScript.")
// Outputs a message to the console indicating the conversion to TypeScript is complete.

if (fs.existsSync(path.join(projectRoot, "node_modules"))) {
  console.log("\nYou will need to re-run your dependency manager to get started.")
  // If the `node_modules` directory exists, advises the user to re-run their dependency manager (e.g., `npm install`).
}
