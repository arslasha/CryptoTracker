import { BrowserRouter as Router, Routes, Route } from "react-router";
import styles from "./App.module.css";
import Table from "./pages/Table";
import Chat from "./pages/Chat";
import Home from "./pages/Home"; // добавим компонент Home
import Navbar from "./components/Navbar"; // меню

function App() {
    return (
        <Router>
            <div className={styles.grid}>
                <Navbar /> {/* Навигационное меню */}

                <Routes>
                    <Route path="/" element={<Home />} /> {/* Главная страница */}
                    <Route path="/table" element={<Table />} /> {/* Страница с таблицей */}
                    <Route path="/chat" element={<Chat />} /> {/* Страница чата */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
