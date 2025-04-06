import { MovieData } from '@/types';
import Link from 'next/link';
import style from './movie-item.module.css';

export default function MovieItem({
  id,
  title,
  subTitle,
  description,
  releaseDate,
  company,
  genres,
  runtime,
  posterImgUrl,
}: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.link}>
      <img src={posterImgUrl} alt={title} />
    </Link>
  );
}
