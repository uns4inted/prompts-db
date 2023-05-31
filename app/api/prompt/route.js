import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find().populate({
      path: "creator"
    });

    const response = new Response(JSON.stringify(prompts), {
      status: 200,
    });

    // Add a unique identifier to the URL to force a cache-busting reload
    const url = new URL(req.url);
    url.searchParams.set("t", Date.now());
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Location", url.toString());

    return response;
  } catch (error) {
    console.error(`Error fetching prompts from database: ${error.message}`);
    return new Response("Failed to fetch prompts from database", {
      status: 500,
    });
  }
};
