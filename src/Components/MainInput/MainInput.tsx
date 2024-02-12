import React, {
    RefObject,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import {
    VALIDATE_CSV_NUMBERS_ONLY,
    ValidateChars,
} from "../../Misc/Forms/Validators";

export default function MainInput({
    onGenerateList,
    onAddItems,
    onClear,
}: {
    onGenerateList: (list: number[]) => void;
    onAddItems: (items: number[]) => void;
    onClear: () => void;
}) {
    const inputRef = useRef<NumbersInputRefProperties>(null);

    function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //IMPROVE: add a toast when submitting
        inputRef.current?.value && onAddItems(inputRef.current?.value);
        inputRef.current?.clear();
    }

    return (
        <form className="input-container" onSubmit={onSubmitHandler}>
            <h2 className="input-container__title">Create List</h2>
            <span className="input-container__inputs">
                {/* Regular Input (1 by 1 or csv format) */}
                <span className="input-container__span">
                    <NumbersInput
                        className="input-container__input"
                        ref={inputRef}
                    ></NumbersInput>
                    <button className="input-container__btn--add">Add</button>
                </span>
                {/* Generate List */}
                <GenerateButton
                    className="input-container__btn--generate"
                    onClick={(list) => onGenerateList(list)}
                ></GenerateButton>
                <button
                    className="input-container__btn--clear"
                    type="button"
                    onClick={() => {
                        inputRef.current?.clear();
                        onClear();
                    }}
                >
                    Clear
                </button>
            </span>
        </form>
    );
}

type NumbersInputRefProperties = {
    value: number[];
    clear: () => void;
};
const NumbersInput = forwardRef(
    (
        {
            className,
        }: {
            className: string;
        },
        ref
    ) => {
        const [value, setValue] = useState("");
        const [wasTouched, setWasTouched] = useState(false);
        let isValid = ValidateChars(value, VALIDATE_CSV_NUMBERS_ONLY);
        const validationClassName = wasTouched
            ? isValid
                ? `${className + "--valid"}`
                : `${className + "--invalid"}`
            : "";

        function parseInput(value: string) {
            //Should always return an array of numbers, even if its a single number
            //Take into account the char used in validation.
            const arr = value.split(",") as unknown as number[];
            return isValid ? arr : [];
        }

        useImperativeHandle<unknown, NumbersInputRefProperties>(
            ref,
            () => {
                return {
                    value: parseInput(value),
                    clear: () => {
                        setValue("");
                        setWasTouched(false);
                    },
                };
            },
            [value]
        );

        return (
            <input
                className={`${className} ${validationClassName}`}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                onBlur={() => {
                    setWasTouched(true);
                }}
            ></input>
        );
    }
);

function GenerateButton({
    className,
    onClick,
}: {
    className: string;
    onClick: (list: number[]) => void;
}) {
    function randomList() {
        const size = Math.ceil(Math.random() * 100 + 1); // 2 <= size <= 5000
        let arr: number[] = [];
        for (let i = 0; i < size; i++) {
            arr[i] = Math.round(Math.random() * 5000);
        }

        onClick(arr);
    }

    return (
        <button className={className} onClick={randomList} type="button">
            Generate List
        </button>
    );
}
