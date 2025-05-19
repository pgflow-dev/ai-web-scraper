import OpenAI from "npm:openai";

export default async function extractTags(content: string) {
  console.log("[extractTags] extracting tags");

  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

  const openai = new OpenAI({ apiKey });

  const response = await openai.responses.parse({
    model: "gpt-4o",
    input: [
      { role: "system", content: "Return 5-10 descriptive tags." },
      { role: "user", content },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "tags_format",
        schema: {
          type: "object",
          properties: {
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              description: "An array of 5-10 descriptive tags",
            },
          },
          required: ["tags"],
          additionalProperties: false,
        },
      },
    },
  });

  return response.output_parsed.tags;
}
