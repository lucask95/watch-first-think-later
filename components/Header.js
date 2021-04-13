import { Link, Typography } from "@material-ui/core";
import appConstants from "../util/constants";

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
            <NavLink href='/reviews/0'>Reviews</NavLink>
            <NavLink href='/about/'>About</NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}
