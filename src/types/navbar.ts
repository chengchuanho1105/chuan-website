// src/types/navbar.ts
export interface NavbarItem {
  text: string
  path: string
  name?: string
  title: string
  icon?: string
  requiresAuth?: boolean
  children?: NavbarItem[]
  componentLoader?: () => Promise<unknown>
  layout?: 'public' | 'admin' | 'user'
  displayInNavbar?: boolean
  order?: number
}
