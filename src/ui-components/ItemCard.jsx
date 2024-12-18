/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps, useNavigateAction } from "./utils";
import { generateClient } from "aws-amplify/api";
import { deleteThought } from "../graphql/mutations";
import { Button, Flex, Text } from "@aws-amplify/ui-react";
const client = generateClient();
export default function ItemCard(props) {
  const { thought, overrides, ...rest } = props;
  const buttonThreeNineFiveFourSevenTwoFourZeroOnClick = useNavigateAction({
    type: "url",
    url: `${"/edit/"}${thought?.id}`,
  });
  const buttonThreeNineFiveFourSevenTwoFourOneOnClick = async () => {
    await client.graphql({
      query: deleteThought.replaceAll("__typename", ""),
      variables: {
        input: {
          id: thought?.id,
        },
      },
    });
  };
  return (
    <Flex
      gap="16px"
      direction="column"
      width="320px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="16px 16px 16px 16px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "ItemCard")}
      {...rest}
    >
      <Flex
        gap="0"
        direction="row"
        width="191px"
        height="unset"
        justifyContent="space-between"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 417")}
      >
        <Flex
          gap="0"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Product Title")}
        >
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="700"
            color="rgba(13,26,38,1)"
            lineHeight="20px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children={thought?.text}
            {...getOverrideProps(overrides, "T-Shirt")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="400"
            color="rgba(48,64,80,1)"
            lineHeight="24px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            letterSpacing="0.01px"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children={thought?.author}
            {...getOverrideProps(overrides, "Classic Long Sleeve")}
          ></Text>
        </Flex>
      </Flex>
      <Flex
        gap="10px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 437")}
      >
        <Button
          width="71px"
          height="33px"
          shrink="0"
          size="small"
          isDisabled={false}
          variation="primary"
          children="Edit"
          onClick={() => {
            buttonThreeNineFiveFourSevenTwoFourZeroOnClick();
          }}
          {...getOverrideProps(overrides, "Button39547240")}
        ></Button>
      </Flex>
      <Flex
        gap="10px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 438")}
      >
        <Button
          width="71px"
          height="33px"
          justifyContent="space-between"
          shrink="0"
          size="small"
          isDisabled={false}
          variation="destructive"
          children="Delete"
          onClick={() => {
            buttonThreeNineFiveFourSevenTwoFourOneOnClick();
          }}
          {...getOverrideProps(overrides, "Button39547241")}
        ></Button>
      </Flex>
    </Flex>
  );
}
