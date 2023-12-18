import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const ApplyList = () => {

    // STATE
    const [applyList, setApplyList] = useState([])

    const { user } = useAuth()

    axios.get('http://localhost:3000/api/auth/login')

    return (
        <>
            {/* Ttile */}
            <Helmet>
                <title>Applied List | Snap Academy</title>
            </Helmet>
        </>
    );
};

export default ApplyList;