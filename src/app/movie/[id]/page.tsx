import { MovieData } from '@/types';
import { notFound } from 'next/navigation';
import style from './page.module.css';

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`
  );
  const movies: MovieData[] = await response.json();

  return movies.map(({ id }) => ({ id: id.toString() }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`,
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
    <div className={style.container}>
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
    </div>
  );
}
