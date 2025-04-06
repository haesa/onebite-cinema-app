import MovieItem from '@/components/movie-item';
import movies from '@/mock/dummy.json';
import style from './page.module.css';

const searchResults = movies.slice(0, 5);

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className={style.container}>
      {searchResults.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
