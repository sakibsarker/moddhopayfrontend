import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/layout.tsx", [
    route("profile", "routes/profile.tsx"),
    route("wallet", "routes/wallet.tsx"),
    route("wallet/transfer", "routes/transfer.tsx"),
  ]),
  layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("signup", "./auth/signup.tsx"),
  ]),
] satisfies RouteConfig;
