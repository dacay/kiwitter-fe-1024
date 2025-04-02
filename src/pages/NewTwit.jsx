import { useState, useContext } from "react";

import { UserContext } from "../contexts/UserContext";

import Button from "../components/Button";

import { postTwit } from "../utils/api";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { post } from "./twitsSlice";

export default function NewTwit() {

    const [text, setText] = useState("");
    const { user } = useContext(UserContext);
    const dispatch = useDispatch();

    const { username, name } = user;

    const handlePost = async () => {
        
        try {

            const { createDate, id } = await postTwit({
                text,
                name,
                username
            });

            const twitObj = {
                createDate,
                id,
                username,
                name,
                authorId: username,
                content: text,
                likes: 0,
                replies: 0,                
            };

            dispatch(post(twitObj));

            setText("");

        } catch(err) {

            console.error("Failed to twit.", err);

            toast.error("Failed to twit.");
        }
    }

    return <div className="p-4 flex flex-col shadow-md rounded-lg m-4">
        <input type="text" placeholder="Aklında ne var?" className="p-4" value={text} onChange={(e) => setText(e.target.value)}></input>
        <div className="w-full mt-4 flex flex-row justify-end">
            <Button title="Post" onClick={handlePost} />
        </div>
    </div>;
}