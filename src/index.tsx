import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Client, Provider, fetchExchange } from "urql";
import { cacheExchange, offlineExchange } from "@urql/exchange-graphcache";
import { makeDefaultStorage } from "@urql/exchange-graphcache/default-storage";

const storage = makeDefaultStorage({
  idbName: "lottie-files-cache", // The name of the IndexedDB database
  maxAge: 7, // The maximum age of the persisted data in days
});

const introspectedSchema = {
  __schema: {
    queryType: { name: "Query" },
    mutationType: { name: "Mutation" },
    subscriptionType: { name: "Subscription" },
  },
};

const offlineCache = offlineExchange({
  schema: introspectedSchema,
  storage,
  resolvers: {
    Query: {
      getAnimations: (_parent, _args, cache) => {
        const result: any = cache.resolve(
          { __typename: "Query" },
          "featuredPublicAnimations"
        );
        return result;
      },
    },
  },
  updates: {
    Mutation: {
      uploadAnimation(_result, args, _cache, _info) {
        return {
          __typename: "Animation",
          lottieFile: args.lottieFile,
          jsonFile: args.jsonFile,
        };
      },
    },
  },
});

const client = new Client({
  exchanges: [offlineCache, fetchExchange],
  url: "https://graphql.lottiefiles.com/2022-08",
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
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
