const server = require("./config/server");

require("./app/endpoints/estudiante")(server);

server.listen(server.get("port"), () => {
    console.log(`Servidor corriendo, puerto ${server.get("port")}.`);
});