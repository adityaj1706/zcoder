const fs = require("fs");
const path = require("path");

const problemsDir = path.join(__dirname, "../problems");
const outputFile = path.join(__dirname, "../server/data/problems.json");

function stripTags(html, allowed = []) {
  // Remove all tags except those in the allowed list
  return html.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tag) =>
    allowed.includes(tag.toLowerCase()) ? match : ""
  );
}

function extractProblemFromMarkdown(content) {
  const titleMatch = content.match(
    /^#\s*(?:\[\s*\d+\.?\s*(.*?)\]|(\d+\.?\s*.*)|(.+))/m
  );
  const title = titleMatch
    ? (titleMatch[1] || titleMatch[2] || titleMatch[3]).trim()
    : "Untitled";

  const difficultyMatch = content.match(/## Difficulty\s*\n(.+)/);
  const difficulty = difficultyMatch
    ? difficultyMatch[1].trim()
    : "Unspecified";

  let tags = [];
  const tagsMatch = content.match(/## Tags\s*\n([\s\S]*?)(\n##|$)/);
  if (tagsMatch) {
    tags = tagsMatch[1]
      .split(/,|\n/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  }

  let descriptionSection = content
    .split("## Description")[1]
    ?.split("##")[0]
    .trim();

  // Remove unwanted tags from description (keep p, ul, li, pre, img, a, br)
  if (descriptionSection) {
    descriptionSection = stripTags(descriptionSection, [
      "p",
      "ul",
      "li",
      "pre",
      "img",
      "a",
      "br",
    ]);
  }

  const examples = Array.from(
    content.matchAll(/Input:\s*(.*?)\s*Output:\s*(.*?)(?=\n|$)/gs)
  ).map((match) => ({
    input: match[1].trim(),
    output: match[2].trim(),
  }));

  let constraints = [];
  const constraintsSection = content.match(/<ul>([\s\S]*?)<\/ul>/);
  if (constraintsSection) {
    constraints = Array.from(
      constraintsSection[1].matchAll(/<li>(.*?)<\/li>/g)
    ).map((m) =>
      stripTags(
        m[1]
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&le;/g, "≤")
          .replace(/&ge;/g, "≥")
          .replace(/&nbsp;/g, " ")
          .trim()
      )
    );
  }

  const pythonSolutionMatch = content.match(/```python\s*([\s\S]*?)```/);
  const pythonSolution = pythonSolutionMatch
    ? pythonSolutionMatch[1].trim()
    : "";

  return {
    title,
    difficulty,
    tags,
    description: descriptionSection,
    examples,
    constraints,
    solution: {
      python: pythonSolution,
    },
  };
}

const problems = [];

fs.readdirSync(problemsDir).forEach((file, index) => {
  if (file.endsWith(".md")) {
    const filePath = path.join(problemsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed = extractProblemFromMarkdown(content);
    problems.push({ id: `${index + 1}`, ...parsed });
  }
});

fs.writeFileSync(outputFile, JSON.stringify(problems, null, 2));
console.log(" Generated problems.json with", problems.length, "problems!");
