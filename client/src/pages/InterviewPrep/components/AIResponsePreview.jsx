import { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AIResponsePreview({ content }) {
  if (!content) return null;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-800 p-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p({ children }) {
            return (
              <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
                {children}
              </p>
            );
          },
          strong({ children }) {
            return (
              <strong className="font-semibold text-gray-900 dark:text-white">
                {children}
              </strong>
            );
          },
          em({ children }) {
            return (
              <em className="italic text-gray-700 dark:text-gray-300">
                {children}
              </em>
            );
          },
          ul({ children }) {
            return (
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                {children}
              </ol>
            );
          },
          li({ children }) {
            return <li className="leading-6">{children}</li>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300 rounded">
                {children}
              </blockquote>
            );
          },
          h1({ children }) {
            return (
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-6 mb-4 border-b pb-2">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
                {children}
              </h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                {children}
              </h4>
            );
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {children}
              </a>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border border-gray-300 dark:border-zinc-700 rounded-lg overflow-hidden">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead className="bg-gray-100 dark:bg-zinc-800">
                {children}
              </thead>
            );
          },
          tbody({ children }) {
            return (
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                {children}
              </tbody>
            );
          },
          tr({ children }) {
            return (
              <tr className="hover:bg-gray-50 dark:hover:bg-zinc-800/60">
                {children}
              </tr>
            );
          },
          th({ children }) {
            return (
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white border-b">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                {children}
              </td>
            );
          },
          hr() {
            return (
              <hr className="my-8 border-gray-300 dark:border-zinc-700" />
            );
          },
          img({ src, alt }) {
            return (
              <img
                src={src}
                alt={alt}
                className="max-w-full rounded-lg shadow my-4"
              />
            );
          },
          code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1] || "text";
            const codeString = String(children).replace(/\n$/, "");

            return !inline ? (
              <div className="my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700">
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-zinc-800 text-xs font-medium text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <LuCode size={14} />
                    {language}
                  </div>
                </div>

                {/* Code + Copy */}
                <CodeBlock code={codeString} language={language} />
              </div>
            ) : (
              <code className="bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400">
                {children}
              </code>
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

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-200 transition"
      >
        {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>

      <SyntaxHighlighter
        style={oneLight}
        language={language}
        PreTag="div"
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
