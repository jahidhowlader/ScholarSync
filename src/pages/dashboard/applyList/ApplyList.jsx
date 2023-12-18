import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const ApplyList = () => {

    // STATE
    const [applyList, setApplyList] = useState([])

    const { user } = useAuth()

    axios.get('http://localhost:3000/api/auth/login')

    return (
        <div>

        </div>
    );
};

export default ApplyList;