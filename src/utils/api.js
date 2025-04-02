import axios from "axios";

const instance = axios.create({
    baseURL: 'https://kiwitter-node-77f5acb427c1.herokuapp.com/',
})

export const login = async (username, password) => {
    
    const resp = await instance.post("/login", {
        username,
        password
    });

    return resp.data.token;
}

export const signUp = async (name, email, username, password) => {

    const resp = await instance.post("/users/signup", {
        name,
        email,
        username,
        password
    });
    
    return resp.data.token;
}

export const getAllTwits = async () => {
    
    const resp = await instance.get("/twits");

    return resp.data.twits;
}