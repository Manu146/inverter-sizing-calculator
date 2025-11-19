import "./App.css";
import { TabProvider } from "./contexts/TabContext";
import Tab from "./components/tabs/Tab";
import { TabsContainer } from "./components/tabs/Tab";
import TabPanel from "./components/tabs/TabPanel";
import LoadsTab from "./components/pages/LoadsTab";

const tabs = [
  { title: "Tab 1", component: LoadsTab },
  { title: "Tab 2", component: () => <div></div> },
  { title: "Tab 3", component: () => <div></div> },
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
        <div className="">
          {tabs.map((tab, index) => (
            <TabPanel key={index} index={index}>
              <tab.component key={index} />
            </TabPanel>
          ))}
        </div>
      </TabProvider>
    </div>
  );
}

export default App;
