import { c_Programmation_2k26 } from "../../constant/programmation";
import Day from "../Day/Day";
import s from "./ProgrammationManager.module.scss";

const ProgrammationManager = () => {

    return (
        <div className={s.Programmation}>
            {c_Programmation_2k26.map((day) => (
                <Day key={day.dayNumber} day={day.dateFormatted} artists={day.artists} />
            ))}
        </div>
    );
};

export default ProgrammationManager;