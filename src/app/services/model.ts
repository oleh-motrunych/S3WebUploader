export interface IAccount {
  id: string
  secret: string
  sessionToken: string
  url: string
  initialBucket?: string
  pathStyle?: boolean
}
