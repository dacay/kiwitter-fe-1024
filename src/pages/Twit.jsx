import moment from "moment";
import { useDispatch } from "react-redux";

import { like } from "./twitsSlice";
import { likeTwit } from "../utils/api";

export default function Twit({ id, authorId, content, createDate, likes, replies, name, username }) {

    const dateTime = moment(createDate).format("LLL");
    const dispatch = useDispatch();

    const handleLike = async (e) => {

        e.preventDefault();

        try {

            const { count } = await likeTwit(id);

            dispatch(like({
                id,
                count
            }));

        } catch(err) {

            console.error("Failed to like twit.", err);
        }
    }

    return <div className="p-4 flex flex-col shadow-md rounded-lg m-4">
        <div className="header flex flex-row gap-3">
            <img className="rounded-full w-12 h-12" src={`https://i.pravatar.cc/60?u=${authorId}`} />
            <div className="flex flex-col">
                <span className="text-sm font-bold">{name}</span>
                <span className="text-sm text-gray-500">@{username}</span>
            </div>
        </div>
        <div className="content pt-4 pb-2">
            {content}
        </div>
        <div className="date text-sm text-gray-500">
            {dateTime}
        </div>
        <hr className="my-4" />
        <div className="flex flex-row gap-2">
            <span><span className="font-bold">{replies}</span> Cevap</span>
            <span><span className="font-bold">{likes}</span> Beğeni</span>
        </div>
        <hr className="my-4" />
        <div className="flex flex-row gap-2">
            <a href="#" onClick={handleLike} className="text-primary text-sm font-semibold">Like</a>
        </div>
    </div>;
}