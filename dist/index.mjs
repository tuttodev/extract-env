#! /usr/bin/env node

// src/index.ts
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// src/createEnvFile.ts
import fs from 'fs'

// src/getEnvs.ts
import { globSync } from 'glob'
const createEnvFile = (envVariables, outputPath = '.env') => {
  const envContent = Object.entries(envVariables).map(([key, value]) => `${key}=${value}`).join('\n')
  fs.writeFileSync(outputPath, envContent, 'utf-8')
}
const scansFiles = (directory2) => {
  const result = []
  const files = globSync('**/*.{ts,js}', { ignore: ['node_modules/**', 'dist/**'] })
  console.log(files)
  return result
}
const getEnvs = (directory2) => {
  const filesWithEnvs = scansFiles(directory2)
  console.log(filesWithEnvs)
}

// src/index.ts
const argv = yargs(hideBin(process.argv)).scriptName('extract-env').usage('Usage: $0').help().argv
const directory = process.cwd()
const envs = getEnvs(directory)
createEnvFile({
  'API-KEYYY': '123'
})
