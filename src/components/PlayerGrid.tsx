import { Text, Button, Grid } from "@nextui-org/react";
import PlayerCard from "@/components/PlayerCard";

export default function PlayerGrid() {
  return (
    <Grid.Container gap={1}>
      <Grid>
        <PlayerCard name="FreyaTheCat-1718" />
      </Grid>
      <Grid>
        <PlayerCard name="Sidon-11926" />
      </Grid>
      <Grid>
        <PlayerCard name="Exalted-11497" />
      </Grid>
    </Grid.Container>
  );
}
