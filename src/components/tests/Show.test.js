import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Show from "./../Show";

const testShow = {
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

test("renders testShow and no selected Season without errors", () => {
  render(<Show show={testShow} selectedSeason="none" />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} />);
  expect(screen.getByTestId("loading-container")).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  //Arrange
  render(<Show show={testShow} selectedSeason="none" />);
  const options = screen.getAllByTestId("season-option");

  // Act
  // Assert
  expect(options.length).toEqual(testShow.seasons.length);
});

test("handleSelect is called when an season is selected", () => {
  //Arrange
  const handleSelect = jest.fn();
  render(
    <Show show={testShow} selectedSeason="none" handleSelect={handleSelect} />
  );
  const selector = screen.getByLabelText(/select a season/i);
  //Act
  userEvent.selectOptions(selector, screen.getByText(/season 1/i));

  //Assert
  expect(handleSelect).toHaveBeenCalled();
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  //Arrange
  const { rerender } = render(<Show show={testShow} selectedSeason="none" />);

  //Assert
  expect(screen.queryByAltText("./stranger_things.png")).toBeNull();

  // Act
  rerender(<Show show={testShow} selectedSeason={0} />);

  expect(screen.getByAltText("./stranger_things.png")).toBeInTheDocument();
});

//Tasks:
//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existence)
//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
