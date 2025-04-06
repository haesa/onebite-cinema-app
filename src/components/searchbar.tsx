'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import style from './searchbar.module.css';

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const [search, setSearch] = useState(q || '');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {
    if (!search || search === q) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={style.container}>
      <input
        type='text'
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder='검색어를 입력하세요'
      />
      <button type='button' onClick={onSearch}>
        검색
      </button>
    </div>
  );
}
