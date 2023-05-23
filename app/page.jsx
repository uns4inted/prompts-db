import Feed from "@components/Feed";

const Home = () => {
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

      <Feed />
    </section>
  );
};

export default Home;
