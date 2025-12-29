import StatCard from "./statCard";
import { getStatTone } from "./statLogic";

interface InventoryStatsProps {
  totalItems: number;
  totalQuantity: number;
  lowStock: number;
  outOfStock: number;
}

export default function InventoryStats({
  totalItems,
  totalQuantity,
  lowStock,
  outOfStock,
}: InventoryStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <StatCard
        title="Tổng vật dụng"
        value={totalItems}
        subtitle="Số loại vật dụng trong kho"
        tone={getStatTone("totalItems", totalItems)}
      />

      <StatCard
        title="Tổng tồn kho"
        value={totalQuantity}
        unit="đơn vị"
        subtitle="Số lượng hiện có"
        tone={getStatTone("totalQuantity", totalQuantity)}
      />

      <StatCard
        title="Sắp hết hàng"
        value={lowStock}
        subtitle="Dưới mức tồn tối thiểu"
        tone={getStatTone("lowStock", lowStock)}
      />

      <StatCard
        title="Hết hàng"
        value={outOfStock}
        subtitle="Cần nhập kho bổ sung"
        tone={getStatTone("outOfStock", outOfStock)}
      />
    </div>
  );
}
