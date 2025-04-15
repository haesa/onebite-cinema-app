'use server';

import { delay } from '@/util/delay';
import { revalidateTag } from 'next/cache';

export async function createReviewAction(_: any, formData: FormData) {
  const movieId = formData.get('movieId');
  const content = formData.get('content');
  const author = formData.get('author');

  if (!movieId || !content || !author) {
    return {
      status: false,
      error: '모든 필드를 입력해주세요.',
    };
  }

  try {
    await delay(2000);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ movieId, content, author }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${movieId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다: ${error}`,
    };
  }
}
