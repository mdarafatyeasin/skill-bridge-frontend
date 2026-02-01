'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Users, Calendar, ArrowRight, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

const allTeachers = [
    {
        id: 1,
        name: 'Sarah Johnson',
        skill: 'Web Development',
        experience: '8+ years',
        rating: 4.9,
        students: '2.3K',
        description: 'Full-stack developer specializing in React and Node.js',
        badge: 'Top Rated',
        price: '$50/hour',
    },
    {
        id: 2,
        name: 'Michael Chen',
        skill: 'Data Science',
        experience: '6+ years',
        rating: 4.8,
        students: '1.8K',
        description: 'ML engineer with expertise in Python and TensorFlow',
        badge: 'Popular',
        price: '$60/hour',
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        skill: 'UI/UX Design',
        experience: '7+ years',
        rating: 4.9,
        students: '1.5K',
        description: 'Design systems expert and product design consultant',
        badge: 'Top Rated',
        price: '$55/hour',
    },
    {
        id: 4,
        name: 'David Williams',
        skill: 'Cloud Engineering',
        experience: '9+ years',
        rating: 4.7,
        students: '2.1K',
        description: 'AWS certified architect and DevOps specialist',
        badge: 'Expert',
        price: '$65/hour',
    },
    {
        id: 5,
        name: 'Jessica Lee',
        skill: 'Mobile Development',
        experience: '5+ years',
        rating: 4.8,
        students: '1.2K',
        description: 'iOS and Android development expert with React Native',
        badge: 'Trending',
        price: '$45/hour',
    },
    {
        id: 6,
        name: 'Alex Patel',
        skill: 'Backend Development',
        experience: '10+ years',
        rating: 4.9,
        students: '3K',
        description: 'Enterprise-scale backend solutions and system design',
        badge: 'Top Rated',
        price: '$70/hour',
    },
    {
        id: 7,
        name: 'Maria Garcia',
        skill: 'Web Development',
        experience: '6+ years',
        rating: 4.7,
        students: '1.9K',
        description: 'Frontend specialist with expertise in Vue.js and Svelte',
        badge: 'Popular',
        price: '$48/hour',
    },
    {
        id: 8,
        name: 'James Wilson',
        skill: 'Data Science',
        experience: '8+ years',
        rating: 4.8,
        students: '2.5K',
        description: 'Big data solutions and advanced analytics expert',
        badge: 'Expert',
        price: '$65/hour',
    },
];

export function TeachersGrid() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [sortBy, setSortBy] = useState('rating');
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const skills = Array.from(new Set(allTeachers.map((t) => t.skill)));

    const filteredAndSorted = useMemo(() => {
        const filtered = allTeachers.filter((teacher) => {
            const matchesSearch =
                teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesSkill = !selectedSkill || teacher.skill === selectedSkill;

            return matchesSearch && matchesSkill;
        });

        filtered.sort((a, b) => {
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'experience') {
                const expA = parseInt(a.experience);
                const expB = parseInt(b.experience);
                return expB - expA;
            }
            if (sortBy === 'students') {
                const studA = parseInt(a.students);
                const studB = parseInt(b.students);
                return studB - studA;
            }
            return 0;
        });

        return filtered;
    }, [searchTerm, selectedSkill, sortBy]);

    return (
        <div className="space-y-8">
            {/* Filters Section */}
            <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/60 dark:from-emerald-500/10 dark:to-teal-500/10 border-2 border-emerald-200/60 dark:border-emerald-500/40 rounded-xl p-6">
                <div className="space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by teacher name or skill..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-emerald-200/50 dark:border-emerald-500/30 bg-white dark:bg-primary/5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Filters Row */}
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Skill Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Filter by Skill</label>
                            <select
                                value={selectedSkill}
                                onChange={(e) => setSelectedSkill(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-emerald-200/50 dark:border-emerald-500/30 bg-white dark:bg-primary/5 text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            >
                                <option value="">All Skills</option>
                                {skills.map((skill) => (
                                    <option key={skill} value={skill}>
                                        {skill}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-emerald-200/50 dark:border-emerald-500/30 bg-white dark:bg-primary/5 text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            >
                                <option value="rating">Highest Rating</option>
                                <option value="experience">Most Experience</option>
                                <option value="students">Most Students</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="flex items-end">
                            <div className="text-sm text-muted-foreground">
                                Showing <span className="font-semibold text-foreground">{filteredAndSorted.length}</span> of{' '}
                                <span className="font-semibold text-foreground">{allTeachers.length}</span> teachers
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Teachers Grid */}
            {filteredAndSorted.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSorted.map((teacher) => (
                        <Card
                            key={teacher.id}
                            className="bg-gradient-to-br from-emerald-50/80 to-teal-50/60 dark:from-emerald-500/10 dark:to-teal-500/10 border-2 border-emerald-200/60 dark:border-emerald-500/40 p-6 hover:border-emerald-400 dark:hover:border-emerald-400/70 hover:shadow-xl dark:hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer group overflow-hidden relative"
                            onMouseEnter={() => setHoveredId(teacher.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-teal-400/0 group-hover:from-emerald-400/5 group-hover:to-teal-400/5 dark:group-hover:from-emerald-400/10 dark:group-hover:to-teal-400/10 transition-all duration-300" />

                            <div className="relative z-10">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-bold text-foreground">{teacher.name}</h3>
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
                                                {teacher.badge}
                                            </span>
                                        </div>
                                        <p className="text-emerald-600 dark:text-emerald-300 font-semibold text-sm">{teacher.skill}</p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-emerald-200/50 dark:border-emerald-500/30">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold text-foreground text-sm">{teacher.rating}</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                                            <span className="font-bold text-foreground text-sm">{teacher.students}</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                                            <span className="font-bold text-foreground text-sm text-xs">{teacher.experience}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-muted-foreground text-sm mb-4 group-hover:text-foreground/80 transition-colors">
                                    {teacher.description}
                                </p>

                                {/* Price and Button */}
                                <div className="flex items-center justify-between">
                                    <span className="text-emerald-600 dark:text-emerald-300 font-bold">{teacher.price}</span>
                                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white group/btn">
                                        Book Now
                                        <ArrowRight className={`w-4 h-4 ml-1 transition-transform ${hoveredId === teacher.id ? 'translate-x-1' : ''}`} />
                                    </Button>
                                </div>

                                {/* Animated gradient line */}
                                <div className={`mt-4 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-300 ${hoveredId === teacher.id ? 'w-full' : 'w-0'}`} />
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-2">No teachers found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    );
}
