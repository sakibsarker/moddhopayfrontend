import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/Layout.tsx", [route("profile", "routes/profile.tsx")]),
  layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("signup", "./auth/signup.tsx"),
  ]),
] satisfies RouteConfig;
