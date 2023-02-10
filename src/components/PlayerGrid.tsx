import { Text, Button, Grid } from "@nextui-org/react";
import PlayerCard from "@/components/PlayerCard";

export default function PlayerGrid() {
  return (
    <Grid.Container gap={1}>
      <Grid>
        <PlayerCard />
      </Grid>
      <Grid>
        <PlayerCard />
      </Grid>
      <Grid>
        <PlayerCard />
      </Grid>
    </Grid.Container>
  );
}
