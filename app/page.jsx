'use client';

import { useEffect, useState } from "react";

import Feed from "@components/Feed";

const Home = () => {
  const [posts, setPosts] = useState([]); // prompts of current user

  useEffect(() => {
    // fetch data from server
    const fetchPosts = async () => {
      const res = await fetch(`/api/prompt`);
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center dark: head_text_dark">
        Discover & Share
        <br />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center dark: desc_dark">
        PromptsDB is a community-driven AI prompting database. It is a place to
        discover and share your favorite AI prompts.
      </p>

      <Feed posts={posts} />
    </section>
  );
};

export default Home;
