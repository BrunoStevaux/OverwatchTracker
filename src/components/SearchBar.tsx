import { Input, css } from "@nextui-org/react";

export default function FilterBar(props) {
  return (
    <>
      <Input
        clearable
        rounded
        shadow={false}
        labelLeft="Battletag"
        placeholder="Battletag#1234"
        css={{
          width: "30%",
          margin: "1rem",
        }}
      />
    </>
  );
}
