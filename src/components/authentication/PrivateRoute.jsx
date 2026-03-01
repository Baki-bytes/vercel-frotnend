import { Navigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";

const PrivateRoute = ({ children }) => {
  const { user } = ChatState();
  return user ? children : <Navigate to="/home" />;
};

export default PrivateRoute;
