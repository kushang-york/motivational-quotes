import { useEffect, useState } from "react";
import { ThoughtCreateForm } from "@/ui-components";

export default function CreateThought() {
  const [createdBy, setCreatedBy] = useState("");

  useEffect(() => {
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
            console.log(key);
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
        setCreatedBy(lastAuthUser);
        console.log("User ID from localStorage: ", lastAuthUser);
      } catch (error) {
        console.error("Error retrieving user ID from local storage:", error);
      }
    };

    fetchUserIdFromLocalStorage();
  }, []);

  const handleFormSubmit = (fields) => {
    if (!createdBy) {
      console.error("User ID not set yet.");
      return fields; // Fallback to avoid submitting null
    }

    const modifiedFields = { ...fields, createdBy };
    console.log("Form Submitted with: ", modifiedFields);
    return modifiedFields;
  };

  return (
    <>
      <ThoughtCreateForm
        // Override the 'createdBy' field to make it invisible and not part of the form
        overrides={{
          createdBy: {
            style: { display: "none" },  // Hide the 'createdBy' field in UI
          },
        }}
        onSubmit={handleFormSubmit}
        onSuccess={() => window.location.replace("/")}
      />
    </>
  );
}
