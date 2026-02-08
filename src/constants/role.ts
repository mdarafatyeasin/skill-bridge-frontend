// constants/role.ts
export const Role = {
  admin: "ADMIN",
  teacher: "TEACHER",
  user: "USER",
} as const;

// ✅ Create a type from the object values
export type RoleType = (typeof Role)[keyof typeof Role];
