import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EventCarousel } from "./EventCarousel";
import styles from "../Styling/RecommendedEvents.module.css";
import { getEvents, getPopularEvents } from "../../Redux/app/actions";

export const PremierEvents = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEvents());
        dispatch(getPopularEvents());
    }, [dispatch]);

    const eventsData = useSelector(state => state.app.events_data) || []; // Default empty array to avoid errors

    // Memoizing to optimize filtering
    const filteredPremierEvents = useMemo(() => {
        return eventsData.filter(movie => movie?.is_premier);
    }, [eventsData]);

    console.log("All Events:", eventsData);
    console.log("Premier Events:", filteredPremierEvents);

    return (
        <div className={`${styles.parent} ${styles.premier__container}`}>
            <div className={styles.parent__text}>
                <h1 style={{ color: "white" }}>Premium Events</h1>
            </div>
            <span style={{ color: "white", marginLeft: "11%" }}>Exclusive Events!</span>

            {/* Agar events available hain to hi EventCarousel show kare */}
            {filteredPremierEvents.length > 0 ? (
                <EventCarousel events={filteredPremierEvents} />
            ) : (
                <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
                    No premium events available at the moment.
                </p>
            )}
        </div>
    );
};
 