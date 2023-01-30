import { Navigate } from "react-router-dom"
import { UserContext } from "../../context/userContext"
import {ReactElement, ReactNode, useContext} from "react";

export const WithAdminProtector = ({ children }: {children: ReactNode}) => {
    const { isAdmin } = useContext(UserContext)
    if (isAdmin) {
        return children as ReactElement<any>
    }
    return <Navigate to="/" replace></Navigate>

}

