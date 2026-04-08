import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPayment = location.state?.verified;

  useEffect(() => {
    if (!fromPayment) {
      navigate("/");
    }
  }, [fromPayment]);

  if (fromPayment) {
    return (
      <h2>
        Your payment was successful with payment id :
        {location.state?.payment_id}
      </h2>
    );
  }

  return null;
};

export default Success;
