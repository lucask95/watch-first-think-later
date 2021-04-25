import { Avatar, Button, Link, Typography } from "@material-ui/core";
import appConstants from "../util/constants";
import AddIcon from "@material-ui/icons/Add";
import { useSession } from "next-auth/client";

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
    <header
      style={{
        padding: 20,
        backgroundColor: "#2D3142",
        color: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <div>
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
      </div>

      {/* Nav menu */}
      <div>
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
      </div>
    </header>
  );
}
