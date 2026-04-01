import React from "react";
import { useFetcher, redirect } from "react-router-dom";
import { updateOrder } from "../services/apiRestaurant";
import Button from "../ui/Button";
import Loading from "../ui/Loading";

export default function UpdateOrder({ order }) {
  console.log("1", order)
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  if (fetcher.state === "loading") return <Loading />;
  return (
    <fetcher.Form method="PATCH" action={`/order/${order.id}`}>
      {/* Truyền data cho action */}
      <Button
        type="submit" // QUAN TRỌNG: phải là submit
        disabled={isSubmitting}
        className="mt-6 rounded-full bg-yellow-400 px-4 py-2"
      >
        {isSubmitting ? "Making Priority..." : "Make Priority"}
      </Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  console.log("2 request data :", request);
  console.log("3 params data :", params);
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
