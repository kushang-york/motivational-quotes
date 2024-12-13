"use client";
import { CreateQuote, HeroLayout1, ItemCardCollection } from "@/ui-components";
import { useState } from "react";
import { generateClient } from "aws-amplify/api";
import { updateThought } from "@/graphql/mutations";
import { useRouter } from "next/router";

const client = generateClient();
export default function Home() {
  const [itemId, setItemId] = useState(null);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  // console.log("editData", editData);
  console.log("author", author);
  console.log("text", text);
  const router = useRouter();
  const updateQuote = async () => {
    try {
      await client.graphql({
        query: updateThought,
        variables: { input: { id: itemId, text, author } },
      });

      setItemId(null);
      location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {itemId && (
        <div className="model" style={{ display: "" }}>
          <CreateQuote
            overrides={{
              TextField29766922: {
                onChange: (e) => setAuthor(e.target.value),
                value: author,
              },
              TextField29766923: {
                onChange: (e) => setText(e.target.value),
                value: text,
              },
              Button: {
                onClick: () => updateQuote(),
                children: "Update",
              },
            }}
          />
        </div>
      )}

      <HeroLayout1 width={"100%"} />
      <ItemCardCollection
        overrideItems={({ item, idx }) => {
          // console.log("item", item);
          return {
            overrides: {
              Button39547240: {
                as: "button",
                onClick: () => {
                  setAuthor(item.author);
                  setText(item.text);
                  setItemId(item.id);
                },
              },
            },
          };
        }}
      />
    </>
  );
}
