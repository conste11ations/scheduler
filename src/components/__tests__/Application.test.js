import React from "react";

import { render, cleanup, fireEvent, waitForElement, getByText, getAllByTestId, getByAltText, getByPlaceholderText, prettyDOM, queryByText  } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

xit("renders without crashing", () => {
  render(<Application />);
});

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));
  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  //Use the expect function to verify that the the appointment element contains the text "Saving" immediately after the "Save" button is clicked.
  expect(getByText(appointment, "Saving, please wait...")).toBeInTheDocument();
  
  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

  expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
        
    const days = getAllByTestId(container, "day");
    const day = days.find((element) => queryByText(element, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});