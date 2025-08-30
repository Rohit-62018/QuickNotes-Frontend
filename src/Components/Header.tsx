import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoNotes-removebg-preview-2.png";
import { logoutUser } from "../apicalls";

interface HeaderProps {
  dimmed: boolean;
}

const Header: React.FC<HeaderProps> = ({ dimmed }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { success, message } = await logoutUser();
    if (success) {
      toast.success(message);
      navigate("/login");
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="header" style={dimmed ? { opacity: "0.5" } : {}}>
      <div className="left">
        <img src={logo} alt="logo" />
        <p>Quick Notes</p>
      </div>
      <div onClick={handleLogout} className="right">
        Logout
      </div>
    </div>
  );
};

export default Header;