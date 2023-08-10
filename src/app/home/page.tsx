import Home from "../page";

export default async function AuthenticatedHome() {
  return <Home authRedirect={false} />;
}
