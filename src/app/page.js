"use client";

import BlogList from "@/components/BlogList/BlogList";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (!user) {
      router.replace("/login");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        setSearchText={setSearchText}
      />

      <Hero />

      <BlogList search={searchText} />
    </>
  );
}
