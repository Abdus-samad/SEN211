import { toast} from "react-toastify"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../context/userContext"
import {ReactElement, useContext} from "react";

const WithLoginProtector = ({ children }:{children: ReactElement}) => {
    const { user } = useContext(UserContext)
    if (user) {
        return children as ReactElement<any>
    } else {
        toast.error('Please login to proceed!')
    }
    return <Navigate to="/" replace />
}

export default WithLoginProtector