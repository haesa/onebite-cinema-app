import { MovieData, ReviewData } from '@/types';
import { notFound } from 'next/navigation';
import ReviewEditor from '@/components/movie-editor';
import ReviewItem from '@/components/review-item';
import style from './page.module.css';

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`
  );
  const movies: MovieData[] = await response.json();

  return movies.map(({ id }) => ({ id: id.toString() }));
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
    { cache: 'force-cache' }
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }

    return <div>오류가 발생했습니다.</div>;
  }

  const {
    title,
    subTitle,
    releaseDate,
    company,
    genres,
    runtime,
    description,
    posterImgUrl,
  }: MovieData = await response.json();

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url(${posterImgUrl})` }}
      >
        <img src={posterImgUrl} alt={title} />
      </div>
      <div className={style.title}>{title}</div>
      <div>
        {releaseDate} / {genres.join(', ')} / {runtime}
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div>{description}</div>
    </section>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.status}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <MovieDetail movieId={params.id} />
      <ReviewEditor movieId={params.id} />
      <ReviewList movieId={params.id} />
    </div>
  );
}
