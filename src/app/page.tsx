import Link from "next/link";
import styles from "./homepage.module.scss";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

interface HomeProps {
  searchParams: {
    page: string;
    cat: string; // cat is now optional

    // other properties...
  };
}

export default function Home({ searchParams }: HomeProps) {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;
  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page} cat={cat}/>
        <Menu />
      </div>
    </div>
  );
}