import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import { Pet } from "../type";
import { v1 as uuid } from "uuid";

export const ADD_PET = "ADD_PET";
export const EDIT_PET = "EDIT_PET";
export const TOGGLE_PET = "TOGGLE_PET";
export const REMOVE_PET = "REMOVE_PET";
export const SELECT_PET = "SELECT_PET";

interface AddPetActionType {
  type: typeof ADD_PET;
  payload: Pet;
}

export const addPetActionCreator = ({
  desc,
}: {
  desc: string;
}): AddPetActionType => {
  return {
    type: ADD_PET,
    payload: {
      id: uuid(),
      name: desc,
      isAdult: false,
    },
  };
};

interface EditPetActionType {
  type: typeof EDIT_PET;
  payload: {
    id: string;
    desc: string;
  };
}

export const editPetActionCreator = ({
  id,
  desc,
}: {
  id: string;
  desc: string;
}): EditPetActionType => {
  return {
    type: EDIT_PET,
    payload: {
      id,
      desc,
    },
  };
};

interface TogglePetActionType {
  type: typeof TOGGLE_PET;
  payload: {
    id: string;
    isAdult: boolean;
  };
}

export const togglePetActionCreator = ({
  id,
  isAdult,
}: {
  id: string;
  isAdult: boolean;
}): TogglePetActionType => {
  return {
    type: TOGGLE_PET,
    payload: {
      id,
      isAdult,
    },
  };
};

interface RemovePetActionType {
  type: typeof REMOVE_PET;
  payload: {
    id: string;
  };
}

export const removePetActionCreator = ({
  id,
}: {
  id: string;
}): RemovePetActionType => {
  return {
    type: REMOVE_PET,
    payload: {
      id,
    },
  };
};

interface SelectPetActionType {
  type: typeof SELECT_PET;
  payload: {
    id: string;
  };
}

export const selectPetActionCreator = ({
  id,
}: {
  id: string;
}): SelectPetActionType => {
  return {
    type: SELECT_PET,
    payload: {
      id,
    },
  };
};

const petsInitialState: Pet[] = [
  {
    id: uuid(),
    name: "Learn React",
    isAdult: true,
  },
  {
    id: uuid(),
    name: "Learn Redux",
    isAdult: true,
  },
  {
    id: uuid(),
    name: "Learn Redux-ToolKit",
    isAdult: false,
  },
];

type PetActionTypes =
  | AddPetActionType
  | EditPetActionType
  | TogglePetActionType
  | RemovePetActionType;

const petsReducer = (
  state: Pet[] = petsInitialState,
  action: PetActionTypes
) => {
  switch (action.type) {
    case ADD_PET: {
      const { payload } = action;
      return [...state, payload];
    }
    case EDIT_PET: {
      const { payload } = action;
      return state.map((pet) =>
        pet.id === payload.id ? { ...pet, desc: payload.desc } : pet
      );
    }
    case TOGGLE_PET: {
      const { payload } = action;
      return state.map((pet) =>
        pet.id === payload.id ? { ...pet, isAdult: payload.isAdult } : pet
      );
    }
    case REMOVE_PET: {
      const { payload } = action;
      return state.filter((pet) => pet.id !== payload.id);
    }
    default: {
      return state;
    }
  }
};

type SelectedPetActionTypes = SelectPetActionType;
const selectedPetReducer = (
  state: string | null = null,
  action: SelectedPetActionTypes
) => {
  switch (action.type) {
    case SELECT_PET: {
      const { payload } = action;
      return payload.id;
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  pets: petsReducer,
  selectedPet: selectedPetReducer,
});

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
