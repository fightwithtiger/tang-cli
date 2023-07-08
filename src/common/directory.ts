import fs from 'fs-extra'
import select from '@inquirer/select'
import type { CheckDirOptions } from '../types'
import { removeFileSync } from '../utils'

export async function checkDirAndClear(targetDir: string, options: CheckDirOptions) {
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      removeFileSync(targetDir)
    } else {
      const answer = await select({
        message: '当前文件名重复是否覆盖?',
        choices: [
          { name: '覆盖', value: 'overwrite' },
          { name: '取消', value: 'cancel' },
        ],
      })
      if (answer === 'overwrite') {
        removeFileSync(targetDir)
      } else {
        process.exit(0)
      }
    }
  }
}
