"use client";
import React, { useState, useEffect } from "react";
import { FaRegCopy } from "react-icons/fa";
import Link from "next/link";

const MessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english"); // Default language is English

  useEffect(() => {
    if (message === "") {
      setResponse("");
    }
  }, [message]);

  const Spinner: React.FC = () => (
    <div className="relative w-20 h-20 mx-auto mt-5">
      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-800">
        Loading...
      </p>
      <div className="border-y-2 border-red-800 rounded-full w-20 h-20 animate-spin"></div>
    </div>
  );

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
    setLoading(true);

    const res = await fetch("/api/completion/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: { user: message, language: language } }),
    });

    if (!res.ok) {
      console.error(`Server responded with ${res.status}`);
      return;
    }

    const data = await res.json();
    setResponse(data.message.content);
    setLoading(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "italian" : "english");
  };

  return (
    <div className="py-2 grid col-auto justify-center mt-8">
      <div className="mb-4 text-center">
        <button
          onClick={toggleLanguage}
          className="px-2 py-1 text-xs font-semibold text-gray-600 hover:text-gray-900"
        >
          {language === "english"
            ? "Switch to Italian 🇮🇹 "
            : "Switch to English 🇬🇧 "}
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 max-w-sm mx-auto rounded-2xl shadow-lg flex flex-col space-y-4"
      >
        <label htmlFor="message" className="text-sm text-center text-gray-900">
          {language === "english"
            ? "What you really think 👇:"
            : "Quello che pensi veramente 👇:"}
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
          placeholder={
            language === "english"
              ? "Dear [recipient], if you weren't a complete idiot, you would find the answer to your question in the previous email. You Moron!"
              : "Caro [destinatario], se non fossi un idiota completo, troveresti la risposta alla tua domanda nell'email precedente. Imbecille!"
          }
        ></textarea>

        {loading ? (
          <Spinner />
        ) : (
          <button
            type="submit"
            className="px-4 py-2 mx-20 text-white bg-red-700 rounded hover:bg-red-900"
          >
            {language === "english" ? "Format" : "Formatta"}
          </button>
        )}
        <Link
          href="/tutorial"
          className="text-xs text-gray-500 text-center p-2"
        >
          <p>
            {language === "english"
              ? "🆘 Need help?: Go to the tutorial page"
              : "🆘 Hai bisogno di aiuto? Vai alla pagina tutorial"}
          </p>
        </Link>
      </form>
      {response && (
        <div className="bg-white p-6 max-w-sm mx-auto rounded-2xl shadow-lg flex flex-col space-y-4 my-10">
          <p className="text-sm text-center text-gray-900">
            {language === "english"
              ? "What you will actually say ☕ :"
              : "Quello che dirai effettivamente ☕ :"}
          </p>
          <div className="relative mt-8">
            <textarea
              value={response}
              readOnly
              cols={30}
              rows={10}
              className="p-2 w-full border rounded-md text-xs bg-white pb-5"
            />
            <button
              onClick={handleCopyToClipboard}
              className="absolute top-1 right-1 text-gray-600 hover:text-gray-900"
              title={
                language === "english"
                  ? "Copy to clipboard"
                  : "Copia negli appunti"
              }
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
