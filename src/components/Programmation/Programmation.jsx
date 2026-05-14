import { c_Programmation_2k26 } from "../../constant/programmation";
import { useAudioStore } from "../../store/store";
import Day from "../Day/Day";
import s from "./Programmation.module.scss";
import { useEffect, useState } from "react";

const Programmation = () => {

    const setTrackList = useAudioStore((state) => state.setTrackList);

    useEffect(() => {
        setTrackList(c_Programmation_2k26);
    }, []);

    return (
        <div className={s.Programmation}>
            {c_Programmation_2k26.map((day) => (
                <Day key={day.dayNumber} day={day.dateFormatted} artists={day.artists} />
            ))}
        </div>
    );
};

export default Programmation;