import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import BuildCard from "./BuildCard";
import structures from "../data";

function Content() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        {/* Левая колонка */}
        <Grid size={{ xs: 12, md: 4 }}>
          <BuildCard building={structures[3]} imageSide="left" />
          <BuildCard building={structures[6]} imageSide="left" />
        </Grid>

        {/* Центральная колонка */}
        <Grid size={{ xs: 12, md: 4 }}>
          <BuildCard building={structures[9]} center />
        </Grid>

        {/* Правая колонка */}
        <Grid size={{ xs: 12, md: 4 }}>
          <BuildCard building={structures[7]} imageSide="right" />
          <BuildCard building={structures[8]} imageSide="right" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Content;