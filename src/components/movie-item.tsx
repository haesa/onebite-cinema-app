import { MovieData } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import style from './movie-item.module.css';

export default function MovieItem({ id, title, posterImgUrl }: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.link}>
      <Image className={style.image} src={posterImgUrl} fill alt={title} />
    </Link>
  );
}
