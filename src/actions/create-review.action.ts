'use server';

export async function createReviewAction(formData: FormData) {
  const movieId = formData.get('movieId');
  const content = formData.get('content');
  const author = formData.get('author');

  if (!movieId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ movieId, content, author }),
      }
    );

    console.log(response.status);
  } catch (error) {
    console.error(error);
    return;
  }
}
