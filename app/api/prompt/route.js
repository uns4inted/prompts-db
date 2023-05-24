import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  // Vercel serverless functions are getting cold when not used for a while.
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await connectToDB();
      const prompts = await Prompt.find({}).populate("creator");

      return new Response(JSON.stringify(prompts), {
        status: 200,
      });
    } catch (error) {
      retries++;
      console.error(`Error fetching prompts from database: ${error.message}`);
    }
  }

  // if we get here, it means we failed to fetch data from the database
  return new Response("Failed to fetch prompts from database", { status: 500 });
};
