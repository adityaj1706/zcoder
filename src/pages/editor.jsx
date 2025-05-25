// import React, { useState, useEffect } from 'react';
// import MonacoEditor from '@monaco-editor/react';
// import ReactMarkdown from 'react-markdown';
// import { useTheme } from '../App';
// import { useLocation } from "react-router-dom";

// export const problemDescriptions = {
//   "Two Sum": `
// ## Two Sum

// Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

// **Example:**
// \`\`\`
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// \`\`\`

// **Tags:** Array, Hash Table, Two Pointers
// `,
//   "Reverse Linked List": `
// ## Reverse Linked List

// Given the head of a singly linked list, reverse the list, and return the reversed list.

// **Example:**
// \`\`\`
// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]
// \`\`\`

// **Tags:** Linked List, Recursion
// `,
//   "Valid Parentheses": `
// ## Valid Parentheses

// Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// **Example:**
// \`\`\`
// Input: s = "()[]{}"
// Output: true
// \`\`\`

// **Tags:** Stack, String
// `,
//   "Merge Two Sorted Lists": `
// ## Merge Two Sorted Lists

// Merge two sorted linked lists and return it as a new sorted list.

// **Example:**
// \`\`\`
// Input: l1 = [1,2,4], l2 = [1,3,4]
// Output: [1,1,2,3,4,4]
// \`\`\`

// **Tags:** Linked List, Recursion
// `,
//   "Best Time to Buy and Sell Stock": `
// ## Best Time to Buy and Sell Stock

// Given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day, find the maximum profit you can achieve.

// **Example:**
// \`\`\`
// Input: prices = [7,1,5,3,6,4]
// Output: 5
// \`\`\`

// **Tags:** Array, Dynamic Programming, Greedy
// `
// };

// const DEFAULT_PROBLEM = "Two Sum";

// const Editor = () => {
//   const [code, setCode] = useState(`#include <iostream>
// using namespace std;

// int main() {
//     // Write your code here...
//     return 0;
// }`);
//   const [output, setOutput] = useState('');
//   const [bookmarked, setBookmarked] = useState(false);
//   const { theme } = useTheme();
//   const location = useLocation();

//   // Get problem from navigation state or fallback to default
//   const problemObj = location.state?.problem;
//   const problemTitle = typeof problemObj === "string"
//     ? problemObj
//     : problemObj?.title || DEFAULT_PROBLEM;
//   const problemDescription = problemDescriptions[problemTitle] || problemDescriptions[DEFAULT_PROBLEM];

//   // Check if current problem is bookmarked on mount or when problem changes
//   useEffect(() => {
//     const bookmarks = JSON.parse(localStorage.getItem("bookmarkedProblems") || "[]");
//     setBookmarked(bookmarks.includes(problemTitle));
//   }, [problemTitle]);

//   // Toggle bookmark
//   const toggleBookmark = () => {
//     let bookmarks = JSON.parse(localStorage.getItem("bookmarkedProblems") || "[]");
//     if (bookmarks.includes(problemTitle)) {
//       bookmarks = bookmarks.filter(p => p !== problemTitle);
//       setBookmarked(false);
//     } else {
//       bookmarks.push(problemTitle);
//       setBookmarked(true);
//     }
//     localStorage.setItem("bookmarkedProblems", JSON.stringify(bookmarks));
//   };

//   // Note: C++ code execution is not supported in-browser
//   const runCode = () => {
//     setOutput("C++ code execution is not supported in the browser.");
//   };

//   return (
//     <div className={`flex flex-col md:flex-row min-h-screen transition-colors duration-300
//       ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
//       {/* Problem Description */}
//       <div
//         className={`md:w-1/2 w-full p-0 md:p-8 border-b md:border-b-0 md:border-r border-gray-200 overflow-auto
//           ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
//       >
//         <div className={`sticky top-0 z-10 p-6 border-b border-gray-100 flex items-center justify-between ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
//           <h2 className="text-2xl font-bold">{problemTitle}</h2>
//           <button
//             onClick={toggleBookmark}
//             className={`ml-4 px-3 py-1 rounded font-semibold transition
//               ${bookmarked ? "bg-yellow-400 text-black" : "bg-gray-300 text-gray-700"}
//               hover:bg-yellow-500`}
//             title={bookmarked ? "Remove Bookmark" : "Bookmark this problem"}
//           >
//             {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
//           </button>
//         </div>
//         <div className="prose max-w-none p-6 pt-2 dark:prose-invert">
//           <ReactMarkdown>{problemDescription}</ReactMarkdown>
//         </div>
//       </div>
//       {/* Code Editor and Run Section */}
//       <div className={`md:w-1/2 w-full flex flex-col p-0 md:p-8 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
//         <div className={`sticky top-0 z-10 p-6 border-b border-gray-200 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
//           <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Code Editor</h1>
//         </div>
//         <div className="flex-1 p-6 pt-2 flex flex-col">
//           <MonacoEditor
//             height="350px"
//             defaultLanguage="cpp"
//             value={code}
//             onChange={value => setCode(value)}
//             theme={theme === "dark" ? "vs-dark" : "light"}
//             options={{
//               fontSize: 16,
//               minimap: { enabled: false },
//               scrollBeyondLastLine: false,
//               automaticLayout: true,
//             }}
//           />
//           <div className="flex items-center mt-4">
//             <button
//               className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-950 font-semibold shadow"
//               onClick={runCode}
//             >
//               Run Code
//             </button>
//             <span className="ml-4 text-gray-500 text-sm">
//               *C++ syntax highlighting only. Code execution not supported in browser.
//             </span>
//           </div>
//           <div className="mt-6">
//             <div className={`font-bold mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Output:</div>
//             <div className="bg-black text-green-400 rounded p-4 min-h-[60px] font-mono text-base shadow-inner">
//               <pre className="whitespace-pre-wrap m-0">{output}</pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Editor;

import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "../App";
import { useLocation } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";

const DEFAULT_PROBLEM = {
  title: "Two Sum",
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  input: "Input: nums = [2,7,11,15], target = 9",
  output: "Output: [0,1]",
  constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
};

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

  // Get problem from navigation state or fallback to default
  const problem = location.state?.problem || DEFAULT_PROBLEM;

  // Check if current problem is bookmarked on mount or when problem changes
  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedProblems") || "[]"
    );
    setBookmarked(bookmarks.includes(problem.title));
  }, [problem.title]);

  // Toggle bookmark
  const toggleBookmark = () => {
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

  // Note: C++ code execution is not supported in-browser
  const runCode = () => {
    setOutput("C++ code execution is not supported in the browser.");
  };

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen transition-colors duration-300
      ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* Problem Description */}
      <div
        className={`md:w-1/2 w-full p-0 md:p-8 border-b md:border-b-0 md:border-r border-gray-200 overflow-auto
          ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
      >
        <div
          className={`sticky top-0 z-10 p-6 border-b border-gray-100 flex items-center justify-between ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-bold">{problem.title}</h2>
          <button
  onClick={toggleBookmark}
  className={`ml-4 px-3 py-1 rounded font-semibold transition flex items-center gap-2
    ${bookmarked ? "bg-yellow-400 text-black" : "bg-gray-300 text-gray-700"}
    hover:bg-yellow-500`}
  title={bookmarked ? "Remove Bookmark" : "Bookmark this problem"}
>
  {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
  {/* {bookmarked ? "Bookmarked" : "Bookmark"} */}
</button>

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
                  className="inline-block px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs font-medium mr-2 mt-1"
                >
                  {tag}
                </span>
              ))}
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-1">Description:</div>
            <div>{problem.description}</div>
          </div>
          <div className="mb-2">
            <div className="font-semibold">Input:</div>
            <div className="font-mono bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
              {problem.input}
            </div>
          </div>
          <div className="mb-2">
            <div className="font-semibold">Output:</div>
            <div className="font-mono bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
              {problem.output}
            </div>
          </div>
          <div className="mb-2">
            <div className="font-semibold">Constraints:</div>
            <ul className="list-disc ml-6">
              {problem.constraints &&
                problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
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
