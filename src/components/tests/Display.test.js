import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "../Display";
import mockFetchShow from "../../api/fetchShow";

jest.mock("../../api/fetchShow");

const testData = {
  id: 2993,
  url: "https://www.tvmaze.com/shows/2993/stranger-things",
  name: "Stranger Things",
  type: "Scripted",
  language: "English",
  genres: ["Drama", "Fantasy", "Science-Fiction"],
  status: "Running",
  runtime: null,
  premiered: "2016-07-15",
  officialSite: "https://www.netflix.com/title/80057281",
  schedule: { time: "", days: [] },
  rating: { average: 8.7 },
  weight: 99,
  network: null,
  webChannel: { id: 1, name: "Netflix", country: null },
  dvdCountry: null,
  externals: { tvrage: 48493, thetvdb: 305288, imdb: "tt4574334" },
  image: {
    medium:
      "https://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
    original:
      "https://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg",
  },
  seasons: [
    {
      id: 0,
      name: "Season 1",
      episodes: [
        {
          id: 1,
          name: "eppi",
          image: null,
          season: 1,
          number: 1,
          summary: "The show starts",
          runtime: 1,
        },
      ],
    },
    { id: 1, name: "Season 2", episodes: [] },
  ],
  summary:
    "<p>A love letter to the '80s classics that captivated a generation, <b>Stranger Things</b> is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.</p>",
  updated: 1618641806,
  _links: {
    self: { href: "https://api.tvmaze.com/shows/2993" },
    previousepisode: { href: "https://api.tvmaze.com/episodes/1576476" },
  },
  _embedded: {
    episodes: [
      {
        id: 1,
        name: "",
        image: null,
        season: 1,
        number: 1,
        summary: "The show starts",
        runtime: 1,
      },
    ],
  },
};

test("renders without errors", () => {
  render(<Display />);
});

test("renders Show when fetch button is clicked", async () => {
  //  Arrange
  render(<Display />);
  const button = screen.getByRole("button");
  mockFetchShow.mockResolvedValueOnce(testData);

  //  Act
  userEvent.click(button);

  //  Assert
  expect(await screen.findByTestId("show-container")).toBeInTheDocument();
});
test("amount of select options matches amount of seasons", async () => {
  // Arrange
  render(<Display />);
  const button = screen.getByRole("button");
  mockFetchShow.mockResolvedValueOnce(testData);

  // Act
  userEvent.click(button);
  // Assert
  const options = await screen.findAllByTestId("season-option");
  expect(options.length).toEqual(testData.seasons.length);
});

test("displayFunc renders on fetch", async () => {
  // Arrange
  const mockDisplayFunc = jest.fn();
  render(<Display displayFunc={mockDisplayFunc} />);
  const button = screen.getByRole("button");
  mockFetchShow.mockResolvedValueOnce(testData);
  // Act
  userEvent.click(button);
  // Assert
  expect(await mockDisplayFunc).toHaveBeenCalled();
});
///Tasks:
//1. Add in necessary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
