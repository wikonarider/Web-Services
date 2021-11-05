import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function SkeletonFooter() {
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        gap: "20px",
        pb: "10px",
      }}
    >
      <Skeleton variant="rectangular" width={345} height={420} />
      <Skeleton variant="rectangular" width={345} height={420} />
      <Skeleton variant="rectangular" width={345} height={420} />
      <Skeleton variant="rectangular" width={345} height={420} />
    </Stack>
  );
}

export default SkeletonFooter;
