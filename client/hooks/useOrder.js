import { useMutation, useQuery } from "react-query";
import { useUser } from "./useAuth";

const postOrder = (cart) => {
  const { token } = useUser();
  //   just for illustration, currently order api is taking one item at a time
  const data = Object.keys(cart).map((item) => {
    return cart[item];
  })[0];

  return fetch("http://localhost:3000/api/checkout", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id: data.id, item_count: 1 }),
  }).then((response) => response.json());
};

export const useOrder = () => {
  return useMutation(postOrder);
};

export const useGetOrder = () => {
  const { token } = useUser();
  return useQuery("orders", () =>
    fetch(`http://localhost:3000/api/admin/order`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
  );
};
