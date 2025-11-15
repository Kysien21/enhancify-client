import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Website from "./Landing Page/Website/Website";
import Upload from "./Dashboard Page/Upload/Upload";
import Result from "./Dashboard Page/Result/Result";
import AnalysisAndFeedback from "./Dashboard Page/Analysis and Feedback/AnalysisAndFeedback";
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route index element={<Website />} />
        <Route path="/website" element={<Website />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/result" element={<Result />} />
        <Route path="/analysis" element={<AnalysisAndFeedback />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
