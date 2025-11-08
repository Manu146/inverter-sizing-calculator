import { useTab } from "../../contexts/TabContext";

export default function TabPanel({ children, index }) {
  const { activeTab } = useTab();
  return activeTab === index ? <div>{children}</div> : null;
}
