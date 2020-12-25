# Sudoku web app created by React

A Web application of Sudoku Game created with [React](https://reactjs.org/).

Play online [here](https://sudoku-c6bd2.web.app/).

## Features

* optimized for mobile devices
* x2 and x3 mode sudoku with easy/medium/hard difficulty levels.
* click empty cell to highlight connected cells and cells with same value.
* click given cell/input cell to highlight cells with same value.
* when empty cell is selected, press a number or click input cell to enter a value.
* start a timer when new game starts.

## Usage

Install with `npm install`.

In the project directory, you can run `npm start` and Open [http://localhost:3000](http://localhost:3000) to view it in
the browser.

## Technical Details

* x2 mode game lists are pre-generated using DFS algorithm (written in Java, not included here).
* x3 mode game lists are copied
  from [andreynering/sudoku](https://github.com/andreynering/sudoku/blob/master/js/boards.js).
* packages used: [redux](https://react-redux.js.org/), [material-ui](https://material-ui.com/).

## TODO

* benchmark different sudoku solvers.
* generate x3 mode game lists using optimized sudoku solvers.
* store user selections and current game state
  in [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
* add game ID (user can jump to a specific game if he/she knows the ID).
* generate randomized game based on seed game lists.
* add hint mode.
* add user authentication for score storage.