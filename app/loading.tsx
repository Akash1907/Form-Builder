import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
const loading = () => {
  return (
    <>
        <Grid container mt={5} justifyContent={"start"}>
          {[...Array(6)].map((_, index) => (
            <Grid item key={index} xs={12} sm={12} md={6} lg={4}>
              <Skeleton
                key={index}
                variant="rounded"
                sx={{
                  flexGrow: 1,
                  m: 1,
                  height: 215,
                }}
              />
            </Grid>
          ))}
        </Grid>
    </>
  );
};

export default loading;
