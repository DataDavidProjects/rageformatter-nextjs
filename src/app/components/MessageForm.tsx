"use client";
import React, { useState, useEffect } from "react";

const MessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (message === "") {
      setResponse("");
    }
  }, [message]);

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
          placeholder="Sei un incredibile idiota e anche se lavorare con te mi disgusta dobbiamo rifare la presentazione assieme..."
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 mx-20  text-white bg-red-700 rounded hover:bg-red-900"
        >
          Formatta
        </button>
      </form>
      {response && (
        <div className="bg-white p-6 max-w-sm mx-auto rounded-2xl shadow-lg flex flex-col  space-y-4 mt-10">
          <p className="text-sm text-center text-gray-900">
            Quello che dirai ☕ :
          </p>
          <textarea
            value={response}
            readOnly
            cols={30}
            rows={10}
            className="mt-8 p-2 w-full border rounded-md text-xs bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default MessageForm;
