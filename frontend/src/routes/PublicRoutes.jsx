import { lazy } from "react";
import Layout from "../layouts/Layout";
import Loadable from "../commoncomponents/Loadable/Loadable";


const Error404 = Loadable(lazy(() => import("../commoncomponents/NotFound/Error404")));
const AboutUs = Loadable(lazy(() => import("../pages/AboutUs")));
const ContactUs = Loadable(lazy(() => import("../pages/ContactUs")));
const Aqua = Loadable(lazy(() => import("../pages/Aqua")));
const Landing = Loadable(lazy(() => import("../pages/Landing")));
const Bowness = Loadable(lazy(() => import("../pages/Bowness")));
const Skyview = Loadable(lazy(() => import("../pages/Skyview")));
const Killarney = Loadable(lazy(() => import("../pages/Killarney")));
const Daisy = Loadable(lazy(() => import("../pages/Daisy")));
const Bruno = Loadable(lazy(() => import("../pages/Bruno")));
const ContemporaryDaisy = Loadable(lazy(() => import("../pages/ContemporaryDaisy")));
const Charm = Loadable(lazy(() => import("../pages/Charm")));
const Projects = Loadable(lazy(() => import("../pages/Projects")));
const Blog = Loadable(lazy(() => import("../pages/Blog")));
const WaterfordEstates = Loadable(lazy(() => import("../pages/WaterfordEstates")));
const RequestAvisit = Loadable(lazy(() => import("../pages/RequestAvisit")));
const Career = Loadable(lazy(() => import("../pages/Career")));


const PublicRoutes = { 
    path: "/",
    element: <Layout />,
    children: [  
      {
        path: "/",
        element: <Landing />,
      },
      { 
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "aqua",
        element: <Aqua />,
      },
      {
        path: "bowness",
        element: <Bowness />,  
      },
      {
        path: "skyview", 
        // element: <Skyview />,
        element: <Error404 />,
      },
      {
        path: "killarney",
        // element: <Killarney />,
        element: <Error404 />,
      },
      {
        path: "daisy",
        // element: <Daisy />,
        element: <Error404 />,
      },
      {
        path: "bruno",
        // element: <Bruno />,
        element: <Error404 />,

      },
      {
        path: "contemporaryDaisy",
        // element: <ContemporaryDaisy />,
        element: <Error404 />,
      },
      {
        path: "charm",
        // element: <Charm />,
        element: <Error404 />,
      },
      {
        path: "projects",
        element: <Projects />,
        // element: <Error404 />,
      },
      {
        path: "blog",
        element: <Blog />,
        // element: <Error404 />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
      {
        path: "waterfordEstates", 
        element: <WaterfordEstates />,
      },
      {
        path: "RequestAvisit", 
        element: <RequestAvisit />,
      },
      {
        path: "careers",  
        element: <Career />,
      },
    ],
}; 
  
export default PublicRoutes;
  