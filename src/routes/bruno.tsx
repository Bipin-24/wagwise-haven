import { createFileRoute } from "@tanstack/react-router";
import { DogStoryPage } from "@/components/DogStoryPage";

const title = "Bruno the German Shepherd — Paw Brothers";
const description =
  "Meet Bruno, the German Shepherd known as The Protector and one half of the Paw Brothers in Pune.";

export const Route = createFileRoute("/bruno")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/bruno" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/bruno" }],
  }),
  component: () => <DogStoryPage slug="bruno" />,
});
