"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient, signIn, signUp } from "@/lib/auth-client"
import { SingUpData } from "@/type"
import { redirect } from "next/dist/server/api-utils"

export default function SingUp() {
    const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const signUpData: SingUpData = {
                name,
                email,
                password,
                callbackURL: "http://localhost:3000"
            }

            // Only send role if it's TEACHER (default is STUDENT)
            if (role === "TEACHER") {
                signUpData.role = "TEACHER"
            }

            const res = await signUp.email(signUpData)
            // if(res){
                 
            // }
            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const handleGoogleLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: "http://localhost:3000"
        });
    };

    return (
        <div className="my-20">
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Sign up to get started as a student or teacher
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Already have an account?</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            {/* Role Selection */}
                            <div className="grid gap-3">
                                <Label>Join as</Label>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            id="student"
                                            value="STUDENT"
                                            checked={role === "STUDENT"}
                                            onChange={(e) => setRole(e.target.value as "STUDENT" | "TEACHER")}
                                            className="w-4 h-4 cursor-pointer"
                                        />
                                        <Label htmlFor="student" className="cursor-pointer font-normal">
                                            Student
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            id="teacher"
                                            value="TEACHER"
                                            checked={role === "TEACHER"}
                                            onChange={(e) => setRole(e.target.value as "STUDENT" | "TEACHER")}
                                            className="w-4 h-4 cursor-pointer"
                                        />
                                        <Label htmlFor="teacher" className="cursor-pointer font-normal">
                                            Teacher
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-6">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">

                    <Button onClick={() => handleGoogleLogin()} variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
