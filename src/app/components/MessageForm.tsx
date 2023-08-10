"use client";
import React, { useState, useEffect } from "react";
import { FaRegCopy } from "react-icons/fa";
import Script from "next/script";
const MessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (message === "") {
      setResponse("");
    }
  }, [message]);

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(response)
      .then(() => {
        console.log("Text successfully copied to clipboard!");
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard", err);
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/completion/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: { user: message } }),
    });

    if (!res.ok) {
      console.error(`Server responded with ${res.status}`);
      return;
    }

    const data = await res.json();
    setResponse(data.message.content);
  };

  return (
    <div className="py-2 grid col-auto justify-center mt-12">
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-6061434464691027"
        async
        strategy="afterInteractive"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        crossOrigin="anonymous"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 max-w-sm mx-auto rounded-2xl shadow-lg flex flex-col  space-y-4"
      >
        <label htmlFor="message" className="text-sm text-center text-gray-900">
          Quello che pensi 👇:
        </label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="textarea"
          id="inputuser"
          cols={30}
          rows={10}
          className="p-2 w-full border rounded-md text-xs"
          placeholder="Caro [utente], se lei non fosse un completo idiota troverebbe la risposta alla sua domanda nella mail precedente, inoltre non mi pagano abbastanza per tollerare queste cazzate"
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 mx-20  text-white bg-red-700 rounded hover:bg-red-900"
        >
          Formatta
        </button>
      </form>
      {response && (
        <div className="bg-white p-6 max-w-sm mx-auto rounded-2xl shadow-lg flex flex-col space-y-4 mt-10">
          <p className="text-sm text-center text-gray-900">
            Quello che dirai ☕ :
          </p>
          <div className="relative mt-8">
            <textarea
              value={response}
              readOnly
              cols={30}
              rows={10}
              className="p-2 w-full border rounded-md text-xs bg-white"
            />
            <button
              onClick={handleCopyToClipboard}
              className="absolute top-1 right-1 text-gray-600 hover:text-gray-900"
              title="Copy to clipboard"
            >
              <FaRegCopy size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageForm;
