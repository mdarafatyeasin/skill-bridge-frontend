import { Star, Clock, BookOpen, CheckCircle, MessageSquare } from 'lucide-react'
import { teacherService } from '@/services/teachers.service'
import BookingCard from '@/components/modules/booking/bookingCard'

type Review = {
    rating: number
    name: string
    comment?: string
}

export default async function TutorDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { data: tutor } = await teacherService.getTutorsById(id)

    if (!tutor) {
        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-12 text-center">
                    <p className="text-muted-foreground">Tutor not found</p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section with Background */}
            <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/5 pt-12 pb-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Profile Avatar */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-5xl font-bold text-white shadow-lg">
                                {tutor.user?.name?.charAt(0) || 'T'}
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 pt-4">
                            <div className="mb-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{tutor.user.name}</h1>
                                <p className="text-xl text-primary font-semibold mb-1">{tutor.category.category} Tutor</p>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <BookOpen className="w-5 h-5" />
                                    <span>{tutor.qualification}</span>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="flex flex-wrap gap-4 md:gap-8 py-6 border-y border-border">
                                <div className="flex items-center gap-3">
                                    <Star className="w-6 h-6 text-secondary fill-secondary" />
                                    <div>
                                        <div className="text-2xl font-bold text-foreground">{tutor.rating_avg}</div>
                                        <div className="text-sm text-muted-foreground">Rating</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-6 h-6 text-primary" />
                                    <div>
                                        <div className="text-2xl font-bold text-foreground">{tutor.experience_year}+</div>
                                        <div className="text-sm text-muted-foreground">Years Experience</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">$</span>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-foreground">${tutor.hourly_rate}/hr</div>
                                        <div className="text-sm text-muted-foreground">Hourly Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Details */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About Section */}
                            <div className="bg-card rounded-xl border border-border p-8">
                                <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    I`&apos;`m a passionate {tutor.category.category} tutor with {tutor.experience_year} years of teaching experience. I specialize in making complex concepts easy to understand through personalized lessons tailored to each student`&apos;`s learning style. My approach combines theory with practical applications to ensure long-term retention and genuine understanding.
                                </p>
                            </div>

                            {/* Qualifications */}
                            <div className="bg-card rounded-xl border border-border p-8">
                                <h2 className="text-2xl font-bold text-foreground mb-6">Qualifications & Expertise</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1">{tutor.qualification}</h3>
                                            <p className="text-muted-foreground">Professional degree with strong academic foundation</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1">{tutor.experience_year} Years of Teaching</h3>
                                            <p className="text-muted-foreground">Extensive experience working with diverse learners</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1">Certified Educator</h3>
                                            <p className="text-muted-foreground">Ongoing professional development and training</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Teaching Methods */}
                            <div className="bg-card rounded-xl border border-border p-8">
                                <h2 className="text-2xl font-bold text-foreground mb-6">Teaching Methods</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                                        <h3 className="font-semibold text-foreground mb-2">Interactive Learning</h3>
                                        <p className="text-sm text-muted-foreground">Engaging discussions and problem-solving sessions</p>
                                    </div>
                                    <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                                        <h3 className="font-semibold text-foreground mb-2">Personalized Approach</h3>
                                        <p className="text-sm text-muted-foreground">Customized lesson plans for each student</p>
                                    </div>
                                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                                        <h3 className="font-semibold text-foreground mb-2">Real-World Examples</h3>
                                        <p className="text-sm text-muted-foreground">Practical applications of concepts</p>
                                    </div>
                                    <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                                        <h3 className="font-semibold text-foreground mb-2">Progress Tracking</h3>
                                        <p className="text-sm text-muted-foreground">Regular assessments and feedback</p>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews Section */}
                            <div className="bg-card rounded-xl border border-border p-8">
                                <h2 className="text-2xl font-bold text-foreground mb-6">Student Reviews</h2>
                                {tutor.reviews.length === 0 ? (
                                    <div className="text-center py-12">
                                        <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                                        <p className="text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {tutor.reviews.map((review: Review, index: number) => (
                                            <div key={index} className="border-b border-border pb-4 last:border-b-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${i < review.rating ? 'fill-secondary' : 'text-muted-foreground'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm font-semibold text-foreground">{review.name}</span>
                                                </div>
                                                <p className="text-muted-foreground text-sm">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Booking Card */}
                        <div className="lg:col-span-1">
                            <BookingCard hourlyRate={tutor.hourly_rate} timeSlots={tutor.timeSlots} tutorId={id} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
