import { useLayoutEffect, useState } from "react";
import { supabase } from "../Services/supabase";
import { Category } from "./Category";

type Category = {
  uuid: string;
  name: string;
};

export const Categories = () => {
  const [categories, setCategories] = useState<Category[] | null>([]);

  async function fetchData() {
    try {
      const { data, error } = await supabase.from("Categories").select("*");
      if (error) throw error;
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="w-fit flex flex-col gap-4 text-3xl px-12 pt-44">
      <Category key="all">All</Category>
      {categories &&
        categories.map(({ uuid, name }) => (
          <Category key={uuid}>{name}</Category>
        ))}
    </section>
  );
};
