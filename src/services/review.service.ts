export const reviewService = {
    createReview: async function (reviewData: { booking_id: string, comment: string, tutor_id: string, rating?: number }) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${baseUrl}/api/v1/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(reviewData)
            });
            const reviewResponse = await res.json();
            return reviewResponse;
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
}