import React, { useState } from "react";

import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import Charts from "./pages/Charts";
import Setup from "./pages/Setup";
import Risk from "./pages/Risk";
import Practice from "./pages/Practice";
import Backtester from "./pages/Backtester";
import Journal from "./pages/Journal";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";

const pages = [
  { name: "Home", component: Home },
  { name: "Scanner", component: Scanner },
  { name: "Charts", component: Charts },
  { name: "Setup", component: Setup },
  { name: "Risk", component: Risk },
  { name: "Practice", component: Practice },
  { name: "Backtester", component: Backtester },
  { name: "Journal", component: Journal },
  { name: "Analytics", component: Analytics },
  { name: "Admin", component: Admin },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const ActivePage =
    pages.find((page) => page.name === currentPage)?.component || Home;

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Market Analysis</h1>
          <p>Deterministic Forex Market Analysis</p>
        </div>
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <nav>
            {pages.map((page) => (
              <button
                key={page.name}
                className={
                  currentPage === page.name
                    ? "nav-button active"
                    : "nav-button"
                }
                onClick={() => setCurrentPage(page.name)}
              >
                {page.name}
              </button>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          <ActivePage />
        </main>
      </div>
    </div>
  );
                }
