import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "../App";
import { useLocation, useParams } from "react-router-dom";
import { Bookmark, BookmarkCheck, CheckCircle } from "lucide-react";

const Editor = () => {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    // Write your code here...
    return 0;
}`);
  const [output, setOutput] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  const { id } = useParams();
  const [solved, setSolved] = useState(false);

  const [problem, setProblem] = useState(location.state?.problem || null);

  // Fetch problem if not in navigation state
  useEffect(() => {
    if (!problem && id) {
      fetch(`http://localhost:3000/api/problems/${id}`)
        .then((res) => res.json())
        .then((data) => setProblem(data));
    }
    // eslint-disable-next-line
  }, [id, problem]);

  useEffect(() => {
    if (!problem) return;
    const solvedProblems = JSON.parse(
      localStorage.getItem("solvedProblems") || "[]"
    );
    setSolved(solvedProblems.includes(problem.title));
  }, [problem?.title]);

  // Check if current problem is bookmarked on mount or when problem changes
  useEffect(() => {
    if (!problem) return;
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedProblems") || "[]"
    );
    setBookmarked(bookmarks.includes(problem.title));
  }, [problem?.title]);

  // Toggle bookmark
  const toggleBookmark = () => {
    if (!problem) return;
    let bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedProblems") || "[]"
    );
    if (bookmarks.includes(problem.title)) {
      bookmarks = bookmarks.filter((p) => p !== problem.title);
      setBookmarked(false);
    } else {
      bookmarks.push(problem.title);
      setBookmarked(true);
    }
    localStorage.setItem("bookmarkedProblems", JSON.stringify(bookmarks));
  };

  const toggleSolved = () => {
    if (!problem) return;
    let solvedProblems = JSON.parse(
      localStorage.getItem("solvedProblems") || "[]"
    );
    if (solvedProblems.includes(problem.title)) {
      solvedProblems = solvedProblems.filter((p) => p !== problem.title);
      setSolved(false);
    } else {
      solvedProblems.push(problem.title);
      setSolved(true);
    }
    localStorage.setItem("solvedProblems", JSON.stringify(solvedProblems));
  };

  // Note: C++ code execution is not supported in-browser
  const runCode = () => {
    setOutput("C++ code execution is not supported in the browser.");
  };

  if (!problem) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen transition-colors duration-300
      ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* Problem Description */}
      <div
        className={`md:w-1/2 w-full p-0 md:p-8 border-b md:border-b-0 md:border-r border-gray-200 overflow-auto
        ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div
          className={`sticky top-0 z-10 p-6 border-b border-gray-100 flex items-center justify-between ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-bold">{problem.title}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleBookmark}
              className={`px-3 py-1 rounded font-semibold transition flex items-center gap-2
              ${
                bookmarked
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-300 text-gray-700"
              }
              hover:bg-yellow-500`}
              title={bookmarked ? "Remove Bookmark" : "Bookmark this problem"}
            >
              {bookmarked ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
            <label
              className={`flex items-center px-3 py-1 rounded font-semibold cursor-pointer transition gap-2
              ${
                solved ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
              }
              hover:bg-green-600`}
              title={solved ? "Mark as Unsolved" : "Mark as Solved"}
            >
              <input
                type="checkbox"
                checked={solved}
                onChange={toggleSolved}
                className="form-checkbox accent-green-600"
                style={{ accentColor: "#22c55e" }}
              />
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Solved
              </span>
            </label>
          </div>
        </div>
        <div className="p-6 pt-2">
          <div className="mb-4">
            <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-900 text-xs font-semibold mr-2">
              {problem.difficulty}
            </span>
            {problem.tags &&
              problem.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium shadow-sm transition-colors duration-300 ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {tag}
                </span>
              ))}
          </div>
          <div className="mb-4">
            <div
              className={`font-semibold mb-1 text-lg ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Description:
            </div>
            <div
              className={theme === "dark" ? "text-gray-200" : "text-gray-800"}
            >
              {problem.description && problem.description.startsWith("<") ? (
                <div
                  className={`prose max-w-none ${
                    theme === "dark" ? "prose-invert" : ""
                  } ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
                  dangerouslySetInnerHTML={{
                    __html: problem.description,
                  }}
                />
              ) : (
                <>
                  <div className="mb-4">{problem.description}</div>
                  {/* Examples Section */}
                  {problem.examples && problem.examples.length > 0 && (
                    <div className="mb-4">
                      <div
                        className={`font-semibold text-base mb-2 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Examples:
                      </div>
                      <div className="flex flex-col gap-4">
                        {problem.examples.map((ex, idx) => (
                          <div
                            key={idx}
                            className={`rounded-lg border border-gray-300 ${
                              theme === "dark"
                                ? "bg-gray-800 text-white"
                                : "bg-gray-50 text-black"
                            } p-4`}
                          >
                            <div className="mb-1 font-mono text-sm">
                              <span className="font-semibold text-blue-700 dark:text-blue-300">
                                Input:
                              </span>{" "}
                              <span>{ex.input}</span>
                            </div>
                            <div className="mb-1 font-mono text-sm">
                              <span className="font-semibold text-green-700 dark:text-green-300">
                                Output:
                              </span>{" "}
                              <span>{ex.output}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Input/Output fallback if no examples */}
                  {!problem.examples?.length && (
                    <>
                      <div className="mb-2">
                        <div
                          className={`font-semibold ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Input:
                        </div>
                        <div
                          className={`font-mono rounded px-2 py-1 transition-colors duration-300 ${
                            theme === "dark"
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-black"
                          }`}
                        >
                          {problem.input || ""}
                        </div>
                      </div>
                      <div className="mb-2">
                        <div
                          className={`font-semibold ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Output:
                        </div>
                        <div
                          className={`font-mono rounded px-2 py-1 transition-colors duration-300 ${
                            theme === "dark"
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-black"
                          }`}
                        >
                          {problem.output || ""}
                        </div>
                      </div>
                    </>
                  )}
                  {/* Constraints */}
                  <div className="mb-2">
                    <div
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Constraints:
                    </div>
                    <ul className="list-disc ml-6">
                      {problem.constraints && problem.constraints.length > 0
                        ? problem.constraints.map((c, i) => (
                            <li key={i} className="mb-1">
                              {c}
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Code Editor and Run Section */}
      <div
        className={`md:w-1/2 w-full flex flex-col p-0 md:p-8 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`sticky top-0 z-10 p-6 border-b border-gray-200 ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <h1
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Code Editor
          </h1>
        </div>
        <div className="flex-1 p-6 pt-2 flex flex-col">
          <MonacoEditor
            height="350px"
            defaultLanguage="cpp"
            value={code}
            onChange={(value) => setCode(value)}
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
          <div className="flex items-center mt-4">
            <button
              className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-950 font-semibold shadow"
              onClick={runCode}
            >
              Run Code
            </button>
            <span className="ml-4 text-gray-500 text-sm">
              *C++ syntax highlighting only. Code execution not supported in
              browser.
            </span>
          </div>
          <div className="mt-6">
            <div
              className={`font-bold mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Output:
            </div>
            <div className="bg-black text-green-400 rounded p-4 min-h-[60px] font-mono text-base shadow-inner">
              <pre className="whitespace-pre-wrap m-0">{output}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
