"use client";
import { HeroLayout1, ItemCardCollection } from "@/ui-components";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const redirectToUpdateForm = (itemId) => {
    router.push(`/update?id=${itemId}`);
  };

  return (
    <>
      <HeroLayout1 width={"100%"} />
      <ItemCardCollection
        overrideItems={({ item, idx }) => {
          return {
            overrides: {
              Button39547240: {
                as: "button",
                onClick: () => redirectToUpdateForm(item.id),
              },
            },
          };
        }}
      />
    </>
  );
}
