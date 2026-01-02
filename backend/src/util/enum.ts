enum PRODUCT_STATUS_ENUM {
  IN_STOCK = 'in_stock',
  LOW_STOCK = 'low_stock',
  OUT_OF_STOCK = 'out_of_stock',
  CANCELLED = 'cancelled',
}

enum PURCHASE_ORDERS_STATUS_ENUM {
  DRAFT = 'draft',
  REQUESTED = 'requested',
  APPROVED = 'approved',
  ORDER_REQUESTED = 'order_requested',
  ORDER_APPROVED = 'order_approved',
  CANCELLED = 'cancelled',
  SUCCESS = 'success',
}

enum PURCHASE_ORDERS_TYPE_ENUM {
  IN = 'in',
  OUT = 'out',
}

export {
  PRODUCT_STATUS_ENUM,
  PURCHASE_ORDERS_STATUS_ENUM,
  PURCHASE_ORDERS_TYPE_ENUM,
};
