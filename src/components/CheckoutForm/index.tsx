import { useState, FormEvent } from "react";
import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import Button from "../Button";
import { useParams } from "react-router-dom";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { username } = useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}#/${username}/complete`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message as string);
    } else {
      console.log(error);
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form className="max-w-xl" onSubmit={handleSubmit}>
      <PaymentElement id="checkout-form-payment-element" />
      <Button className="mt-6" disabled={isLoading || !stripe || !elements} id="submit">
        Pay now
      </Button>

      {message && (
        <p className="text-red-500 mt-1" id="payment-message">
          {message}
        </p>
      )}
    </form>
  );
}

export default CheckoutForm;
