import { useContext, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import { UserContextType} from "../App"

const Editor: React.FC = () => {

    const [ editorState, setEditorState ] = useState<string>("Editor");

    const context = useContext<UserContextType>(UserContext);

    if (!context) {
        // Handle the case where context is undefined
        return <Navigate to={"/signin"} />;
    }

    const { userAuth: { access_token } } = context;
    return (
        access_token === null ? <Navigate to={"/signin"} />
            :
            <div>
                <h1>Welcome to the Editor Page</h1>
                <p>This is where you'll create and edit blog posts.</p>

                {/* Add editor components here */}
            </div>
    )
}

export default Editor;