import { sep } from 'path'
import select from '@inquirer/select'
import color from 'picocolors'
import type { CreateTemplateProps, CreateTemplateType } from '../types'
import { CreatePrimaryTemplateEnum, CreateSecondaryTemplateEnum } from '../types'
import { execCommand, removeFileSync } from '../utils'
import { getConfig } from '../config'

const templateMap: Partial<Record<CreateTemplateType, string>> = getConfig().repoPath

export default async function create(projectName: string, targetDir: string) {
  const projectType = await askProjectType() as CreateTemplateType
  await createTemplate({ projectName, targetDir, projectType })
}

async function askProjectType() {
  const answer = await select({
    message: '创建项目类型',
    choices: [
      { name: 'web项目模板', value: CreatePrimaryTemplateEnum.WEB },
      { name: '库开发模板', value: CreatePrimaryTemplateEnum.LIBRARY },
      { name: '工具开发模板', value: CreatePrimaryTemplateEnum.TOOL },
    ],
  })
  return answer
}

async function createTemplate(props: CreateTemplateProps) {
  const { projectType } = props
  if (projectType === CreatePrimaryTemplateEnum.WEB) {
    initWebTemplate(props)
  } else if (projectType === CreatePrimaryTemplateEnum.LIBRARY) {
    initLibraryTemplate(props)
  } else if (projectType === CreatePrimaryTemplateEnum.TOOL) {
    initToolTemplate(props)
  }
}

async function initWebTemplate(props: CreateTemplateProps) {
  const answer = await askWebType() as CreateTemplateType
  await initTemplate({ ...props, projectType: answer })
}

async function initLibraryTemplate(props: CreateTemplateProps) {
  const answer = await askLibraryType() as CreateTemplateType
  await initTemplate({ ...props, projectType: answer })
}

async function initToolTemplate(props: CreateTemplateProps) {
  const answer = await askToolType() as CreateTemplateType
  await initTemplate({ ...props, projectType: answer })
}

async function initTemplate(props: CreateTemplateProps) {
  const { projectName, targetDir, projectType } = props
  await execCommand(`git clone ${templateMap[projectType]} ${targetDir}`)
  removeFileSync(`${targetDir}${sep}.git`)
  // eslint-disable-next-line no-console
  console.log(`${color.green('Created template Success')}`)
  // eslint-disable-next-line no-console
  console.log('\nPlease run the following command\n')
  // eslint-disable-next-line no-console
  console.log(`\tcd ${projectName}`)
  // eslint-disable-next-line no-console
  console.log('\tpnpm install')
}

async function askWebType() {
  const answer = await select({
    message: '请选择web项目模板',
    choices: [
      { name: 'Vite+Vue', value: CreateSecondaryTemplateEnum.VITE_TEMPLATE },
    ],
  })
  return answer
}

async function askLibraryType() {
  const answer = await select({
    message: '使用ts还是js',
    choices: [
      { name: 'Typescript', value: CreateSecondaryTemplateEnum.STARTER_tS },
      { name: 'Typescript + monorepo', value: CreateSecondaryTemplateEnum.MONO },
      { name: 'Javascript', value: CreateSecondaryTemplateEnum.STARTER_JS },
    ],
  })
  return answer
}

async function askToolType() {
  const answer = await select({
    message: '请选择工具项目模板',
    choices: [
      { name: 'vscode插件开发模板', value: CreateSecondaryTemplateEnum.STARTER_VSCODE },
    ],
  })
  return answer
}
