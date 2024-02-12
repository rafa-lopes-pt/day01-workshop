import { useReducer } from "react";
import ListDisplay from "./Components/ListDisplay/ListDisplay.js";
import MainInput from "./Components/MainInput/MainInput.js";
import NavBar from "./Components/NavBar.js";
import Results from "./Components/Results/Results.js";

enum LIST_REDUCER_ACTIONS {
    DELETE,
    ADD,
    OVERRIDE,
    CLEAR,
}

function listReducer(
    state: number[],
    action: { type: LIST_REDUCER_ACTIONS; payload: number | number[] }
) {
    switch (action.type) {
        case LIST_REDUCER_ACTIONS.DELETE: {
            const newList = [...state];
            if (typeof action.payload !== "number") {
                //Throw Error
                return state;
            }
            newList.splice(action.payload, 1);
            return newList;
        }
        case LIST_REDUCER_ACTIONS.ADD: {
            const newList = [...state];
            if (!Array.isArray(action.payload)) {
                //Throw Error
                return state;
            }
            newList.push(...action.payload);
            return newList;
        }
        case LIST_REDUCER_ACTIONS.OVERRIDE: {
            if (!Array.isArray(action.payload)) {
                //Throw Error
                return state;
            }
            return action.payload;
        }
        case LIST_REDUCER_ACTIONS.CLEAR: {
            return [];
        }
        default:
            return state;
    }
}

function App() {
    const [list, dispatchListUpdate] = useReducer(listReducer, [1, 2, 3]);

    return (
        <>
            <NavBar></NavBar>
            <main>
                <ListDisplay
                    list={list}
                    onDelete={(index) =>
                        dispatchListUpdate({
                            type: LIST_REDUCER_ACTIONS.DELETE,
                            payload: index,
                        })
                    }
                ></ListDisplay>
                <Results list={list}></Results>
                <MainInput
                    onAddItems={(list) =>
                        dispatchListUpdate({
                            type: LIST_REDUCER_ACTIONS.ADD,
                            payload: list,
                        })
                    }
                    onGenerateList={(list) =>
                        dispatchListUpdate({
                            type: LIST_REDUCER_ACTIONS.OVERRIDE,
                            payload: list,
                        })
                    }
                    onClear={() =>
                        dispatchListUpdate({
                            type: LIST_REDUCER_ACTIONS.CLEAR,
                            payload: [],
                        })
                    }
                ></MainInput>
            </main>
        </>
    );
}

export default App;
