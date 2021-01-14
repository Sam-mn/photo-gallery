import React from "react";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { AuthContext } from "../context/useAuth";
import Signup from "./Signup";

describe("signup", () => {
    describe("with test handle submit", () => {
        it("set err true", async () => {
            const { getByLabelText, getByRole, container } = render(
                <Router>
                    <AuthContext.Provider
                        value={{ currentUser: { uid: "samersamer" } }}
                    >
                        <Signup />
                    </AuthContext.Provider>
                </Router>
            );

            await act(async () => {
                fireEvent.change(
                    getByLabelText("email", {
                        target: { value: "samer@gmail.com" },
                    })
                );
            });
            await act(async () => {
                fireEvent.change(
                    getByLabelText("password", {
                        target: { value: "1234567" },
                    })
                );
            });

            await act(async () => {
                fireEvent.change(
                    getByLabelText("Password Confirmation", {
                        target: { value: "123456789" },
                    })
                );
            });

            await act(async () => {
                fireEvent.submit(getByRole("button"));
            });

            expect(container.innerHTML).toMatch("TEST PASSED");
            // expect(container.innerHTML).toMatch(
            //     "Passwords does not match, please try again."
            // );
            // expect(screen.getByRole("alert")).toHaveTextContent(
            //     "Passwords does not match, please try again."
            // );
        });
    });
});
