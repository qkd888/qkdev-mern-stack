import React from "react";
import { render } from "@testing-library/react"; // Importing the render component from react
import AdminDashboard from "../Components/Dashboards/AdminDashboard";

test("Renders welcome heading", () => {
  const { getByText } = render(<AdminDashboard />);
  const mainHeading = getByText(/Welcome to the admin dashboard/i);
  expect(mainHeading).toBeInTheDocument();
});
