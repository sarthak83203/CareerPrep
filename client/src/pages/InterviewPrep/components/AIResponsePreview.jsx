import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AIResponsePreview({ content }) {
  return (
    <div className="w-full max-w-none">
      
      {/* FIX: Added solid readable background */}
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6">

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            
            // Paragraph
            p({ children }) {
              return (
                <p className="leading-7 mb-4">
                  {children}
                </p>
              );
            },

            // Headings
            h1({ children }) {
              return (
                <h1 className="text-2xl font-bold mt-6 mb-4">
                  {children}
                </h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="text-xl font-semibold mt-5 mb-3">
                  {children}
                </h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="text-lg font-semibold mt-4 mb-2">
                  {children}
                </h3>
              );
            },

            // Lists
            ul({ children }) {
              return (
                <ul className="list-disc pl-6 mb-4">
                  {children}
                </ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="list-decimal pl-6 mb-4">
                  {children}
                </ol>
              );
            },

            // Code block
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              if (!inline && match) {
                return (
                  <div className="my-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                );
              }

              return (
                <code
                  className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            },

            // Blockquote
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600 dark:text-gray-400">
                  {children}
                </blockquote>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>

      </div>
    </div>
  );
}
