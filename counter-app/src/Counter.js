import React, { useState, useEffect } from "react";
import "./Counter.css"; // CSS for styling

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`; // update browser tab title
  }, [count]);

  return (
    <div className="container">
      <div className="counter-card">
        <h1>Simple Counter App</h1>
        <h2 className={`count ${count > 0 ? "positive" : count < 0 ? "negative" : ""}`}>
          {count}
        </h2>
        <div className="buttons">
          <button className="btn increment" onClick={() => setCount(count + 1)}>
            Increment
          </button>
          <button className="btn decrement" onClick={() => setCount(count - 1)}>
            Decrement
          </button>
          <button className="btn reset" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;