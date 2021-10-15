import { LayerProps } from "react-map-gl";

export const stops = [
  [0, "#f7fcf0"],
  [1, "#e0f3db"],
  [2, "#ccebc5"],
  [3, "#a8ddb5"],
  [4, "#7bccc4"],
  [5, "#4eb3d3"],
  [6, "#2b8cbe"],
  [7, "#0868ac"],
  [8, "#084081"],
];

export const dataLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": {
      property: "scale",
      stops,
    },
    "fill-outline-color": "#eeeeee",
    "fill-opacity": 0.7,
  },
} as LayerProps;

export const highlightLayer = {
  id: "highlight",
  type: "fill",
  source: "name",
  paint: {
    "fill-color": {
      property: "scale",
      stops,
    },
    "fill-outline-color": "#000000",
    "fill-opacity": 1,
  },
} as LayerProps;
