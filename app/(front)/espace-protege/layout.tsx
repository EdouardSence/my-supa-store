import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function EspaceProtegeLayout(
  props: LayoutProps<"/espace-protege">,
) {
  const session = await auth();

  if (!session?.user) {
    redirect("/connexion");
  }

  return props.children;
}
