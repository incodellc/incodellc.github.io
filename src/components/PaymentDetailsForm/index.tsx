import { useState, ChangeEvent, FormEvent, Dispatch } from "react";
import Input from "../Input";
import Button from "../Button";
import axios from "axios";
import { CREATE_PAYMENT } from "../../endpoints";
import { useNavigate, useParams } from "react-router-dom";
import { dollarsToCents } from "../../utils/dollarsToCents";

interface PaymentDetailsFormProps {
  setClientSecret: Dispatch<React.SetStateAction<string | null>>;
}

export default function PaymentDetailsForm({ setClientSecret }: PaymentDetailsFormProps) {
  const [amount, setAmount] = useState("");
  const { username } = useParams();
  const navigate = useNavigate();
  const [amountErrorMessage, setAmountErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!amount) {
      return setAmountErrorMessage("Amount is required");
    }

    const amountInCents = dollarsToCents(Number(amount));

    if (amountInCents) {
      setIsLoading(true);
      axios
        .post(CREATE_PAYMENT, { amount: amountInCents, country: "test country" })
        .then(({ data }) => {
          setClientSecret(data.clientSecret);
          navigate(`/${username}/checkout`);
        })
        .catch((err) => console.error("Error fetching clientSecret:", err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center font-bold text-3xl mb-6">Payment details</h1>
      <label>
        <span className="">Amount ($):</span>
        <Input type="number" value={amount} placeholder="Input amount" onChange={onChangeAmount} />
        {amountErrorMessage && <p className="text-red-500">{amountErrorMessage}</p>}
      </label>

      <div className="mt-6">
        <Button disabled={isLoading}>Create Payment</Button>
      </div>
    </form>
  );
}
