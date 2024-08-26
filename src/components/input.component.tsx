import { useState } from "react";

interface InputBoxProps {
    name: string;
    type: string;
    id: string;
    value: string;
    placeholder: string;
    icon: string;
}

const InputBox: React.FC<InputBoxProps> = ({ name, type, id, value, placeholder, icon }) => {
    const [ passwordVisible, setpasswordVisible ] = useState(false);

    return (
        <div className="relative w-[100%] mb-4">
            <input
                name={name}
                type={type == "password" ? passwordVisible ? "text" : "password" : type }
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                className="input-box"
            />
            <i className={"fi " + icon + " input-icon"}></i>

            {
                type === "password" ?
                    <i className={"fi fi-rr-eye" + (!passwordVisible ? "-crossed" : "") + " input-icon left-[auto] right-4 cursor-pointer"} 
                    onClick={() => setpasswordVisible(currentVal => !currentVal)}
                    ></i> : ""
            }

        </div>
    )
}

export default InputBox;