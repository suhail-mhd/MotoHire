import React, { useState, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import Loading from "./components/Loading/Loading";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust time as needed
  }, []);

  return <>
  <div style={{
    background:"#100718",
    color:"#f4f4f4",
  }}>
<div className="blob"></div>
  {loading ? <Loading /> : <Layout />}
  </div>
  </>;
}

export default App;
