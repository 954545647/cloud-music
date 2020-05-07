import React from "react";
import { Redirect } from "react-router-dom";
import Home from "../components/Home";
import Recommend from "../components/Recommend";
import Singers from "../components/Singers";
import Rank from "../components/Rank";
import Album from "../components/Album";
import Singer from "../components/Singer";

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/recommend"} />
      },
      {
        path: "/recommend",
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            component: Album
          }
        ]
      },
      {
        path: "/singers",
        component: Singers,
        key: "singers",
        routes: [
          {
            path: "/singers/:id",
            component: Singer
          }
        ]
      },
      {
        path: "/rank",
        component: Rank,
        routes: [
          {
            path: "/rank/:id",
            component: Album
          }
        ]
      }
    ]
  }
];
