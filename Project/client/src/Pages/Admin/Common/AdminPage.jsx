import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/Auth/useAuth";
import { PlatformRole } from "../../../consts/platform.roles";
import { useEffect } from "react";

const AdminPage = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user.roles.includes(PlatformRole.MANAGER)) navigate("/");
  });

  return children;
};

export default AdminPage;
