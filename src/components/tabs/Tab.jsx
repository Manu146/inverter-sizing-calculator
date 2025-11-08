import {} from "react";
import { useTab } from "../../contexts/TabContext";

export default function Tab({ children, index, disabled = false }) {
  const { activeTab, setActiveTab } = useTab();
  return (
    <button
      disabled={disabled}
      onClick={() => setActiveTab(index)}
      className={`rounded-lg px-2 py-2 w-full text-zinc-200 font-semibold ${
        activeTab === index ? "bg-zinc-700" : "bg-zinc-900"
      }`}
    >
      {children}
    </button>
  );
}

export const TabsContainer = ({ children }) => {
  return (
    <div>
      <nav className="flex gap-4 p-3 rounded-lg bg-zinc-800">{children}</nav>
    </div>
  );
};
