import { Flow } from "npm:@pgflow/dsl";
import scrapeWebsite from "../_tasks/scrapeWebsite.ts";
import summarize from "../_tasks/summarize.ts";
import extractTags from "../_tasks/extractTags.ts";
import saveToDb from "../_tasks/saveToDb.ts";

type Input = { url: string };

export default new Flow<Input>({ slug: "analyzeWebsite", maxAttempts: 3 })
  .step({ slug: "website" }, ({ run }) => scrapeWebsite(run.url))
  .step({ slug: "summary", dependsOn: ["website"] }, ({ website }) =>
    summarize(website.content),
  )
  .step({ slug: "tags", dependsOn: ["website"] }, ({ website }) =>
    extractTags(website.content),
  )
  .step(
    { slug: "saveToDb", dependsOn: ["summary", "tags"] },
    ({ run, summary, tags }) =>
      saveToDb({ website_url: run.url, summary, tags }),
  );
