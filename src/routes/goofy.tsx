import { createFileRoute } from "@tanstack/react-router";
import { DogStoryPage } from "@/components/DogStoryPage";

const title = "Goofy the Golden Retriever — Paw Brothers";
const description =
  "Meet Goofy, the Golden Retriever known as The Heart and one half of the Paw Brothers in Pune.";

export const Route = createFileRoute("/goofy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/goofy" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/goofy" }],
  }),
  component: () => <DogStoryPage slug="goofy" />,
});
