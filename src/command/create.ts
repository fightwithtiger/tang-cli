import path from 'path'
import fs from 'fs-extra'
import select from '@inquirer/select'
import type { CreateCommandOptions, CreateTemplateProps, CreateTemplateType } from '../types'
import { createDirSync, execCommand, removeFileSync } from '../utils'
import { getConfig } from '../config'

const templateMap: Partial<Record<CreateTemplateType, string>> = getConfig().repoPath

export async function createCommand(commandStr: string, options: CreateCommandOptions) {
  const projectName = commandStr
  const cwd = process.cwd()
  const targetDir = path.join(cwd, projectName)

  await cleanProject(targetDir, options)
  const projectType = await askProjectType() as CreateTemplateType
  await createTemplate({ projectName, targetDir, projectType })
}

async function cleanProject(targetDir: string, options: CreateCommandOptions) {
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

async function askProjectType() {
  const answer = await select({
    message: '创建项目类型',
    choices: [
      { name: 'web项目vite+vue', value: 'web' },
      { name: '库开发模板', value: 'library' },
    ],
  })
  return answer
}

async function askWebType() {
  const answer = await select({
    message: '请选择web项目模板',
    choices: [
      { name: 'Vite+Vue', value: 'vite-template' },
    ],
  })
  return answer
}

async function askLibraryType() {
  const answer = await select({
    message: '使用ts还是js',
    choices: [
      { name: 'Typescript', value: 'starterts' },
      { name: 'Typescript + monorepo', value: 'mono' },
      { name: 'Javascript', value: 'starterjs' },
    ],
  })
  return answer
}

async function createTemplate(props: CreateTemplateProps) {
  const { projectType } = props
  if (projectType === 'web') {
    initWebTemplate(props)
  } else if (projectType === 'library') {
    initLibraryTemplate(props)
  }
}

async function initTemplate(props: CreateTemplateProps) {
  const { projectName, targetDir, projectType } = props
  createDirSync(targetDir)
  await execCommand(`cd ${projectName} && npx degit ${templateMap[projectType]}`)
}

async function initWebTemplate(props: CreateTemplateProps) {
  const answer = await askWebType() as CreateTemplateType
  await initTemplate({ ...props, projectType: answer })
}

async function initLibraryTemplate(props: CreateTemplateProps) {
  const answer = await askLibraryType() as CreateTemplateType
  await initTemplate({ ...props, projectType: answer })
}
