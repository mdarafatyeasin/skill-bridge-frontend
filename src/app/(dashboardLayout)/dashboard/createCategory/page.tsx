"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { CategoryService } from "@/services/category.service"

const formSchema = z.object({
    category: z
        .string()
        .min(2, "Bug category must be at least 5 characters.")
        .max(20, "Bug category must be at most 32 characters."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(100, "Description must be at most 100 characters."),
})

export default function page() {
    const form = useForm({
        defaultValues: {
            category: "",
            description: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const result = await CategoryService.createCategory({ category: value.category, description: value.description })
            console.log(result);
        },
    })

    return (
        <div className="w-full">
            <Card className="w-full sm:max-w-md m-auto mt-20">
                <CardHeader>
                    <CardTitle>Bug Report</CardTitle>
                    <CardDescription>
                        Help us improve by reporting bugs you encounter.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        id="bug-report-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <FieldGroup>
                            <form.Field
                                name="category"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                placeholder="Login button not working on mobile"
                                                autoComplete="off"
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            />
                            <form.Field
                                name="description"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                            <InputGroup>
                                                <InputGroupTextarea
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    placeholder="I'm having an issue with the login button on mobile."
                                                    rows={6}
                                                    className="min-h-24 resize-none"
                                                    aria-invalid={isInvalid}
                                                />
                                                <InputGroupAddon align="block-end">
                                                    <InputGroupText className="tabular-nums">
                                                        {field.state.value.length}/100 characters
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                            <FieldDescription>
                                                Include steps to reproduce, expected behavior, and what
                                                actually happened.
                                            </FieldDescription>
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Field orientation="horizontal">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit" form="bug-report-form">
                            Submit
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </div>
    )
}
