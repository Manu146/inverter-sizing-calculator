import {} from "react";
import { useTab } from "../../contexts/TabContext";

export default function Tab({ children, index, disabled = false }) {
  const { activeTab, setActiveTab } = useTab();
  return (
    <button
      disabled={disabled}
      onClick={() => setActiveTab(index)}
      className={`rounded-lg px-2 py-2 w-full text-zinc-200 font-semibold ${
        activeTab === index ? "bg-coal-950" : "bg-coal-900"
      }`}
    >
      {children}
    </button>
  );
}

export const TabsContainer = ({ children }) => {
  return (
    <div>
      <nav className="flex gap-2 p-2 rounded-lg bg-coal-900 border border-coal-800">
        {children}
      </nav>
    </div>
  );
};
