import { spawn } from 'child_process'; // Import the 'spawn' function from 'child_process' to run child processes (like starting the server).
import svelte from 'rollup-plugin-svelte'; // Import the Svelte plugin for Rollup to compile Svelte components.
import commonjs from '@rollup/plugin-commonjs'; // Import the CommonJS plugin to convert CommonJS modules to ES6.
import terser from '@rollup/plugin-terser'; // Import the Terser plugin to minify the output for production.
import resolve from '@rollup/plugin-node-resolve'; // Import the Node Resolve plugin to locate modules using the Node resolution algorithm.
import livereload from 'rollup-plugin-livereload'; // Import the Livereload plugin to reload the browser on changes.
import css from 'rollup-plugin-css-only'; // Import the CSS-only plugin to extract CSS into a separate file.

const production = !process.env.ROLLUP_WATCH; // Determine if we're in production mode by checking the ROLLUP_WATCH environment variable.

function serve() {
	let server; // Declare a variable to hold the server process.

	function toExit() {
		if (server) server.kill(0); // Define a function to kill the server process when exiting.
	}

	return {
		writeBundle() { // The writeBundle hook runs after the bundle is written.
			if (server) return; // If the server is already running, do nothing.
			server = spawn('npm', ['run', 'start', '--', '--dev'], { // Start the server by running 'npm run start -- --dev'.
				stdio: ['ignore', 'inherit', 'inherit'], // Inherit the parent's standard output and error.
				shell: true // Use the shell to execute the command.
			});

			process.on('SIGTERM', toExit); // Listen for the SIGTERM signal to gracefully exit the server.
			process.on('exit', toExit); // Listen for the process exit event to gracefully exit the server.
		}
	};
}

export default {
	input: 'src/main.js', // Entry point for the application (change to 'src/main.ts' if using TypeScript).
	output: {
		sourcemap: true, // Generate a sourcemap for debugging.
		format: 'iife', // Use the IIFE format to wrap the code in an immediately-invoked function expression.
		name: 'app', // The global variable name for the app (used in IIFE format).
		file: 'public/build/bundle.js' // Output file for the bundle.
	},
	plugins: [
		svelte({
			compilerOptions: {
				// Enable run-time checks when not in production.
				dev: !production 
			}
		}),
		css({ output: 'bundle.css' }), // Extract component CSS into a separate file for better performance.

		// Resolve and bundle dependencies from 'node_modules'.
		resolve({
			browser: true, // Specify that we are targeting browsers.
			dedupe: ['svelte'], // Prevent duplicate instances of the Svelte library.
			exportConditions: ['svelte'] // Use the 'svelte' export condition.
		}),
		commonjs(), // Convert CommonJS modules to ES6 for compatibility.

		// In dev mode, start the server after the bundle is generated.
		!production && serve(),

		// Watch the 'public' directory and refresh the browser on changes in dev mode.
		!production && livereload('public'),

		// Minify the output for production builds.
		production && terser()
	],
	watch: {
		clearScreen: false // Keep the console output when rebuilding the bundle.
	}
};
