import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import PageLayout from "./layouts/PageLayout";

import { getAllTwits } from "../utils/api";
import { load } from "./twitsSlice";

export default function Timeline() {

    const [loading, setLoading] = useState(true);

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

    }, []);

    return <PageLayout className="flex flex-col align-center justify-center">
        {loading ? <span className="text-center">Loading...</span> : "Home"}
    </PageLayout>;    
}