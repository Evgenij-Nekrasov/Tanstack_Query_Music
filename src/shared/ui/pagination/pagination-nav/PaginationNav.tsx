import React from 'react';
import s from './PaginationNav.module.css';
import { getPaginationPages } from '../utils/getPaginationPages';

type Props = {
  current: number;
  pagesCount: number;
  onChange: (page: number) => void;
  isFetching: boolean;
};

const SIBLING_COUNT = 1;

export const PaginationNav: React.FC<Props> = ({
  current,
  pagesCount,
  onChange,
  isFetching,
}) => {
  const pages = getPaginationPages(current, pagesCount, SIBLING_COUNT);

  return (
    <div className={s.pagination}>
      {pages.map((item, idx) => {
        const isEllipsis = item === '...';
        const isActive = item === current || isFetching;

        if (isEllipsis) {
          return (
            <span className={s.ellipsis} key={`ellipsis-${idx}`}>
              …
            </span>
          );
        }

        return (
          <button
            key={item}
            type="button"
            className={`${s.pageButton}_${idx} ${isActive ? s.pageButtonActive : ''}`}
            disabled={isActive}
            onClick={() => !isActive && onChange(Number(item))}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};
