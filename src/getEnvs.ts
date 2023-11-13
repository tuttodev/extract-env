import fs from 'fs'
import { globSync } from 'glob'
import path from 'path'

const scansFiles = (directory: string): string[] => {
  const result: string[] = []

  const files = globSync('**/*.{ts,js}', { ignore: ['node_modules/**', 'dist/**'] })

  files.forEach((file) => {
    const filePath = path.join(directory, file)

    const content = fs.readFileSync(filePath, 'utf-8')
    if (content.includes('process.env')) {
      result.push(filePath)
    }
  })

  return result
}

export const getEnvs = (directory: string): string[] => {
  const filesWithEnvs = scansFiles(directory)

  const envVariables: string[] = []
  filesWithEnvs.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8')
    const regex = /process\.env\.([A-Za-z_]+)/g
    let match

    while ((match = regex.exec(content)) !== null) {
      envVariables.push(match[1])
    }
  })

  return envVariables
}
