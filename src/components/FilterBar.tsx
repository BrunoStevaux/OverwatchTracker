import { Button, Switch, Grid } from "@nextui-org/react";
import { useState } from "react";
import FilterButton from "@/components/FilterButton";

export default function FilterBar(props) {
  const [showFilters, setshowFilters] = useState(false);

  function toggleFilters() {
    setshowFilters(!showFilters);
  }

  return (
    <Grid.Container
      gap={2}
      justify="left"
      alignItems="center"
    >
      <Grid>
        <Switch shadow color="secondary" onChange={toggleFilters} />
      </Grid>

      {showFilters && (
        <>
          <Grid>
            <FilterButton />
          </Grid>
          <Grid>
            <FilterButton />
          </Grid>
          <Grid>
            <FilterButton />
          </Grid>
          <Grid>
            <FilterButton />
          </Grid>
          <Grid>
            <FilterButton />
          </Grid>
        </>
      )}
    </Grid.Container>
  );
}
