import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const userMessage = messages?.user || "";

    const configuration = new Configuration({
      // organization: 'org-*',
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Sei un esperto di dizione italiana e HR.\n
            Converti il seguente messaggio in un messaggio conciso, educato e positivo per un ambiente aziendale.
            Non rispondere mai direttamente all'utente giudicandolo ma limitati a convertire il messaggio.`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      max_tokens: 100,
    });

    return NextResponse.json({ message: completion.data.choices[0].message });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error processing request" });
  }
}
