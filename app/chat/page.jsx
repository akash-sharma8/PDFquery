"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
export default function ChatPage() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question.trim()) return;

        const userMessage = {
            role: "user",
            content: question,
        };

        setMessages((prev) => [...prev, userMessage]);

        const currentQuestion = question;
        setQuestion("");
        setLoading(true);

        try {
            const res = await fetch("/api/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: currentQuestion,
                }),
            });

            const data = await res.json();

            const assistantMessage = {
                role: "assistant",
                content: data.answer,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex h-screen flex-col bg-zinc-950 text-white">
            {/* Header */}
            <header className="flex justify-between border-b border-zinc-800 px-6 py-4">
                <h1 className="text-xl font-semibold">
                    PDF Query Assistant
                </h1>
                <a href='/' className="text-xl font-semibol ">
                     Add more
                </a>
            </header>

            {/* Chat Area */}
            <section className="flex-1 overflow-y-auto px-4 py-6">
                <div className="mx-auto max-w-4xl space-y-4">
                    {messages.length === 0 && (
                        <div className="mt-20 text-center text-zinc-400">
                            Ask questions about your uploaded PDFs
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={` prose prose-invert max-w-none rounded-2xl px-5 py-4 ${msg.role === "user" ? "bg-blue-600" : "bg-zinc-800" }`}>
                                <ReactMarkdown>
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="rounded-2xl bg-zinc-800 px-4 py-3">
                                Thinking...
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>
            </section>

            {/* Input */}
            <form
                onSubmit={handleSubmit}
                className="border-t border-zinc-800 p-4"
            >
                <div className="mx-auto flex max-w-4xl gap-3">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) =>
                            setQuestion(e.target.value)
                        }
                        placeholder="Ask a question..."
                        className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <button
                        disabled={loading}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                        Send
                    </button>
                </div>
            </form>
        </main>
    );
}