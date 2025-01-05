export type UserRole = "employer" | "candidate";

export interface User {
  id: string;
  role: UserRole;
  name: string;
}
