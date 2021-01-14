import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../context/useAuth";
import "@testing-library/jest-dom/extend-expect";
import Albums from "./Albums/Albums";

it("Check Albums create button", async () => {
    const history = createMemoryHistory();
    window.history.pushState({}, "", "/albums");

    render(
        <Router history={history}>
            <AuthContext.Provider
                value={{ currentUser: { uid: "samersamer" } }}
            >
                <Albums />
            </AuthContext.Provider>
        </Router>
    );

    expect(screen.getByRole("button")).toHaveTextContent("Create a new album");
});
