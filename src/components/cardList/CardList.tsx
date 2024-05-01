import React from "react";
import styles from "./cardList.module.scss";
import Pagination from "../pagination/Pagination";
import Image from "next/image";
import Card from "../card/Card";

interface PostType {
  _id: string;
  img: string;
  createdAt: string;
  catSlug: string;
  slug: string;
  title: string;
  desc: string;
  // add other properties as needed
}

const getData = async (page: number, cat: string) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const body = await res.json();
    throw new Error(`Request failed: ${res.status} ${res.statusText}, ${JSON.stringify(body)}`);
  }

  return res.json();
};

const CardList = async ({ page, cat }: { page: number, cat: string }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item: PostType) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;