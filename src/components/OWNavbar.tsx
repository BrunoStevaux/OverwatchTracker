import { Navbar, Text, Button, Image, Spacer} from "@nextui-org/react";

export default function OWNavbar() {
  return (
    <Navbar isBordered variant="floating">
      <Navbar.Brand>
        <Image  objectFit="cover" width={250} src="https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/bltbcf2689c29fa39eb/622906a991f4232f0085d3cc/Masthead_Overwatch2_Logo.png?format=webply&quality=90" />
        <Spacer x={0.5} />
        <Text b size={"30px" }>Account Tracker</Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="#">
          <Text>Login</Text>
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat href="#">
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
