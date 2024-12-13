import { ThoughtUpdateForm } from "@/ui-components";
import CreateQuote from "@/ui-components/CreateQuote";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const EditQuoteOverrides = {
  TextField29766922: {
    value: "hello world",
  },
};

export default function EditThought() {
  const params = useRouter();
  console.log("Parma", params.query);
  return (
    <>
      <ThoughtUpdateForm  />
    </>
  );
}
