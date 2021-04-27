import { Avatar, Button, Link, Typography } from "@material-ui/core";
import appConstants from "../util/constants";
import AddIcon from "@material-ui/icons/Add";
import { useSession } from "next-auth/client";
import { Box, Flex } from "@chakra-ui/layout";

function NavLink({ href, children }) {
  return (
    <li style={{ display: "inline", margin: 15 }}>
      <Link href={href} style={{ color: "white" }}>
        {children}
      </Link>
    </li>
  );
}

export default function Header() {
  const [session, loading] = useSession();

  return (
    <Flex
      bgColor='#2D3142'
      color='white'
      p='20px'
      direction={{ base: "column", lg: "row" }}
      justify={{ base: "center", lg: "space-between" }}
      align='center'
    >
      {/* Logo */}
      <Flex
        px='20px'
        direction='column'
        align={{ base: "center", lg: "flex-start" }}
        textAlign={{ base: "center", lg: "left" }}
      >
        <Typography
          variant='h3'
          style={{
            fontFamily: "'Merriweather', serif",
            fontWeight: 900,
            fontStyle: "italic",
          }}
        >
          Watch First Think Later
        </Typography>
        <Typography variant='subtitle1'>Bite-sized film reviews</Typography>
      </Flex>

      {/* Nav menu */}
      <Box mt={{ base: "20px", lg: "0" }}>
        <nav>
          <ul>
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/reviews/1'>Reviews</NavLink>
            <NavLink href='/about/'>About</NavLink>
            <NavLink href={session ? "/reviews/new" : "/api/auth/signin"}>
              {session ? (
                <Button
                  variant='contained'
                  startIcon={<AddIcon />}
                  style={{
                    backgroundColor: appConstants.accentColor,
                    color: "white",
                  }}
                >
                  Add A Review
                </Button>
              ) : (
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: appConstants.accentColor,
                    color: "white",
                  }}
                >
                  Sign In
                </Button>
              )}
            </NavLink>
            {/* <NavLink
              href={
                session
                  ? `/profile/${session.user.username}`
                  : "/api/auth/signin"
              }
            >
              {session ? (
                <Avatar
                  alt={session.user.username}
                  style={{ display: "inline-flex" }}
                />
              ) : (
                <Avatar alt='?' />
              )}
            </NavLink> */}
          </ul>
        </nav>
      </Box>
    </Flex>
  );
}
