import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
export default function SignUp({setCurrentPage}){
    const [profilePic,setProfilePic]=useState("");
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
 const {updateUser}=useContext(UserContext);
    const [error,setError]=useState(null);
    const navigate=useNavigate();

    //handling sign up form submit..
    const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName) {
        setError("Please enter the full name");
        return;
    }

    if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
    }

    if (!password) {
        setError("Please enter a valid password");
        return;
    }

    try {
        let profileImageUrl = "";

        if (profilePic) {
            const imgUploadRes = await uploadImage(profilePic);
            profileImageUrl = imgUploadRes.imageUrl || "";
        }

        const response = await axiosInstance.post(
            API_PATHS.AUTH.REGISTER,
            { name: fullName, email, password, profileImageUrl }
        );

        const { token } = response.data;

        if (token) {
            localStorage.setItem("token", token);
            updateUser(response.data);
            navigate("/dashboard");
        }

    } catch (err) {
        console.log(err);
        setError(
            err.response?.data?.message || "Something went wrong"
        );
    }
};

  


    return(
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">Create an Account</h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6">
                Join us today by entering you following details...
            </p>

            <form onSubmit={handleSignUp}>
                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
                <div className="grid grid-cols-1 md:gris-cols-1 gap-2">
                    <Input
                      value={fullName}
                      onChange={({target})=>setFullName(target.value)}
                      label="Full Name"
                      placeholder="Sarthak Shinde"
                      type="text"
                      />

                      <Input
                       value={email}
                       onChange={({target})=>setEmail(target.value)}
                       label="Email"
                       placeholder="sarthak@example.com"
                       type="text"
                       />

                       <Input
                        value={password}
                        onChange={({target})=>setPassword(target.value)}
                        label="password"
                        placeholder="Enter minimum 8 characters.."
                        type="text"
                        />
                </div>
                {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                <button className="btn-primary" type="submit">
                    Sign Up
                </button>
                <p className="txt-[13px] text-slate-800 mt-3">
                    Already have an account?{" "}
                    <button onClick={(e)=>setCurrentPage("login")} className="font-medium text-primary underline cursor-pointer">Login</button>
                </p>
            </form>
        </div>

    );
}