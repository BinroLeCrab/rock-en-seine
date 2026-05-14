import { use, useEffect, useState } from "react";
import s from "./Day.module.scss";

const Day = ({ day, artists }) => {

    const [rows, setRows] = useState([]);
    const [hasTwoRows, setHasTwoRows] = useState(false);

    useEffect(() => {

        let index = 0;
        const newRows = [];
        const firstRow = artists.slice(0, 1);
        newRows.push(firstRow);

        // 2 ligne avec 3 artistes puis autant de lignes de 5 qu'ils y en at
        if (artists.length >= 8) {
            const secondRow = artists.slice(1, 4);
            const thirdRow = artists.slice(4, 7);
            newRows.push(secondRow);
            newRows.push(thirdRow);
            setHasTwoRows(true);
            index = 7;
        } else {
            const secondRow = artists.slice(1, 4);
            newRows.push(secondRow);
            index = 4;
        }

        while (index < artists.length) {
            const row = artists.slice(index, index + 5);
            newRows.push(row);
            index += 5;
        }

        setRows(newRows);
    }, [artists]);

    return (
        <div className={s.Day}>
            <h2>{day}</h2>
            <div className={s.Day__artistsWrapper}>
                {rows.map((row, rowIndex) => (
                    <div className={`${s.Day__row} ${(rowIndex === 1) || (rowIndex === 2 && hasTwoRows) ? s.secondary : ''}`} key={rowIndex}>
                        {row.map((artist, artistIndex) => (
                            <p className={s.Day__artist} key={artistIndex}>
                                {artist.name}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Day;