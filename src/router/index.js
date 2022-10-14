import { TestRouter, SongRouter, UserRouter, PlayListRouter } from "../components";

// cada vez que quiera agregar unaruta nueva,
// creo el path e importo el componente
const listRoutes = [
  ["/test", TestRouter],
  ["/song", SongRouter],
  ["/user", UserRouter],
  ["/playlist", PlayListRouter],
  ];

export const routes = (app) => {
  listRoutes.forEach(([path, controller]) => {
    app.use(path, controller);
  });
};
