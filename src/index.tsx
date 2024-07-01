import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Client, Provider, fetchExchange } from "urql";
import { offlineExchange } from "@urql/exchange-graphcache";
import { makeDefaultStorage } from "@urql/exchange-graphcache/default-storage";

const storage = makeDefaultStorage({
  idbName: "lottie-files-cache", // The name of the IndexedDB database
  maxAge: 7, // The maximum age of the persisted data in days
});

const introspectedSchema = {
  __schema: {
    queryType: { name: "Query" },
    mutationType: { name: "Mutation" },
  },
};

const offlineCache = offlineExchange({
  schema: introspectedSchema,
  updates: {
    Mutation: {
      uploadAnimation: (result, _args, cache, _info) => {
        // Update the cache manually here
        const AnimationList = /* GraphQL */ `
          query getAnimation($filter: String) {
            getAnimation(filter: $filter) {
              id
              name
              createdAt
              content {
                filename
                filetype
                content
                metadata
              }
            }
          }
        `;
        cache
          .inspectFields("Query")
          .filter((field) => field.fieldName === "getAnimation")
          .forEach((field) => {
            cache.updateQuery(
              {
                query: AnimationList,
                variables: { filter: field?.arguments?.filter || "" },
              },
              (data: any) => {
                // console.log(data.getAnimation);
                if (
                  !data ||
                  !(data && data.getAnimation && data.getAnimation.length)
                )
                  return { getAnimation: [result] };
                return data;
              }
            );
          });
      },
    },
  },
  storage,
});

const client = new Client({
  exchanges: [offlineCache, fetchExchange],
  url: process.env.REACT_APP_GRAPHQL_URL || "http://localhost:4000/graphql",
  fetchOptions: {
    headers: {
      "X-Custom-Header": "Allowed",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
