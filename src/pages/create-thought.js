import { ThoughtCreateForm } from "@/ui-components";


export default  function CreateThought() {

  return (
    <>
      {/* <CreateQuote
        overrides={{
          Button3966535: {
            display: "none",
          },
        }}
      /> */}
      <ThoughtCreateForm
        onSuccess={() => window.location.replace("/")}
      />
    </>
  );
}
