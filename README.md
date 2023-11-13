# Extract-Env

Extract-Env is a small TypeScript command-line tool that scans files in a directory and its subdirectories for references to `process.env`. It then extracts the found environment variable names and saves them to a `.env` file.

## Installation

Before using Extract-Env, make sure you have Node.js installed on your system. Then, install the tool globally using the following command:

```bash
$ npm install -g extract-env
```

## Usage
Note: Ensure you are in the directory where you want to create the .env file.

To run Extract-Env and extract environment variables into a .env file, you can use the following command:
```bash
$ extract-env
```

This will scan files in the current directory and its subdirectories, look for process.env references, and save the found environment variable names in the .env file. You can specify a different file path using the -f option:

```bash
$ extract-env -f my-file.env
```

Options: <br />
-f: Specify the path and name of the output file (optional).