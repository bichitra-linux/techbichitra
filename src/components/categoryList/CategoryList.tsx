import React from "react";
import styles from "./categoryList.module.scss";
import Link from "next/link";
import Image from "next/image";

interface Item {
  name: string;
  _id: string;
  title: string;
  img?: string;
  slug: string; 
  // other properties...
}

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(`Request failed: ${res.status} ${res.statusText}, ${JSON.stringify(body)}`);
  }

  return res.json();
};

const CategoryList = async () => {
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item: Item) => (
          <Link
            href="/blog?cat=style"
            className={`${styles.category} ${styles[item.slug]}`}
            key={item._id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;