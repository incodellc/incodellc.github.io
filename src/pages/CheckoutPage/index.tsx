import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm";
import Button from "../../components/Button";

export interface CheckoutPageProps {
  clientSecret: string | null;
  stripe: Stripe | null;
}

export default function CheckoutPage({ clientSecret, stripe }: CheckoutPageProps) {
  const { username } = useParams();

  return clientSecret ? (
    <Elements
      options={{
        clientSecret,
        appearance: { theme: "night" },
        loader: "auto",
      }}
      stripe={stripe}>
      <CheckoutForm />
    </Elements>
  ) : (
    <div>
      <h1 className="text-orange-500 text-2xl mb-6">There's no payment. Let's create it first:</h1>
      <Button className="max-w-fit" href={`/${username}/pay`}>
        Create payment
      </Button>
    </div>
  );
}
