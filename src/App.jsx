import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReceiptProvider } from "./context/ReceiptContext";
import SettlementPage from "./pages/SettlementPage";
import Timeline from "./pages/timeline";
import MainPage from "./pages/Mainpage";
import UploadPage from "./pages/UploadPage";
import EnterUserPage from "./pages/EnterUserPage";
import SettleFinishPage from "./pages/SettleFinishPage";

function App() {
    return (
        <ReceiptProvider>
            <Router>
                <Routes>
                    <Route path="/room/:roomId" element={<SettlementPage />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/room/:roomId/timeline" element={<Timeline />}></Route>
                    <Route path="/upload/:roomId" element={<UploadPage />}></Route>
                    <Route path="/room/:roomId/guest" element={<EnterUserPage />}></Route>
                    <Route path="/room/:roomId/settle" element={<SettleFinishPage />}></Route>
                </Routes>
            </Router>
        </ReceiptProvider>
    );
}

export default App;
