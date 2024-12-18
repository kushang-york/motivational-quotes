"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { generateClient } from "aws-amplify/api";
import { updateThought } from "@/graphql/mutations";
import { CreateQuote } from "@/ui-components";

const client = generateClient();

export default function UpdateQuote() {
  const router = useRouter();
  const { id } = router.query; // Get the itemId from the URL query
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [createdBy, setCreatedBy] = useState(""); // Track createdBy user ID

  // Fetch the existing quote data when the component mounts or itemId is available
  useEffect(() => {
    if (id) {
      fetchQuote(id);
      fetchUserIdFromLocalStorage(); // Fetch the user ID on component mount
    }
  }, [id]);

  // Function to fetch the quote data from DynamoDB based on itemId
  const fetchQuote = async (id) => {
    try {
      const result = await client.graphql({
        query: `query GetThought($id: ID!) {
          getThought(id: $id) {
            id
            author
            text
            createdBy
          }
        }`,
        variables: { id },
      });

      const thought = result.data.getThought;
      setAuthor(thought.author);
      setText(thought.text);
      setCreatedBy(thought.createdBy); // Prepopulate createdBy field
    } catch (error) {
      console.log("Error fetching quote:", error);
    }
  };

  // Function to fetch the user ID from localStorage (same as CreateThought)
  const fetchUserIdFromLocalStorage = () => {
    try {
      // Find all keys that include 'CognitoIdentityServiceProvider'
      const cognitoKeys = Object.keys(localStorage).filter(key =>
        key.includes("CognitoIdentityServiceProvider")
      );

      if (cognitoKeys.length === 0) {
        console.error("No Cognito identity keys found in localStorage.");
        return;
      }

      // Try to find the key with 'LastAuthUser'
      let lastAuthUser = null;
      for (const key of cognitoKeys) {
        if (key.includes("LastAuth")) {
          const userKey = localStorage.getItem(key);
          lastAuthUser = userKey; // Found the LastAuthUser for the key
          break; // Exit loop once we find the first LastAuthUser
        }
      }

      if (!lastAuthUser) {
        console.error("No authenticated user found in localStorage.");
        return;
      }

      // Successfully retrieved the user ID
      setCreatedBy(lastAuthUser); // Use the user ID from localStorage
    } catch (error) {
      console.error("Error retrieving user ID from local storage:", error);
    }
  };

  // Function to update the quote
  const updateQuote = async () => {
    try {
      if (!createdBy) {
        console.error("User ID not set yet.");
        return; // Ensure createdBy is available before submitting
      }

      await client.graphql({
        query: updateThought,
        variables: { input: { id, text, author, createdBy } },
      });

      router.push("/"); // Redirect to homepage after successful update
    } catch (error) {
      console.log("Error updating thought:", error);
    }
  };

  return (
    <>
      <div className="model" style={{ display: "block" }}>
        <CreateQuote
          overrides={{
            TextField29766922: {
              onChange: (e) => setAuthor(e.target.value),
              value: author, // Prepopulate with the existing author
            },
            TextField29766923: {
              onChange: (e) => setText(e.target.value),
              value: text, // Prepopulate with the existing text
            },
            Button: {
              onClick: updateQuote,
              children: "Update",
            },
          }}
        />
      </div>
    </>
  );
}
