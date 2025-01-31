import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import CompletePage from "../../pages/CompletePage";
import CheckoutPage from "../../pages/CheckoutPage";
import DeveloperInfoPage from "../../pages/DeveloperInfoPage";
import DeveloperPayPage from "../../pages/DeveloperPayPage";
import DevInfoProvider from "../../contexts/DevInfo/DevInfoProvider";
import PageLayout from "../PageLayout";
import ContentLayout from "../ContentLayout";

export default function RouterLayout() {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY as string)
      .then((data: Stripe | null) => setStripe(data))
      .catch((err: Error) => console.log("Error loading Stripe:", err));
  }, []);

  return (
    <Router>
      <DevInfoProvider>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route path=":username" element={<ContentLayout />}>
              <Route index element={<DeveloperInfoPage />} />
              <Route path="pay" element={<DeveloperPayPage setClientSecret={setClientSecret} />} />
              <Route path="checkout" element={<CheckoutPage clientSecret={clientSecret} stripe={stripe} />} />
              <Route path="complete" element={<CompletePage />} />
            </Route>
          </Route>
        </Routes>
      </DevInfoProvider>
    </Router>
  );
}
