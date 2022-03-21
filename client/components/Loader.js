import { Skeleton } from "@mui/material";

function Loading({ isLoading, children }) {
  return isLoading ? (
    <div
      style={{
        margin: "0 auto",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        height: "100vh",
        backgroundColor: "rgba(179, 20, 20, 0.09)",
      }}
    >
      <Skeleton variant="circular" width={60} height={60} />
    </div>
  ) : (
    children
  );
}

export default Loading;
