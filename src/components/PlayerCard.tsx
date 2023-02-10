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
  const [player, setPlayer] = useState([]);

  let loading = false;
  return (
    <Card isHoverable isPressable css={{ w: "310px" }}>
      <Card.Header css={{ display: "flex", justifyContent: "space-between" }}>
        <Text h3>Name</Text>
        <Spacer></Spacer>
        <Text h5>Title</Text>
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
        width={"100%"}
        objectFit="cover"
      ></Card.Image>
      <Card.Body css={{ p: 0 }}></Card.Body>
      <Card.Footer isBlurred>
        <Text b>bottom text</Text>
      </Card.Footer>
    </Card>
  );
}
