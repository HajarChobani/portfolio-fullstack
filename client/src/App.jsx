import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from './lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound.jsx';
import Home from './pages/Home';
import AdminLiveChat from './AdminLiveChat';
import VideoRoom from "./pages/VideoRoom";

function App() {
    return (
        <QueryClientProvider client={queryClientInstance}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chat" element={<AdminLiveChat />} />
                    <Route path="/room/:roomId" element={<VideoRoom />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

export default App