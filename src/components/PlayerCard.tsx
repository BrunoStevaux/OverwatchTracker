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

export default function PlayerCard(props) {
  const [player, setPlayer] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3001/");
        const data = await res.json();
        setPlayer(data);
      }
      catch (err) {
        console.log("Could not fetch data");
      }
    }
    fetchData();
  }, []);

  let loading = false;
  return (
    <Card isHoverable isPressable css={{ w: "310px" }}>
      <Card.Header css={{ display: "flex", justifyContent: "space-between" }}>
        <Text h3>{player.name}</Text>
        <Spacer></Spacer>
        <Text h5>{player.title}</Text>
        <Button.Group color="gradient" bordered size="xs">
          {/* This is just temporary to test if loading toggle works */}
          <Button>
            {typeof player.name === "undefined" ? (
              <Loading type="points" size="xs" />
            ) : (
              <Text>🔄</Text>
            )}
          </Button>
          <Button>🗑</Button>
        </Button.Group>
      </Card.Header>

      <Card.Image
        src={player.profileicon}
        width={"100%"}
        // height={140}
        objectFit="cover"
      ></Card.Image>
      <Card.Body css={{ p: 0 }}></Card.Body>
      <Card.Footer isBlurred>
        <Text b>bottom text</Text>
      </Card.Footer>
    </Card>
  );
}
