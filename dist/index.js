#! /usr/bin/env node
'use strict'
const __create = Object.create
const __defProp = Object.defineProperty
const __getOwnPropDesc = Object.getOwnPropertyDescriptor
const __getOwnPropNames = Object.getOwnPropertyNames
const __getProtoOf = Object.getPrototypeOf
const __hasOwnProp = Object.prototype.hasOwnProperty
const __copyProps = (to, from, except, desc) => {
  if (from && typeof from === 'object' || typeof from === 'function') {
    for (const key of __getOwnPropNames(from)) {
      if (!__hasOwnProp.call(to, key) && key !== except) { __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable }) }
    }
  }
  return to
}
const __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, 'default', { value: mod, enumerable: true }) : target,
  mod
))

// src/index.ts
const import_yargs = __toESM(require('yargs'))
const import_helpers = require('yargs/helpers')

// src/createEnvFile.ts
const import_fs = __toESM(require('fs'))
const createEnvFile = (envVariables, outputPath = '.env') => {
  const envContent = Object.entries(envVariables).map(([key, value]) => `${key}=${value}`).join('\n')
  import_fs.default.writeFileSync(outputPath, envContent, 'utf-8')
}

// src/getEnvs.ts
const import_glob = require('glob')
const scansFiles = (directory2) => {
  const result = []
  const files = (0, import_glob.globSync)('**/*.{ts,js}', { ignore: ['node_modules/**', 'dist/**'] })
  console.log(files)
  return result
}
const getEnvs = (directory2) => {
  const filesWithEnvs = scansFiles(directory2)
  console.log(filesWithEnvs)
}

// src/index.ts
const argv = (0, import_yargs.default)((0, import_helpers.hideBin)(process.argv)).scriptName('extract-env').usage('Usage: $0').help().argv
const directory = process.cwd()
const envs = getEnvs(directory)
createEnvFile({
  'API-KEYYY': '123'
})
