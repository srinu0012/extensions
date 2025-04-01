import NoteTakingTool from "./components/noteTakingTool/NoteTakingTool";
import ProductivityTracker from "./components/productivityTracker/ProductivityTracker";
import TabManager from "./components/tabManager/TabManager";

const App = () => {
  return (
    <>
      <ProductivityTracker />
      <TabManager />
      <NoteTakingTool />
    </>
  );
};

export default App;
