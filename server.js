// This is the boiler plate code to start your application
// To test your app locally, open a terminal and type: node server.js
const app = require("./app")

const HTTP_PORT = process.env.PORT || 8080;

const onHttpStart = () => {
    console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}
app.listen(HTTP_PORT, onHttpStart); 