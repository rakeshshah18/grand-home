import express from "express";
import routes from "./src/routes/index.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

// Print all registered routes
function printRoutes(app) {
    const routes = [];

    app._router.stack.forEach(function (middleware) {
        if (middleware.route) {
            routes.push({
                path: middleware.route.path,
                methods: Object.keys(middleware.route.methods)
            });
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach(function (handler) {
                if (handler.route) {
                    const path = middleware.regexp.source
                        .replace('\\/?', '')
                        .replace('(?=\\/|$)', '')
                        .replace(/\\\//g, '/');

                    routes.push({
                        path: path + handler.route.path,
                        methods: Object.keys(handler.route.methods)
                    });
                }
            });
        }
    });

    return routes;
}

console.log('Registered routes:');
console.log(JSON.stringify(printRoutes(app), null, 2));
