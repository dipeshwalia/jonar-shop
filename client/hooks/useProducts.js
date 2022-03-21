import { useQuery } from "react-query";

export const useGetProducts = ({ skip, take = 5 }) => {
  // take is hardcoded for now
  return useQuery(["products", skip, take], () =>
    fetch(`http://localhost:3000/api/products?skip=${skip}&take=${take}`)
      .then((response) => {
        if(!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json()
      })
      .then(({ data, count }) => {
        return {
          count,
          products: data.map((item) => ({
            ...item,
            // just for illustration
            img: "http://localhost:3000/comingsoon.jpg",
          })),
        };
      })
  );
};
