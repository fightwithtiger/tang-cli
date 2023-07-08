import { join } from 'path'
import fs from 'fs-extra'

export function getPackageJSON(): any {
  const path = join(__dirname, '..', 'package.json')

  if (fs.existsSync(path)) {
    try {
      const raw = fs.readFileSync(path, 'utf-8')
      const data = JSON.parse(raw)
      return data
    } catch (e) {
      process.exit(1)
    }
  }
}

export function getTargetPath(path: string) {
  const cwd = process.cwd()
  const targetPath = join(cwd, path)
  return targetPath
}

export function createDirSync(targetDir: string) {
  fs.mkdirSync(targetDir)
}

export function removeFileSync(path: string) {
  fs.removeSync(path)
}
