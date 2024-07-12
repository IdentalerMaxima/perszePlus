import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
	const { userToken } = useStateContext(null);

	if(userToken){
		return <Navigate to="/" /> 
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<Outlet />
		</div>
	)
}