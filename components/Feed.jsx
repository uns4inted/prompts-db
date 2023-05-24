"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchTimerId, setSearchTimerId] = useState(null); // timer for search input handler
  const [posts, setPosts] = useState([]); // all prompts
  const [filteredPosts, setFilteredPosts] = useState([]); // filtered promts by [searchText]
  const [loadingStauts, setLoadingStatus] = useState('loading');

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

  const handleReloadPageClick = () => {
    window.location.reload();
  }


  useEffect(() => {
    // fetch data from server
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/prompt");
        const data = await res.json();
        setPosts(data);
        setLoadingStatus('loaded');
      } catch (error) {
        setLoadingStatus('error');
        return;
      }
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
          placeholder="Search by prompt, tag, or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer dark: search_input_dark"
        />
      </form>
      {loadingStauts === 'loading' &&
        <div className="mt-16">
          <h3 className="head_text text-center dark: head_text_dark">Loading...</h3>
        </div>
      }
      {loadingStauts === 'error' &&
        <div className="mt-16 flex flex-col items-center">
          <h1 className="head_text text-center dark: head_text_dark">
            <span className="text-3xl">Error on loading</span>
          </h1>
          <button type="button" className="mt-4 outline_btn dark: outline_btn_white" onClick={handleReloadPageClick}>
              Try again
          </button>
        </div>
      }
      { loadingStauts === 'loaded' &&
        <PromptCardList
          data={searchText.length ? filteredPosts : posts}
          handleTagClick={handleTagClick}
        />
      }
    </section>
  );
};

export default Feed;
