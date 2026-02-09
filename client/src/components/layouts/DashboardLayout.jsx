import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <Navbar />
      {user && <div>{children}</div>}
    </div>
  );
}
