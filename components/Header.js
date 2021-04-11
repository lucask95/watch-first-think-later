import { Typography } from "@material-ui/core";
import styled from "styled-components";

const HeaderArea = styled.header`
  padding: 20px;
  background-color: #181d27;
  color: white;
  text-align: center;
`;

export default function Header() {
  return (
    <HeaderArea>
      <Typography variant="h4">Watch First Think Later</Typography>
      <Typography variant="caption">Film Reviews by Lucas Keller</Typography>
    </HeaderArea>
  );
}
