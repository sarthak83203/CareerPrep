import { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AIResponsePreview({ content }) {
  if (!content) return null;

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-800 p-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          /* ---------------- Paragraph ---------------- */
          p: ({ children }) => (
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              {children}
            </p>
          ),

          /* ---------------- Headings ---------------- */
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-6 mb-4 border-b pb-2 text-gray-900 dark:text-white">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-5 mb-2 text-gray-900 dark:text-white">
              {children}
            </h3>
          ),

          /* ---------------- Lists ---------------- */
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
              {children}
            </ol>
          ),

          /* ---------------- Blockquote ---------------- */
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300 rounded">
              {children}
            </blockquote>
          ),

          /* ---------------- Code ---------------- */
          code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1] || "text";
            const codeString = String(children).replace(/\n$/, "");

            // Inline code
            if (inline) {
              return (
                <code className="bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400">
                  {children}
                </code>
              );
            }

            // Block code
            return (
              <CodeBlock
                code={codeString}
                language={language}
                theme={isDark ? oneDark : oneLight}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/* ---------------- CodeBlock Component ---------------- */

function CodeBlock({ code, language, theme }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="my-4 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-zinc-800 text-xs font-medium text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <LuCode size={14} />
          {language}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
        >
          {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* IMPORTANT: Use pre wrapper to avoid hydration error */}
      <SyntaxHighlighter
        style={theme}
        language={language}
        PreTag="pre"
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
