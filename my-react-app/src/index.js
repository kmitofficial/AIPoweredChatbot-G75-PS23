// index.js
import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
// import { Routes,BrowserRouter as Router,Route} from "react-router-dom";
import App1 from "./App1";
import App2 from "./App2";
import App3 from "./App3";

const container = document.getElementById('root');
const root = createRoot(container);

const Index = () => {
    const [currentTab, setCurrentTab] = useState("home");

    const handleMessageFromApp3 = (language) => {
        setCurrentTab(language === "English" ? "home" : "home"); // Set the tab based on language

        root.render(
            language === "English" ? <App1 tab={currentTab} /> : <App2 tab={currentTab} />
        );
    };

    return <App3 handleMessageFromApp3={handleMessageFromApp3} />;


};

root.render(<Index />);