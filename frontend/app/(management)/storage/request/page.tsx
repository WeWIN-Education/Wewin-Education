import ProductOrderApprovalPage from "@/app/components/storage/request/poApprovalPage";
import { MOCK_PURCHASE_ORDERS } from "@/lib/constants/storage/request/mock.purchase_orders";

export default function RequestPage() {
  return (
    <ProductOrderApprovalPage data={MOCK_PURCHASE_ORDERS} />
  );
}
