import { Box, Flex } from "@radix-ui/themes";

import { ReactNode } from "react";

const CenteredBoxLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Box className="p-12 bg-zinc-900 rounded-lg mx-auto max-w-md">
        {children}
      </Box>
    </Flex>
  );
};

export default CenteredBoxLayout;
