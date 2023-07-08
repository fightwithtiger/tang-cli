import type { CreateCommandOptions } from '../types'
import { checkDirAndClear } from '../common'
import { create } from '../core'
import { getTargetPath } from '../utils'

export async function createCommand(projectName: string, options: CreateCommandOptions) {
  const targetDir = getTargetPath(projectName)

  await checkDirAndClear(targetDir, { force: options.force })
  await create(projectName, targetDir)
}

