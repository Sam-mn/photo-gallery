import React from "react";
import { act, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

it("render go to album button", async () => {
    const history = createMemoryHistory();
    window.history.pushState({}, "", "/");

    await act(async () => {
        render(
            <Router history={history}>
                <App />
            </Router>
        );
    });

    expect(
        screen.getByRole("button", { name: "Toggle navigation" })
    ).toBeInTheDocument();
});
