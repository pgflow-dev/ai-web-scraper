import OpenAI from "npm:openai";

export default async function summarize(content: string) {
  console.log("[summarize] processing content");

  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

  const openai = new OpenAI({ apiKey });

  const response = await openai.responses.parse({
    model: "gpt-4o",
    input: [
      { role: "system", content: "Return a short paragraph summary." },
      { role: "user", content },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "summary_format",
        schema: {
          type: "object",
          properties: {
            summary: {
              type: "string",
              description: "A short paragraph summary of the content",
            },
          },
          required: ["summary"],
          additionalProperties: false,
        },
      },
    },
  });

  return response.output_parsed.summary;
}
