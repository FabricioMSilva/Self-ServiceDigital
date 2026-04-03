import OrderConfirmedPage from "@/app/pages/OrderConfirmedPage";
import PageShell from "@/app/components/PageShell";

export default function PedidoConfirmado({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <PageShell>
      <OrderConfirmedPage params={params} />
    </PageShell>
  );
}
