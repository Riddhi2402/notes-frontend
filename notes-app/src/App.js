import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AllNotes from "./PageComponents/AllNotes/allNotes";
import CreateNote from "./PageComponents/CreateNote/createNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllNotes />,
  },
  {
    path: "/create-note",
    element: <CreateNote />,
  },
  {
    path: "/edit-note/:id",
    element: <CreateNote />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
