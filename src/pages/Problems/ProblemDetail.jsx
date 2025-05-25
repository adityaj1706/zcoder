import { useParams } from "react-router-dom";
// import CodeEditor from "../../components/Problems/CodeEditor"; // optional

const ProblemDetail = () => {
  const { id } = useParams();

  // TODO: Fetch real data
  const dummy = {
    title: "Two Sum",
    description: "Given an array of integers...",
    input: "Input: nums = [2,7,11,15], target = 9",
    output: "Output: [0,1]",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{dummy.title}</h1>
      <p className="mt-4">{dummy.description}</p>

      <div className="mt-4">
        <strong>Input Format:</strong>
        <p>{dummy.input}</p>
        <strong>Output Format:</strong>
        <p>{dummy.output}</p>
      </div>

      <div className="mt-4">
        <strong>Constraints:</strong>
        <ul className="list-disc ml-6">
          {dummy.constraints.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">{/* <CodeEditor /> */}</div>
    </div>
  );
};

export default ProblemDetail;
