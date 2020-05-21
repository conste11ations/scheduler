# Interview Scheduler

## Overview

Interview Scheduler is an application that allows users to book and cancel interviews. 

Development focuses on a single page application (SPA) built using React.
A Schduler-API server complements this project by providing data for the application. 
Data is persisted by the API server using a PostgreSQL database. 
The server also runs in error mode (npm run error) to test error-handling features.
The client application communicates with an API server over HTTP, using the JSON format.
A variety of testing solutions were explored as part of this project, see below.
 
* __Front-end: React, SCSS__
* __Back-end: Axios, NodeJS, postgreSQL__
* __Testing: React testing library, Storybook, Jest, Cypress__
 
https://github.com/conste11ations/scheduler-api

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Depdendencies


```
    "axios": "^0.19.2",
    "classnames": "^2.2.6",
    "normalize.css": "^8.0.1",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-scripts": "3.0.0"
```

## Dev Dependencies

```
    "@babel/core": "^7.4.3",
    "@storybook/addon-actions": "^5.0.10",
    "@storybook/addon-backgrounds": "^5.0.10",
    "@storybook/addon-links": "^5.0.10",
    "@storybook/addons": "^5.0.10",
    "@storybook/react": "^5.0.10",
    "@testing-library/jest-dom": "^4.0.0",
    "@testing-library/react": "^8.0.7",
    "@testing-library/react-hooks": "^3.2.1",
    "babel-loader": "^8.0.5",
    "node-sass": "^4.11.0",
    "prop-types": "^15.7.2",
    "react-test-renderer": "^16.13.1"
```
