import { mode } from "@chakra-ui/theme-tools";

export const checkoutTheme = {
  cardBg: (props) => mode("white", "#020617")(props),
  pageBg: (props) => mode("#f8fafc", "#0f172a")(props),
  border: (props) => mode("#e2e8f0", "#1e293b")(props),
  heading: (props) => mode("gray.800", "gray.100")(props),
  subText: (props) => mode("gray.500", "gray.400")(props),
  shadow: (props) =>
    mode("0 10px 30px rgba(0,0,0,0.05)", "0 10px 30px rgba(0,0,0,0.4)")(props),
};
