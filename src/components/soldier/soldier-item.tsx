import { useState } from "react";
import { checkSoldier } from "../../storage/storage.service";
import { Soldier } from "../../storage/storage.type";
import EditSoldierNote from "./edit-soldier-note";

const SoldierItem = ({ soldier }: ISoldierItem) => {
  const [editNote, setEditNote] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(soldier.isChecked);
  const [note, setNote] = useState<string>(soldier.notes);

  const handleCheck = () => {
    setChecked((prev) => !prev);
    checkSoldier(soldier.id, soldier.isChecked);
  };

  const toggleEditNote = () => {
    setEditNote((prev) => !prev);
  };

  return (
    <div className="w-full text-xl gap-5 my-6 flex flex-col px-5 border-b-[1px] border-b-slate-600 pb-10">
      <div className="flex gap-3">
        <input
          onChange={handleCheck}
          type="checkbox"
          id={soldier.id}
          checked={checked}
        />
        <label htmlFor={soldier.id}>{soldier.name}</label>
      </div>
      {editNote ? (
        <EditSoldierNote
          toggleEdit={toggleEditNote}
          note={note}
          setNote={(note: string) => setNote(note)}
          soldier={soldier}
        />
      ) : (
        <div className="flex text-sm text-gray-500 justify-between">
          <p>{note ? note : "-"}</p>
          <button className="btn px-2 py-1" onClick={toggleEditNote}>
            ערוך היערות
          </button>
        </div>
      )}
    </div>
  );
};

interface ISoldierItem {
  soldier: Soldier;
}

export default SoldierItem;
