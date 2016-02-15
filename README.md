React-Baobab-Canvas
===================

React 0.14, React Router 1.0, ES6/ES7, HTML, CSS/Semantic UI, REST API, Express 4.0

### Implement a React application

The application should be implemented with React, ES6/ES7. BaobabJS should be
used as a replacement of the Flux architecture. The application should include
a navigation menu with 2 pages:

1. the *canvas* page which should show the main interface of image uploading.
2. the *stats* page which should show the current statistics of colors usage.

The interface of the *canvas* page should allow the user to select a file from
the local directory and convert it into a mosaic. The application gets the
initial image from a file input, divides it into tiles, gets the average color
of each tile and requests a mosaic tile for each color from the server. The
result will be a mosaic of the original image rendered to the canvas element.

The *stats* page should show the top 20 colors used by different images and a
count of converted images. Results should be updated after each conversion.

To get a tile for a color from the server the application should send a request
to `http://localhost:9000/colors/:hex` where `:hex` parameter is a hexadecimal
color value. The response will be an SVG-image which could be rendered to a
canvas.

### Additional requirements

1. Application's state should be stored within a single state tree, there should
be no components with a local state.
2. Each tile should be cached within the application's state, so the application
will request results from the server only for new colors.
3. The tile size should be configurable and shared by the client/server.
4. Tiles should be rendered by a complete row at a time, from the top row
to the bottom row.
5. The ability to select and convert new images should be blocked while the
current conversion process is pending.
6. User should see the progress bar while the conversion process is running.
7. User should be able to switch between pages without canceling the conversion
process.
8. After the conversion of the image into a mosaic is complete, user should be
able to select a new image for conversion.

### How to run the application

The API server will be run on port `:9000`. The application server will be run
on port `:8080`. Commands `3.` & `4.` should be run within separate terminals.

```
npm i
npm i -g nwb
npm run server
npm start
```
