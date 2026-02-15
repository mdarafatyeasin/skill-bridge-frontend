export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface SingUpData {
    name: string;
    email: string;
    password: string;
    role?: string;
    callbackURL: string;
}

export interface TutorProfile {
    category_id: string;
    hourly_rate: number;
    experience_year: number;
    qualification: string;
}

export interface Category {
    id: string;
    category: string;
}


enum Role {
    ADMIN = "ADMIN",
    TEACHER = "TEACHER",
    USER = "USER",
}