'use client';

export function Footer() {
    return (
        <footer className="bg-background border-t border-border">
            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Main Footer Content */}
                <div className="grid md:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold text-primary mb-2">SkillBridge</h3>
                        <p className="text-muted-foreground text-sm">
                            Connect with expert teachers and bridge your skill gaps.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Platform</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Find Teachers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Browse Skills
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    How It Works
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* For Teachers */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">For Teachers</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Become a Teacher
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Teacher Resources
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Earnings
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Community
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Cookie Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                    Accessibility
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Links */}
                <div className="border-t border-border pt-8 pb-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-muted-foreground text-sm">
                            © 2026 SkillBridge. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.655 3.743 11.386 11.386 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.586V9h3.586v1.561h.052c.502-.8 1.7-1.64 3.502-1.64 3.675 0 4.352 2.419 4.352 5.558v6.973zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                                </svg>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                                <span className="sr-only">GitHub</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.547 2.914 1.182.092-.92.35-1.548.636-1.904-2.22-.252-4.555-1.112-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.268.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.194 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
