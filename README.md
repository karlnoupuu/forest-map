# ![alt text][heroicon] Metsaavastaja
An interactive map and dashboard combination of Estonia's forests, aimed at bringing fragmented public forestry data to the common user in a pleasing and easily digestible way. 

![alt text][heroimg]
[heroimg]: https://github.com/karlnoupuu/forest-map/raw/main/public/heroimg.png
[heroicon]: https://github.com/karlnoupuu/forest-map/raw/main/public/heroicon.svg

[You can check it out and click around here!](https://forest-map.vercel.app/)

## Origins
The origins of this project go back to a hackathon, "Metsikult andmetes 2026", organised by the Estonian Environmental Agency. The idea and solution used for this application is similar to what was
achieved by me and my team.

[You can check out the hackathon repository here!](https://github.com/Natashik777/Metsaavastaja)

The current application is a solo rewrite and extension of the original solution.

## Tech stack
This webapp is built as a Vite project using the React framework with TypeScript.

It is mainly meant as a front-end project, thus the data for the webapp is static and served
locally from the projects /public directory.

Notable libraries include maplibregl for the interactive map and Recharts for the graph components.

## Features
The main eye-catcher of the webapp is the full-page interactive map of Estonia with overlaid
county borders. The map supports county selection, providing a hard-to-miss hover state to indicate selection, zoom-to-bounds, and a dimming overlay.

The accompanying graph panel is composed of custom graph components that update reactively based on the
selected year and county. The graph system is config-driven so adding new visualisations means adding a definition object rather than writing new components.

## Setup
Requires **Node.js v20.19+** and **npm**.

As this is a React + TypeScript + Vite project, getting a running version of it on your own machine is
as simple as:

```bash
  git clone https://github.com/karlnoupuu/forest-map.git
  cd forest-map
  npm install
  npm run dev
```