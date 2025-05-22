import React, { useState } from 'react';

const Editor = () => {
  const [code, setCode] = useState("// Start coding here");

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Code Editor</h2>
      <textarea
        className="w-full max-w-[1200px] h-[600px] bg-black text-green-400 p-4 rounded-md font-mono"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  );
};

export default Editor;
