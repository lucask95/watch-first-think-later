import { Box, Button, Typography } from "@material-ui/core";
import Layout from "../components/Layout";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();

  console.log("session:", session);

  return (
    <Layout titleAddition='Bite-sized film reviews'>
      <Box
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          padding: 20,
        }}
      >
        <Typography variant='h5'>Film Reviews</Typography>
        {!session ? (
          <div>
            Not signed in
            <br />
            <Button onClick={signIn} color='primary' variant='outlined'>
              Sign In
            </Button>
          </div>
        ) : (
          <div>
            Signed in!
            <br />
            <Button onClick={signOut} color='primary' variant='outlined'>
              Sign Out
            </Button>
          </div>
        )}
      </Box>
    </Layout>
  );
}
