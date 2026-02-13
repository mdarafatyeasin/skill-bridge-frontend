export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}


enum Role {
    ADMIN = "ADMIN",
    TEACHER = "TEACHER",
    USER = "USER",
}