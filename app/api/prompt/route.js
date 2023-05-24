import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    console.error(`Error fetching prompts from database: ${error.message}`);
    return new Response("Failed to fetch prompts from database", {
      status: 500,
    });
  }
};
