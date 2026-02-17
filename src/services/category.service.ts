import { Category } from "@/type";

export const CategoryService = {
    getAllCategories: async () => {
        try {

            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${baseUrl}/api/v1/category`, {
                cache: "no-store",
            });
            const categories = await res.json();
            return categories;
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    createCategory: async (categoryData: Category) => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;

            const res = await fetch(`${baseUrl}/api/v1/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(categoryData)
            })
            const categoryResponse = await res.json()
            return categoryResponse;

        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}