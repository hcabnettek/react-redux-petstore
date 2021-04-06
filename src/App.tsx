import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import PageLayout from "./pageLayouts/pageLayout";
import "./App.css";

import {
  addPetActionCreator,
  editPetActionCreator,
  togglePetActionCreator,
  removePetActionCreator,
  selectPetActionCreator,
} from "./store/redux-og";

import { State } from "./type";
function App() {
  const dispatch = useDispatch();
  const pets = useSelector((state: State) => state.pets);
  const selectedPetId = useSelector((state: State) => state.selectedPet);

  const [addPetInput, setAddPetInput] = useState<string>("");
  const [editPetInput, setEditPetInput] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const editInput = useRef<HTMLInputElement>(null);
  const handleNewInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAddPetInput(e.target.value);
  };

  const handleAddNewPet = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!addPetInput.length) return;

    dispatch(addPetActionCreator({ desc: addPetInput }));
    setAddPetInput("");
  };

  const handleSelectPet = (petId: string) => (): void => {
    dispatch(selectPetActionCreator({ id: petId }));
  };
  return (
    <PageLayout>
      <div className="App">
        <h2>In the house</h2>
      </div>
      <div>
        <form onSubmit={handleAddNewPet}>
          <label htmlFor="new-todo">Add new:</label>
          <input
            onChange={handleNewInputChange}
            id="new-todo"
            value={addPetInput}
          />
          <button type="submit">Create</button>
        </form>
        <ul className="App__list">
          <h2>My Todos:</h2>
          {pets.map((pet, i) => (
            <li
              className={`${pet.isAdult ? "adult" : "puppy"} ${
                pet.id === selectedPetId ? "active" : ""
              }`}
              key={pet.id}
              onClick={handleSelectPet(pet.id)}
            >
              <span className="list-number">{i + 1})</span> {pet.name}
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}

export default App;
