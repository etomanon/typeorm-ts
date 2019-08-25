import React from "react";

import { Flex } from "@rebass/grid";
import { Text } from "../../components/text/Text";

interface DownloadPathProps {
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  onSelectPath: (i: number) => void;
}

export const DownloadPath: React.FC<DownloadPathProps> = ({
  path,
  setPath,
  onSelectPath
}) => {
  return (
    <Flex
      mt={2}
      mb={2}
      width={1}
      justifyContent="center"
      mx={1}
      flexWrap="wrap"
    >
      <Text
        pointer
        mr={1}
        onClick={() => setPath("")}
        fontWeight={path === "" ? 500 : 400}
      >
        Home
      </Text>
      {path !== "" &&
        path.split("/").map((p, i, arr) => (
          <Text
            pointer
            mr={1}
            key={p}
            onClick={() => onSelectPath(i)}
            fontWeight={i + 1 === arr.length ? 500 : 400}
          >
            / {p}
          </Text>
        ))}
    </Flex>
  );
};
