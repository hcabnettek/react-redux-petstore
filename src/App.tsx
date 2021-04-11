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
      <div className="lg:flex">
        <div
          id="sidebar"
          className="fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden"
        >
          <div
            id="navWrapper"
            className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0"
          >
            <div className="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white"></div>
            <nav
              id="nav"
              className="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-14 sticky?lg:h-(screen-18)"
            >
              <ul>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-3 hover:text-gray-900 transition-colors duration-200 mb-4 text-gray-900"
                  >
                    <div className="mr-3 rounded-md bg-gradient-to-br from-pink-500 to-rose-500">
                      <svg className="h-6 w-6" viewBox="0 0 24 24">
                        <path />
                        <path />
                      </svg>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div
          id="content-wrapper"
          className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible"
        >
          <div className="w-full flex">
            <div className="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
              <form onSubmit={handleAddNewPet}>
                <label htmlFor="new-pet">Add new:</label>
                <input
                  onChange={handleNewInputChange}
                  id="new-pet"
                  value={addPetInput}
                />
                <button type="submit">Create</button>
              </form>
              <ul>
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
            <div className="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
              <div className="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) pt-10 pb-6 top-18">
                <div className="mb-8">
                  <h5 className="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">
                    On this page
                  </h5>
                  <ul className="overflow-x-hidden text-gray-500 font-medium">
                    <li>
                      <a className="block transform transition-colors duration-200 py-2 hover:text-gray-900 text-gray-900">
                        Default Stuff
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default App;
