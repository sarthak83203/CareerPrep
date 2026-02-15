import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AIResponsePreview({ content }) {
  return (
    <div className="w-full max-w-none">
      
      <div className="
        relative
        bg-white/90 dark:bg-slate-900/90
        backdrop-blur-xl
        text-slate-800 dark:text-slate-100
        rounded-3xl
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        border border-slate-200/60 dark:border-slate-700/60
        p-8
        transition-all duration-500
        hover:shadow-[0_25px_80px_rgba(99,102,241,0.25)]
      ">

        {/* Gradient Top Accent */}
        <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-3xl 
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            
            p({ children }) {
              return (
                <p className="leading-8 text-[15px] mb-5 text-slate-700 dark:text-slate-300">
                  {children}
                </p>
              );
            },

            h1({ children }) {
              return (
                <h1 className="text-3xl font-bold mt-8 mb-5 
                  bg-gradient-to-r from-indigo-500 to-purple-500 
                  bg-clip-text text-transparent">
                  {children}
                </h1>
              );
            },

            h2({ children }) {
              return (
                <h2 className="text-2xl font-semibold mt-7 mb-4 text-indigo-600 dark:text-indigo-400">
                  {children}
                </h2>
              );
            },

            h3({ children }) {
              return (
                <h3 className="text-xl font-semibold mt-6 mb-3 text-slate-800 dark:text-slate-200">
                  {children}
                </h3>
              );
            },

            ul({ children }) {
              return (
                <ul className="list-disc pl-6 mb-5 space-y-2 marker:text-indigo-500">
                  {children}
                </ul>
              );
            },

            ol({ children }) {
              return (
                <ol className="list-decimal pl-6 mb-5 space-y-2 marker:text-purple-500">
                  {children}
                </ol>
              );
            },

            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              if (!inline && match) {
                return (
                  <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
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
                  className="
                    bg-indigo-50 dark:bg-slate-800
                    text-indigo-600 dark:text-indigo-400
                    px-2 py-1 rounded-md text-sm font-medium
                  "
                  {...props}
                >
                  {children}
                </code>
              );
            },

            blockquote({ children }) {
              return (
                <blockquote className="
                  border-l-4 border-indigo-500
                  bg-indigo-50 dark:bg-slate-800/60
                  pl-5 pr-4 py-3
                  rounded-r-xl
                  my-6
                  italic
                  text-slate-600 dark:text-slate-400
                ">
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

