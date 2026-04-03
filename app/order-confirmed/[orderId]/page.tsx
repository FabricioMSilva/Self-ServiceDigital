import PageShell from "@/app/_components/templates/PageShell";
import OrderConfirmedView from "@/app/_components/views/OrderConfirmedPage";

export default function OrderConfirmed({
  params,
}: {
  params: { orderId: string };
}) {
  return <PageShell>
    <OrderConfirmedView params={params} />
  </PageShell>
}
