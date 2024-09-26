# Project

Interface that consumes the free GitHub API to show a list of
repositories by user or organization

*Note*: Uses unauthenticated requests so rate limits apply. Wait a minute
or so if you hit the limit and definetly don't lookup microsoft 😉

## Overview
* Landing page form to capture the user or organization name
* A valid form submit updates state variable to then show the repository list view 
* React router for modifying search params for query string based table
  filtering and sorting
* React-table for modeling the table
* TailwindCSS for ease of styling and consistency
* Vite dev environment for setup convenience via react-ts starter plus
  vitest and RTL for testing


## Running
`yarn` to install

`yarn dev` to run development

`yarn test` 

`yarn build` lint, test and bundle the distro

`yarn preview` serve the distro

## Features & Enhancements
  * Need an error boundary or at least a message to notify user of
    errors
  * Add a view for empty results
  * Create separate routes for each page
  * Update the type filter options based on org vs user 
  * Add a nicer loading state, like an animated spinner
  * Support user authentication for additional permissions and
    functionality
  * Needs to wait until the paginate function loads all the pages which
    is terrible for large repo lists. Better to request the first page,
    render and then prefetch subsequent data
  * Make table responsive so it renders better on smaller devices. This
    could be hiding or stacking columns
  * Use a component library like shadcn or material-ui

    