import { useState, useCallback, useMemo, useEffect } from "react";
import { ReactNode } from "react";
import { DockId } from "./DockLayout";

export interface TabLayoutProps {
  panels: Record<DockId, { title: string; content: ReactNode }>;
}

export function TabLayout({ panels }: TabLayoutProps) {
  const [activeTab, setActiveTab] = useState<DockId>("canvas");

  const panelIds: DockId[] = useMemo(
    () => ["toolbox", "hierarchy", "canvas", "properties", "textures", "bindings", "json"],
    []
  );

  const handleTabChange = useCallback((tabId: DockId) => {
    setActiveTab(tabId);
  }, []);

  return (
    <div className="jf-tab-layout">
      {/* Tab Navigation */}
      <div className="jf-tab-navigation">
        {panelIds.map((id) => (
          <button
            key={id}
            className={`jf-tab-btn ${activeTab === id ? "jf-tab-btn--active" : ""}`}
            onClick={() => handleTabChange(id)}
            aria-selected={activeTab === id}
          >
            {panels[id].title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="jf-tab-content">
        {panelIds.map((id) => (
          <div
            key={id}
            className={`jf-tab-pane ${activeTab === id ? "jf-tab-pane--active" : ""}`}
            role="tabpanel"
            aria-hidden={activeTab !== id}
          >
            {panels[id].content}
          </div>
        ))}
      </div>
    </div>
  );
}
