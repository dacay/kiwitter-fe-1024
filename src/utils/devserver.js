import { createServer, Response } from "miragejs"

createServer({
    
    routes() {

        this.urlPrefix = 'https://kiwitter-node-77f5acb427c1.herokuapp.com/';

        this.post("/login", () => {

            return {
                token: "token123"
            }
            // return new Response(401);
        });

        this.post("/users/signup", () => {

            return {
                token: "token123"
            }
        })
    },
  });