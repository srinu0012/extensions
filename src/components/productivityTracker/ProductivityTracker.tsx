import { useState, useEffect, useCallback } from "react";

const ProductivityTracker = () => {
  const [siteTimes, setSiteTimes] = useState<Record<string, number>>({});

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getStats" }, (response) => {
      if (response) {
        setSiteTimes(response);
      }
    });
  }, []);

  const handleReset = useCallback(() => {
    chrome.runtime.sendMessage({ action: "resetStats" });
    setSiteTimes({});
  }, []);

  return (
    <div className="popup-container">
      <h2>Productivity Tracker</h2>
      <table>
        <tr>
          <th>Domain</th>
          <th>Time Spent</th>
        </tr>
        {Object.entries(siteTimes).map(([domain, time]) => (
          <tr key={domain}>
            <td>{domain}</td>
            <td>{(time / 1000).toFixed(1)} seconds</td>
          </tr>
        ))}
      </table>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default ProductivityTracker;
