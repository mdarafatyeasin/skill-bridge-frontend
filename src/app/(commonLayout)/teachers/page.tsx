import SearchFilters from "@/components/modules/teachers/search-filters";
import TutorCard from "@/components/modules/teachers/tutor-card";
import { env } from "@/env";
import { userService } from "@/services/user.service";
import { cookies } from "next/headers";

export interface Category {
    id: string;
    category: string;
    description: string;
    created_at: string;
    update_at: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    created_at?: string;
    update_at?: string;
}

export interface Tutor {
    id: string;
    user_id: string;
    category_id: string;
    experience_year: number;
    hourly_rate: number;
    qualification: string;
    rating_avg: number;
    created_at: string;
    update_at: string;
    user: User;
    category: Category;
}


export default async function TeachersPage() {
    const session = await userService.getSession()
    console.log(session);
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/api/v1/tutor`, {
        cache: "no-store",
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    const { data: tutors } = await res.json();
    console.log(tutors);
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                        Find Your Perfect Tutor
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Connect with experienced tutors and unlock your potential. Choose from our top-rated educators across various subjects.
                    </p>
                </div>

                {/* Search and Filters */}
                <SearchFilters />

                {/* Tutors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {tutors.map((tutor: Tutor) => (
                        <TutorCard key={tutor.id} tutor={tutor} />
                    ))}
                </div>
            </div>
        </main>
    );
}

