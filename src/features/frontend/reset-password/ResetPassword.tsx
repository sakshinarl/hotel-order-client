import * as React from "react";
import ChangePassword from "../../../shared/ui/change-password-form/ChangePasswordForm";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { errorMessage } from "../../../shared/ui/toasts/Toasts";

interface IResetPasswordProps {}

const ResetPassword: React.FunctionComponent<IResetPasswordProps> = (props) => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [userId, setUserId] = React.useState<string>();

  const validateToken = (token: string) => {
    //make request to validate token
    AuthService.validateToken(token)
      .then((response) => {
        setUserId(response?.data?.data?.id);
        sessionStorage.setItem("accessToken", token);
      })
      .catch((err) => {
        errorMessage("Link is expired...");
        navigate("/login");
      });
  };

  React.useEffect(() => {
    if (token) {
      validateToken(token);
    }
  }, [token]);

  return (
    <>
      <ChangePassword type="reset" id={userId as string} />
    </>
  );
};

export default ResetPassword;
