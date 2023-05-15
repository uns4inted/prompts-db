"use client";

import { useEffect, useState } from "react";

import PromptCard from "./PromptCard";

// PromptCardList component is implemented for the feed page only
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => {
        return (
          <PromptCard
            key={prompt._id}
            post={prompt}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimerId, setSearchTimerId] = useState(null); // timer for search input handler
  const [posts, setPosts] = useState([]); // all prompts
  const [filteredPosts, setFilteredPosts] = useState([]); // filtered promts by [searchText]

  const handleSearchChange = (e) => {
    clearTimeout(searchTimerId); // clear previous timer
    setSearchText(e.target.value);

    // debounce search input
    setSearchTimerId(
      setTimeout(() => {
        setFilteredPosts(filterPrompts(e.target.value));
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    setFilteredPosts(filterPrompts(tag));
  };

  useEffect(() => {
    // fetch data from server
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    if (!searchText) return posts;
    const regex = new RegExp(searchText, "i"); // case insensitive
    let res = posts.filter((post) => {
      return (
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
      );
    });
    return res;
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchText.length ? filteredPosts : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
