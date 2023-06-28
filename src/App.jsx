import Header from "./components/Header";
import Feed from "./pages/Feed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoDetails from "./pages/VideoDetails";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/watch/:videoId" element={<VideoDetails />} />
          <Route path="/results" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
