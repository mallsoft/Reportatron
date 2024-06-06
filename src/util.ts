import OpenAI from "openai";
import { ReportPrompt, Report } from "./types";

const SECRET = "sshhhhhhh!";
const MODEL = "gpt-4o";

const openai = new OpenAI({
  apiKey: SECRET,
});

export const requestReport = async (promt: ReportPrompt): Promise<Report> => {
  console.log("Generating report");

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
          You are a helpful financial assistant designed to output ONLY JSON with the following signature:

          type Report = {
            title: string; // short non generic title containing the most important parts of the report
            report: string; // a terse report
            suggestedActions: string; // suggestion(s) for actions that should be taken, if any
          };

          This is based on firm information provided, including last months transactions.
          The report should be consise and highlight only interesting or important details.
          Anything out of the ordinary should especially be highlighted.

          The language should be simple.
        `,
      },
      { role: "user", content: JSON.stringify(promt) },
    ],
    model: MODEL,
    response_format: { type: "json_object" },
  });

  console.log("Report generated");

  const res = completion.choices[0].message.content;
  if (!res) throw "No res";
  return JSON.parse(res);
};

//A small comic strip illustrating this short financial report:
export const reportToImage = async (prompt: Report) => {
  console.log("Generating image");

  const resp = await openai.images.generate({
    model: "dall-e-3",
    prompt: `
      A cute animal expressing the state of the following report:
      ${JSON.stringify(prompt)}
    `,
    n: 1,
    size: "1024x1024",
  });

  console.log("Image generated");

  return resp.data[0].url;
};
