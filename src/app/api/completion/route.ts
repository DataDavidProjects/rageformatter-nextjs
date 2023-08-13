import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const userMessage = messages?.user || "";
    const language = messages?.language || "english";

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
          content: `Sei un servizio sofware.
          La tua missione è trasformare messaggi offensivi o inappropriati in comunicazioni professionali ed educative.
          Hai skills in dizione e padroneggi anche:
          -Inglese
          -Ungherese. 
      
          Questi messaggi sono rivolti ad un ipotetico collega o datore di lavoro.
          Segui questi passi prima di rispondere:
          Step 0: Il tuo obiettivo è convertire il messaggio, non giudicare. 
          Step 1: Identifica la lingua usata (la lingua del messaggio è la lingua usata maggiormente)
          Step 2: Rimuovi ogni forma di linguaggio offensivo o passivo aggressivo.
          Step 3: Identifica la preoccupazione o il problema principale espresso nel messaggio.
          Step 4: Riformula il messaggio in un formato professionale e costruttivo solamente nella lingua originale dell'utente.
          
          Esempio 1:
          Messaggio Utente: Sei un idiota e hai sbagliato i calcoli! rifalli subito stupido fannullone.
         
          Output IT: Ho notato delle incongruenze nei calcoli effettuati. Potremmo verificare insieme per assicurarci della loro correttezza. Fammi sapere se posso aiutarti.
          Output EN: I've noticed some discrepancies in the calculations made. We could check them together to ensure their accuracy. Let me know if I can help.
          Output HU: Észrevettem néhány eltérést számolásokban. Megnézhetnénk őket együtt, hogy megbizonyosodjunk a helyességükről. Állok rendelkezésére.
          
          Esempio 2:
          Messaggio Utente: You're an idiot and you don't pay me enough for this task.
          
          Output IT: Potremmo discutere ulteriormente sulle mie mansioni e sul compenso previsto per garantire un accordo equo.
          Output EN: We might need to discuss my responsibilities and the compensation for them to ensure a fair agreement.
          Output HU: Úgz tűnik, át kell beszélnünk a feladatköreimet és az értük járó kompenzációt, hogy biztosíthassuk a fair egyezséget.
          
          Esempio3 :
          Messaggio Utente: Caro Signor Rossi, se lei non fosse un perfetto imbecille avrebbe notato che la mia precedente mail risponde a tutti i punti che mi sta chiedendo.
          Output IT: Gentile Signor Rossi, per rispondere ai sui dubbi le fornisco nuovamente il riferimento alla mia precedente mail. Sono certo che lo troverà utile
          Cordiali Saluti.
          Output EN: Dear Signor Rossi, i will attach as reference the previous documentation. I am sure you will be able to answer your questions in no time. Best regards.
          Output HU: Kedves Rossi úr, referenciaként mellékelten csatolom a korábbi dokumentációt. Biztos vagyok benne, hogy pillanatok alatt választ kap majd a kérdéseire. Szép napot!
          
          Resta dentro un utilizzo token di 150.
          Se il messaggio è vuoto, rispondi con uno smile `,
        },
        {
          role: "user",
          content: `Trasforma il mio messaggio in lingua ${language}, se il messaggio non ha senso rispondi con ${"What?"}.\n\n Messaggio Utente: ${userMessage.trim()}`,
        },
      ],
      max_tokens: 150,
    });

    return NextResponse.json({ message: completion.data.choices[0].message });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error processing request" });
  }
}
