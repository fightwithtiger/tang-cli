export interface GlobalConfig {
  version: string
  repoPath: Record<string, string>
}

export interface CreateCommandOptions {
  force?: boolean
}

export enum CreatePrimaryTemplateEnum {
  WEB = 'web',
  LIBRARY = 'library',
  TOOL = 'tool',
}

export enum CreateSecondaryTemplateEnum {
  VITE_TEMPLATE = 'vite-template',
  STARTER_JS = 'starterjs',
  STARTER_tS = 'starterts',
  MONO = 'mono',
  STARTER_VSCODE = 'starter-vscode',
}

export type CreatePrimaryTemplateType = `${CreatePrimaryTemplateEnum}`
export type CreateSecondaryTemplateType = `${CreateSecondaryTemplateEnum}`
export type CreateTemplateType = CreatePrimaryTemplateType | CreateSecondaryTemplateType

export interface CreateTemplateProps {
  projectName: string
  targetDir: string
  projectType: CreateTemplateType
}
