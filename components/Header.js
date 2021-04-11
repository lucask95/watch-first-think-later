import { Typography } from "@material-ui/core";

export default function Header() {
  return (
    <header
      style={{
        padding: 20,
        backgroundColor: "#2D3142",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">Watch First Think Later</Typography>
      <Typography variant="subtitle1">Film Reviews by Lucas Keller</Typography>
    </header>
  );
}
