"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useTurnstile } from "@/lib/useTurnstile";

export default function TalkRequestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const { containerRef, getToken } = useTurnstile();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const token = await getToken();
      const res = await fetch("/api/talk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message, token }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <p className="font-serif italic text-2xl text-neutral-900 mb-3">
          {name.trim().split(" ")[0] ? `Thanks, ${name.trim().split(" ")[0]}.` : "Thanks for reaching out."}
        </p>
        <p className="text-neutral-600 max-w-[40ch] mx-auto">
          Your note is in. I&apos;ll reply personally within two business
          days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="Your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Email"
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Company or role"
        placeholder="Optional"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <Textarea
        label="What's going on?"
        placeholder="A challenge on your team, a question, or just hello. A few sentences is plenty."
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div ref={containerRef} />

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send request"}
      </Button>

      {status === "error" && (
        <p className="text-[#d64545] text-sm text-center">
          Something went wrong. Try again, or email{" "}
          <a href="mailto:begin@merlinleadership.com" className="underline">
            begin@merlinleadership.com
          </a>
          .
        </p>
      )}
    </form>
  );
}
