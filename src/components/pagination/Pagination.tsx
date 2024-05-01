"use client";

import React from "react";
import styles from "./pagination.module.scss";
import { useRouter } from "next/navigation";


interface PaginationProps {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ page, hasPrev, hasNext }) => {
  const router = useRouter();
 
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;