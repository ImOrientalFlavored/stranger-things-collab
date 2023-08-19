/// <reference types="vite-plugin-svgr/client" />
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
//Routes
import Root, {loader as rootLoader} from "./routes/Root";
import ErrorPage from "./ErrorPage";
import Index from "./routes/Index";
import EditPost from "./routes/Edit";
import Post from "./routes/Post";
import SignInForm from "./routes/SignInForm";
import SignUpForm from "./routes/SignUpForm";
import PostForm from "./routes/PostForm";
import SearchPage from "./routes/SearchPage";
import { postLoader } from "./api/posts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      //action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route 
          index 
          element={<Index />}
          loader={postLoader}
        />
        <Route
          path="/search/*"
          element={<SearchPage />}
          loader={postLoader}
        />
        <Route
          path="/posts/:postId"
          element={<Post />}
          //loader={postLoader}
          //action={postAction}
        />
        <Route
          path="/posts/form"
          element={<PostForm />}
          //loader={postLoader}
          //action={postAction}
        />
        <Route
          path="posts/:postId/edit"
          element={<EditPost />}
          //loader={postLoader}
          //action={editAction}
        />
        <Route
          path="posts/:postId/destroy"
          //action={destroyAction}
        />
         <Route
          path="/sign-in"
          element={<SignInForm />}
        />
         <Route
          path="sign-up"
          element={<SignUpForm />}
        />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
