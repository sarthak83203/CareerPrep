import {LuPlus} from "react-icons/lu";
import {CARD_BG} from "../../utils/data";
import toast from "react-hot-toast"
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";



export default function Dashboard(){
    const navigate=useNavigate();
    
    return(
        <DashboardLayout>
            Dashboard
        </DashboardLayout>

    );
}