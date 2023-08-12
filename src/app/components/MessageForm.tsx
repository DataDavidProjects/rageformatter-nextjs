"use client";
import React, { useState, useEffect } from "react";
import { FaRegCopy } from "react-icons/fa";
import Link from "next/link";

const MessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

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
      body: JSON.stringify({ messages: { user: message } }),
    });

    if (!res.ok) {
      console.error(`Server responded with ${res.status}`);
      return;
    }

    const data = await res.json();
    setResponse(data.message.content);
    setLoading(false);
  };

  return (
    <div className="py-2 grid col-auto justify-center mt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 max-w-sm mx-auto rounded-2xl shadow-lg flex flex-col  space-y-4"
      >
        <label htmlFor="message" className="text-sm text-center text-gray-900">
          What you really think 👇:
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
          placeholder="Caro [utente], se lei non fosse un completo idiota troverebbe la risposta alla sua domanda nella mail precedente. Cretino!"
        ></textarea>

        {loading ? (
          <Spinner />
        ) : (
          <button
            type="submit"
            className="px-4 py-2 mx-20 text-white bg-red-700 rounded hover:bg-red-900"
          >
            Format
          </button>
        )}
        <Link
          href="/tutorial"
          className="text-xs text-gray-500 text-center p-2"
        >
          <p> 🆘 Need help?: Go on the tutorial page</p>
        </Link>
      </form>
      {response && (
        <div className="bg-white p-6 max-w-sm mx-auto rounded-2xl shadow-lg flex flex-col space-y-4 mt-10">
          <p className="text-sm text-center text-gray-900">
            What you will actually say ☕ :
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
