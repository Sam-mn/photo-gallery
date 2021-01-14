import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../context/useAuth";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home";

it("Check Home welcome message", async () => {
    const history = createMemoryHistory();
    window.history.pushState({}, "", "/");

    render(
        <Router history={history}>
            <AuthContext.Provider
                value={{ currentUser: { uid: "1234214214" } }}
            >
                <Home />
            </AuthContext.Provider>
        </Router>
    );

    expect(screen.getByTestId("Welcome")).toHaveTextContent(
        "Welcome 1234214214"
    );
});
