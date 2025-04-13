import { ReviewData } from '@/types';
import style from './review-item.module.css';

export default function ReviewItem({ content, author, createdAt }: ReviewData) {
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
      <div className={style.delete_btn}>리뷰 삭제하기</div>
    </div>
  );
}
