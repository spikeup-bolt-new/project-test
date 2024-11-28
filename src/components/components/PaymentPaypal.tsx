import {
  PayPalScriptProvider,
  usePayPalCardFields,
  PayPalCardFieldsProvider,
  PayPalCardFieldsForm,
} from "@paypal/react-paypal-js";
import {
  paypalCaptureOrder,
  paypalCreateOrder,
} from "../../services/paymentsService";
import { Button, Spin } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import { useState } from "react";

interface PayPalProps {
  amount: number;
  onPayment?: () => void;
  onCancel?: () => void;
}

const SubmitPayment: React.FC<{
  setIsPaying: React.Dispatch<React.SetStateAction<boolean>>;
  isPaying: boolean;
}> = ({ isPaying, setIsPaying }) => {
  const { cardFieldsForm } = usePayPalCardFields();

  const handleClick = async () => {
    if (!cardFieldsForm) {
      const childErrorMessage =
        "Unable to find any child components in the <PayPalCardFieldsProvider />";

      throw new Error(childErrorMessage);
    }
    const formState = await cardFieldsForm.getState();

    if (!formState.isFormValid) {
      return alert("The payment form is invalid");
    }
    setIsPaying(true);

    cardFieldsForm.submit().catch((err) => {
      setIsPaying(false);
    });
  };

  return (
    <Button
      className="bg-amber-400"
      type="primary"
      onClick={handleClick}
      icon={isPaying ? <></> : <CreditCardOutlined />}
      title="Renew"
    >
      {isPaying ? <Spin /> : "Pay"}
    </Button>
  );
};

export const PaymentPaypal: React.FC<PayPalProps> = ({
  amount,
  onPayment,
  onCancel,
}) => {
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");
  const createOrder = async () => {
    const order = await paypalCreateOrder(`${amount}`);
    return order;
  };

  const onApprove = async (data: any) => {
    try {
      setError("");
      await paypalCaptureOrder(data.orderID);
      onPayment?.();
    } catch (error) {
      console.log(error);
      setError("Payment error");
    }
  };
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "ASuQmCHCHnb6VIBjt84bJs4zR9ohkF8cqxipsoSzaYm-Wz6ag_z0kgHBYSgetaTf5PIZbQiiOXL-4sa1",
        components: "card-fields",
      }}
    >
      <PayPalCardFieldsProvider
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => {
          console.log(err);
          setError("Payment error");
        }}
      >
        <PayPalCardFieldsForm />
        <div className="flex gap-4">
          <Button onClick={() => onCancel?.()}>Cancel</Button>
          <SubmitPayment isPaying={isPaying} setIsPaying={setIsPaying} />
        </div>
        {error && <div className="text-red-300">{error}</div>}
      </PayPalCardFieldsProvider>
    </PayPalScriptProvider>
  );
};
