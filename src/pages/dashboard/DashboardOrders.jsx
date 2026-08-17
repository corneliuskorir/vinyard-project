import { useOrders } from "../../providers/OrdersProvider";
import styles from "./DashboardOrders.module.css";

function DashboardOrders() {
  const { ordersState } = useOrders();
  const { loading, error, data } = ordersState;

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log("ORDERS:", data);

  return (
    <div className={styles.ordersPage}>
      <h2>Orders</h2>

      {data?.length === 0 ? (
        <div className={styles.empty}>
          <p>No orders Placed</p>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {data?.map((order) => (
            <div className={styles.orderCard} key={order.id}>
              <div className={styles.orderHeader}>
                <h3>Order #{order.id}</h3>
                <span className={styles.total}>Total: ${order.total}</span>
              </div>

              <div className={styles.customer}>
                <h4>Customer details</h4>

                <p>
                  <strong>Name:</strong> {order.customer.name}
                </p>

                <p>
                  <strong>Email:</strong> {order.customer.email}
                </p>

                <p>
                  <strong>Phone</strong> {order.customer.phone}
                </p>

                <p>
                  <strong>Address:</strong> {order.customer.address}
                </p>

                <p>
                  <strong>Notes:</strong> {order.customer.notes}
                </p>
              </div>

              <div className={styles.items}>
                <h4>Items</h4>

                {order.items.map((item) => (
                  <div className={styles.item} key={item.id}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardOrders;
