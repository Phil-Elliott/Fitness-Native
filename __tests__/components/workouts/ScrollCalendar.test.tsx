import { fireEvent, render } from "@testing-library/react-native";
import ScrollCalendar from "../../../components/workouts/ScrollCalendar";
import * as dateFns from "date-fns";

// Mock the specific date-fns functions
jest.mock("date-fns", () => {
  const actualDateFns = jest.requireActual("date-fns");
  // Set the fixed date for "now" to ensure consistent test behavior
  const fixedDate = new Date("2023-01-04T00:00:00.000Z");
  return {
    ...actualDateFns,
    startOfWeek: jest.fn(() => actualDateFns.startOfWeek(fixedDate)),
    endOfWeek: jest.fn(() => actualDateFns.endOfWeek(fixedDate)),
  };
});

describe("ScrollCalendar", () => {
  // Define a fixed date for the selected day
  const fixedSelectedDay = new Date("2023-01-04T00:00:00.000Z");

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });
  it("renders correctly with the selected day as current day", () => {
    const setSelectedDayMock = jest.fn();

    const { getByText } = render(
      <ScrollCalendar
        selectedDay={fixedSelectedDay}
        setSelectedDay={setSelectedDayMock}
      />
    );

    const expectedDay = getByText(fixedSelectedDay.getDate().toString());

    expect(expectedDay).toBeTruthy();
  });

  it("calls setSelectedDay when a day is pressed", () => {
    fixedSelectedDay.setHours(0, 0, 0, 0); // Reset time to the start of the day
    const setSelectedDayMock = jest.fn();

    const { getByText } = render(
      <ScrollCalendar
        selectedDay={fixedSelectedDay}
        setSelectedDay={setSelectedDayMock}
      />
    );

    // Clone the selectedDay to a new Date object
    const day = new Date(fixedSelectedDay.getTime());

    // Adjust the day based on whether the selected day is Saturday or not
    day.setDate(
      fixedSelectedDay.getDay() === 6
        ? fixedSelectedDay.getDate() - 1
        : fixedSelectedDay.getDate() + 1
    );

    // Convert the day to the start of the day for accurate comparison
    day.setHours(0, 0, 0, 0);

    const dayToSelectText = day.getDate().toString();
    const dayToSelect = getByText(dayToSelectText);

    fireEvent.press(dayToSelect);

    // Check if the mock function was called with a Date object that has the same time as 'day'
    expect(setSelectedDayMock).toHaveBeenCalledWith(expect.any(Date));
    expect(setSelectedDayMock.mock.calls[0][0].toISOString()).toBe(
      day.toISOString()
    );
  });
  it("displays the correct range of dates for the current week", () => {
    const setSelectedDayMock = jest.fn();

    const { getAllByText } = render(
      <ScrollCalendar
        selectedDay={fixedSelectedDay}
        setSelectedDay={setSelectedDayMock}
      />
    );

    // Calculate expected start and end of week
    const startDay = dateFns.startOfWeek(fixedSelectedDay);
    const endDay = dateFns.endOfWeek(fixedSelectedDay);

    // Check if all dates in the week are rendered
    for (
      let date = new Date(startDay);
      date <= endDay;
      date = dateFns.addDays(date, 1)
    ) {
      const dateText = dateFns.format(date, "d");
      expect(getAllByText(dateText).length).toBeGreaterThan(0);
    }

    // Check that the startOfWeek and endOfWeek were called correctly
    expect(dateFns.startOfWeek).toHaveBeenCalledWith(fixedSelectedDay);
    expect(dateFns.endOfWeek).toHaveBeenCalledWith(fixedSelectedDay);
  });
});
