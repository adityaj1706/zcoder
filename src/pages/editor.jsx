import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../App';
import { useLocation } from "react-router-dom";

const problemDescriptions = {
  "Two Sum": `
## Two Sum

Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

**Example:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
\`\`\`
`,
  "Reverse Linked List": `
## Reverse Linked List

Given the head of a singly linked list, reverse the list, and return the reversed list.

**Example:**
\`\`\`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\`
`,
  "Valid Parentheses": `
## Valid Parentheses

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

**Example:**
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`
`,
  "Merge Two Sorted Lists": `
## Merge Two Sorted Lists

Merge two sorted linked lists and return it as a new sorted list.

**Example:**
\`\`\`
Input: l1 = [1,2,4], l2 = [1,3,4]
Output: [1,1,2,3,4,4]
\`\`\`
`,
  "Best Time to Buy and Sell Stock": `
## Best Time to Buy and Sell Stock

Given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day, find the maximum profit you can achieve.

**Example:**
\`\`\`
Input: prices = [7,1,5,3,6,4]
Output: 5
\`\`\`
`
};

const DEFAULT_PROBLEM = "Two Sum";

const Editor = () => {
  const [code, setCode] = useState('// Write your code here...');
  const [output, setOutput] = useState('');
  const { theme } = useTheme();
  const location = useLocation();

  // Get problem from navigation state or fallback to default
  const problemTitle = location.state?.problem || DEFAULT_PROBLEM;
  const problemDescription = problemDescriptions[problemTitle] || problemDescriptions[DEFAULT_PROBLEM];

  const runCode = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      setOutput(String(result));
    } catch (err) {
      setOutput(String(err));
    }
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen transition-colors duration-300
      ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Problem Description */}
      <div
        className={`md:w-1/2 w-full p-0 md:p-8 border-b md:border-b-0 md:border-r border-gray-200 overflow-auto
          ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      >
        <div className={`sticky top-0 z-10 p-6 border-b border-gray-100 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
          <h2 className="text-2xl font-bold">{problemTitle}</h2>
        </div>
        <div className="prose max-w-none p-6 pt-2 dark:prose-invert">
          <ReactMarkdown>{problemDescription}</ReactMarkdown>
        </div>
      </div>
      {/* Code Editor and Run Section */}
      <div className={`md:w-1/2 w-full flex flex-col p-0 md:p-8 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className={`sticky top-0 z-10 p-6 border-b border-gray-200 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
          <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Code Editor</h1>
        </div>
        <div className="flex-1 p-6 pt-2 flex flex-col">
          <MonacoEditor
            height="350px"
            defaultLanguage="cpp"
            value={code}
            onChange={value => setCode(value)}
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
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold shadow"
              onClick={runCode}
            >
              Run Code
            </button>
            <span className="ml-4 text-gray-500 text-sm">*C++ syntax highlighting only. No C++ code execution in browser.</span>
          </div>
          <div className="mt-6">
            <div className={`font-bold mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Output:</div>
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
