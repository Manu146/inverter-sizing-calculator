import "./App.css";
import { TabProvider } from "./contexts/TabContext";
import Tab from "./components/tabs/Tab";
import { TabsContainer } from "./components/tabs/Tab";
import TabPanel from "./components/tabs/TabPanel";

const tabs = [
  { title: "Tab 1", component: "COMPONENT 1" },
  { title: "Tab 2", component: "COMPONENT 2" },
  { title: "Tab 3", component: "COMPONENT 3" },
];

function App() {
  return (
    <div className="container mx-auto">
      <TabProvider>
        <TabsContainer>
          {tabs.map((tab, index) => (
            <Tab key={index} index={index}>
              {tab.title}
            </Tab>
          ))}
        </TabsContainer>
        <div>
          {tabs.map((tab, index) => (
            <TabPanel key={index} index={index}>
              {tab.component}
            </TabPanel>
          ))}
        </div>
      </TabProvider>
    </div>
  );
}

export default App;
