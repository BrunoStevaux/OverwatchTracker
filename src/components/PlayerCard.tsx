import {
  Card,
  Text,
  Button,
  Loading,
  Image,
  css,
  Spacer,
} from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function PlayerCard() {
  const [player, setPlayer] = useState({
    playerName: "Loading...",
    playerTitle: "Loading...",
    profileIcon: "",
    rankings: {
      tank: "Loading...",
      offense: "Loading...",
      support: "Loading...",
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("/api/fetchPlayer?user=FreyaTheCat-1718");
        const dataJSON = await data.json().then();
        setPlayer(dataJSON);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [player]);

  let loading = false;
  return (
    <Card isHoverable isPressable css={{ w: "310px" }}>
      <Card.Header css={{ display: "flex", justifyContent: "space-between" }}>
        <Text h3>{player.playerName ? player.playerName : "Loading ..."}</Text>
        <Spacer></Spacer>
        <Text h5>
          {player.playerTitle ? player.playerTitle : "Loading ..."}
        </Text>
        <Button.Group color="gradient" bordered size="xs">
          {/* This is just temporary to test if loading toggle works */}
          <Button>
            {typeof player.playerName === "undefined" ? (
              <Loading type="points" size="xs" />
            ) : (
              <Text>🔄</Text>
            )}
          </Button>
          <Button>🗑</Button>
        </Button.Group>
      </Card.Header>

      <Card.Image
        src={player.profileIcon}
        width={"100%"}
        objectFit="cover"
      ></Card.Image>
      <Card.Body css={{ p: 0 }}></Card.Body>
      <Card.Footer isBlurred>
        <Text>
          Tank: {player.rankings ? player.rankings.tank : "Loading ..."}
        </Text>
        <Text>
          DPS: {player.rankings ? player.rankings.offense : "Loading ..."}
        </Text>
        <Text>
          Support: {player.rankings ? player.rankings.support : "Loading ..."}
        </Text>
      </Card.Footer>
    </Card>
  );
}
