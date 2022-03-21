import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { useGetProducts } from "../hooks/useProducts";
import Loading from "../components/Loader";
import Header from "../components/layout/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Alert, Pagination } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Index() {
  const [skip, setSkip] = React.useState(0);
  const take = 5;

  const {
    isLoading,
    data = { products: [], count: 0 },
    isError,
  } = useGetProducts({
    skip,
    take,
  });

  const [cart, setCart] = React.useState({});
  const isDesktop = useMediaQuery("(min-width:1000px)");
  return (
    <div style={{ margin: "0 auto" }}>
      {isError ? (
        <Alert severity="error">Error, loading api (please check if api is running correctly) </Alert>
      ) : (
        <>
          <Header cart={cart} />
          <Loading isLoading={isLoading}>
            <ImageList sx={{ width: "auto", height: "auto" }}>
              <ImageListItem key="Subheader" cols={isDesktop ? 3 : 2} />
              {data.products.map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    width={248}
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 1x`}
                    alt={item.name}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={`$ ${item.price}`}
                    subtitle={item.description}
                    style={{
                      backgroundColor: "rgba(0, 4, 255, 0.5)",
                      height: 80,
                    }}
                    actionIcon={
                      <IconButton
                        disabled={cart[item.id] ? true : false}
                        sx={{ background: cart[item.id] ? "white" : "yellow" }}
                        aria-label={`info about ${item.title}`}
                        onClick={() =>
                          setCart((prev) => {
                            return { ...prev, [item.id]: item };
                          })
                        }
                      >
                        {cart[item.id] ? (
                          <CheckCircleOutlineIcon />
                        ) : (
                          <AddShoppingCartIcon />
                        )}
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Pagination
              style={{ display: "flex", justifyContent: "center" }}
              count={data.count / take}
              showFirstButton
              showLastButton
              onChange={(_e, page) => setSkip((page - 1) * take)}
            />
          </Loading>
        </>
      )}
    </div>
  );
}
