import { formatCurrency } from "@/app/utils/request";
import { findProductById } from "@/lib/constants/storage/request/selectors";
import { Purchase_Order_Items, Type } from "@/types/storage";

export function RequestItemsTable({
  items,
  requestType,
}: {
  items: Purchase_Order_Items[];
  requestType: Type;
}) {
  const rows = items.map((it) => {
    const p = findProductById(it.productId);
    return { it, p };
  });

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 text-sm">
          <tr>
            <th className="px-4 py-3 text-left">Sản phẩm</th>
            <th>Mã</th>
            <th>Đơn vị</th>
            <th>SL yêu cầu</th>
            {requestType === "OUT" ? <th>Tồn hiện tại</th> : <th>—</th>}
            <th>Đơn giá</th>
            <th>Tổng</th>
            <th className="text-left">Ghi chú</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(({ it, p }, idx) => {
            const stock = p?.quantity ?? 0;
            const notEnough = requestType === "OUT" && it.quantityRequest > stock;

            return (
              <tr key={`${it.orderId}-${it.productId}-${idx}`} className="border-t">
                <td className="px-4 py-3 text-left">
                  <div className="font-medium">{p?.name ?? "Không tìm thấy sản phẩm"}</div>
                  {p?.categoryId?.name ? (
                    <div className="text-xs text-gray-500">{p.categoryId.name}</div>
                  ) : null}
                </td>
                <td className="text-center">{p?.code ?? it.productId}</td>
                <td className="text-center">{p?.unit ?? "—"}</td>

                <td className={`text-center font-semibold ${notEnough ? "text-red-600" : ""}`}>
                  {it.quantityRequest}
                </td>

                {requestType === "OUT" ? (
                  <td className={`text-center ${notEnough ? "text-red-600 font-semibold" : ""}`}>
                    {stock}
                  </td>
                ) : (
                  <td className="text-center text-gray-400">—</td>
                )}

                <td className="text-center">{formatCurrency(it.unitPriceRequest)}</td>
                <td className="text-center font-medium">{formatCurrency(it.totalPriceRequest)}</td>
                <td className="text-left">{it.noteRequest ?? "—"}</td>
              </tr>
            );
          })}

          {items.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-10 text-center text-sm text-gray-500">
                Request chưa có items.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
