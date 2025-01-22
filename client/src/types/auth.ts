export type UserRole = "EMPLOYER" | "CANDIDATE";

export interface User {
  id: string;
  role: UserRole;
  name: string;
}
