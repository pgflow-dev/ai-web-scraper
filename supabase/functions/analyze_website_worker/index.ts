import { EdgeWorker } from "jsr:@pgflow/edge-worker";
import AnalyzeWebsite from "../_flows/analyze_website.ts";

EdgeWorker.start(AnalyzeWebsite); // That's it! 🤯
