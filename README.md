# Portfolio website for Aaike Van Roekeghem

This website is used as a portfolio for Aaike Van Roekeghem.

## Setup

Make sure the necessary global dependencies are installed

    npm install -g typings gulp pm2 newman@beta

Install local dependencies.

## Development

Start gulp watch

    npm run watch

Start the server

    npm run server

## Linting

**Run the linter (eslint is used)**

    npm run lint

## Testing

**Run unit tests**

    npm run unit

## Production

**Build files for production**

    npm run build

**Start production server**
This serves the compiled files using a lightweight express server (doesn't watch for file changes).
This will also make sure the server outputs minified css and json.

note: make sure the dev server is not running or a port conflict will occur.

    npm run start

## Production

**Build files for production**

    npm run build

Note: for production mode the build files are served using an express server.
