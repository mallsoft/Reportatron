import { Hono } from "hono";
import { reportToImage, requestReport } from "./util";
import { Report, ReportPrompt } from "./types";

const app = new Hono();

app.post("/report", async (c) => {
  const body: ReportPrompt = await c.req.json();

  const report: Report = await requestReport(body);

  return c.json(report);
});

app.post("/imagereport", async (c) => {
  const report: Report = await c.req.json();

  const url = await reportToImage(report);

  return c.json({ url });
});

export default app;
