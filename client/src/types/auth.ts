export type UserRole = "jobSeeker" | "employer";


export interface User {
  id: string
  role: UserRole
  name: string
}
