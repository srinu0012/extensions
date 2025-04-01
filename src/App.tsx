import NoteTakingTool from "./components/noteTakingTool/NoteTakingTool";
import ProductivityTracker from "./components/productivityTracker/ProductivityTracker";
import TabManager from "./components/tabManager/TabManager";
import "./App.css";

const App = () => {
  return (
    <>
      <TabManager />
      <NoteTakingTool />
      <ProductivityTracker />
    </>
  );
};

export default App;
