import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find().populate({
      path: "creator"
    });

    console.log(JSON.stringify(prompts)); 

    const response = new Response(JSON.stringify(prompts), {
      status: 200,
    });

    // Add a query parameter to force a cache-busting reload
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error(`Error fetching prompts from database: ${error.message}`);
    return new Response("Failed to fetch prompts from database", {
      status: 500,
    });
  }
};
