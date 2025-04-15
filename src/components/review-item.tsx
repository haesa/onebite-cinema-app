import { ReviewData } from '@/types';
import ReviewItemDeleteButton from '@/components/review-item-delete-button';
import style from './review-item.module.css';

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.header_container}>
        <div className={style.author}>{author}</div>
        <div className={style.createdAt}>
          {`${new Date(createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}일 작성됨`}
        </div>
      </div>
      <div>{content}</div>
      <div className={style.delete_btn}>
        <ReviewItemDeleteButton reviewId={id} movieId={movieId} />
      </div>
    </div>
  );
}
