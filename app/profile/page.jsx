"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect from page if not logged in
      router.push("/");
    }
  });
  const [posts, setPosts] = useState([]); // prompts of current user

  useEffect(() => {
    // fetch data from server
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    // redirect to edit page
    router.push(`/edit-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const newPosts = posts.filter((p) => p._id !== post._id);
        setPosts(newPosts);
      } catch (error) {}
    }
  };

  if(!session) {
    return null;
  }
  
  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile page!"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
