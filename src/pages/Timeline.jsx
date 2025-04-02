import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import PageLayout from "./layouts/PageLayout";
import Twit from "./Twit";
import NewTwit from "./NewTwit";

import { getAllTwits } from "../utils/api";
import { load, getAllTwits as getAllTwitsSelector } from "./twitsSlice";
import { UserContext } from "../contexts/UserContext";

export default function Timeline() {

    const [loading, setLoading] = useState(true);
    const { isLoggedIn } = useContext(UserContext);

    const twits = useSelector(getAllTwitsSelector);

    const dispatch = useDispatch();

    useEffect(() => {

        (async () => {
            
            try {

                console.debug("Loading twits...");

                const twits = await getAllTwits();

                console.debug(`Loaded ${twits.length} twits...`);

                dispatch(load(twits));

                console.debug("Dispatched twits.");

                setLoading(false);

            } catch(err) {

                //TODO Add retry button logic

                console.error("Failed to load twits.", err);

                toast.error("Failed to load twits.");
            }

        })();

    }, [dispatch]);

    const twitComponents = twits.map(t => <Twit key={t.id} {...t} />)

    if (!isLoggedIn)
        return <Redirect to="/login" />

    return <PageLayout className="flex flex-col align-center justify-center">
        {loading ? <span className="text-center">Loading...</span> : <>
            <NewTwit />
            {twitComponents}
        </>}
    </PageLayout>;    
}