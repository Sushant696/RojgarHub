export type UserRole = "candidate" | "employer";

export interface User {
  id: string;
  role: UserRole;
  name: string;
}
