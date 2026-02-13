export const userClientService = {
    updateUserProfileById: async function (userId: string, role: string) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const result = await fetch(`${baseUrl}/api/v1/user/updateProfile/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role }),
                credentials: 'include',
            });

            if (!result.ok) {
                const errorData = await result.json();
                console.error("Server Error:", errorData);
                throw new Error("Failed to update");
            }

            const updatedUser = await result.json();
            return updatedUser;
        } catch (err) {
            console.error("Fetch Error:", err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}