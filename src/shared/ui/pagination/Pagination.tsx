import React from 'react';
import s from './Pagination.module.css';
import { PaginationNav } from './pagination-nav/PaginationNav';

type Props = {
  current: number;
  pagesCount: number;
  onChangePageNumber: (page: number) => void;
  isFetching: boolean;
};

export const Pagination: React.FC<Props> = ({
  current,
  pagesCount,
  onChangePageNumber,
  isFetching,
}) => {
  return (
    <div className={s.container}>
      <PaginationNav
        current={current}
        pagesCount={pagesCount}
        onChange={onChangePageNumber}
        disabled={isFetching}
      />
    </div>
  );
};
