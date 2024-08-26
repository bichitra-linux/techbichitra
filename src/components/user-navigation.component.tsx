import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useContext } from "react";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {

    const { userAuth: { username }, setUserAuth} = useContext(UserContext);

    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({ access_token: null })
    }

    return (
        <AnimationWrapper
        className="absolute right-0 z-50" 
        transition={{ duration: 0.2 }}>
            <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
                <Link to={"/editor"} className="flex gap-2 link">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>Write</p>
                </Link>
                <Link to={`/user/${username}`} className="flex gap-2 link">
                <i className="fi fi-rr-user"></i>
                <p>Profile</p>
                </Link>
                <Link to={"/dashboard/blogs"} className="flex gap-2 link">
                <i className="fi fi-rr-book-alt"></i>
                <p>Dashboard</p>
                </Link>
                <Link to={"/settings/edit-profile"} className="flex gap-2 link">
                <i className="fi fi-rr-settings"></i>
                <p>Profile Settings</p>
                </Link>
                <span className="absolute border-top border-grey w-[100%]"></span>
                <button className="text-left p-4 hover:bg=grey w-full pl-8 py-4" onClick={signOutUser}>
                    
                    <h1 className="font-bold text-xl mg-1">Log Out</h1>
                    <p className="text-dark-grey">@{username}</p>
                </button>
            </div>

        </AnimationWrapper>
    )
}

export default UserNavigationPanel;