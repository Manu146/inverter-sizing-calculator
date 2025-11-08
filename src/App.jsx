import "./App.css";
import { TabProvider } from "./contexts/TabContext";
import Tab from "./components/tabs/Tab";
import { TabsContainer } from "./components/tabs/Tab";
import TabPanel from "./components/tabs/TabPanel";

const tabs = ["hola1", "hola2", "hola3"];

function App() {
  return (
    <div className="container mx-auto">
      <TabProvider>
        <TabsContainer>
          {tabs.map((tab, index) => (
            <Tab key={index} index={index}>
              {tab}asd
            </Tab>
          ))}
        </TabsContainer>
        <div>
          {tabs.map((tab, index) => (
            <TabPanel key={index} index={index}>
              {tab}
            </TabPanel>
          ))}
        </div>
      </TabProvider>
    </div>
  );
}

export default App;
