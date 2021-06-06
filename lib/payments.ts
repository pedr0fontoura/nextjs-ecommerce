import { loadStripe } from "@stripe/stripe-js";

interface IInitiateCheckout {
  lineItems: {
    price?: string;
    quantity?: number;
  }[];
}

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_API_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY)
  : null;

export async function initiateCheckout({
  lineItems,
}: IInitiateCheckout): Promise<void> {
  const stripe = await stripePromise;

  await stripe?.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
}
