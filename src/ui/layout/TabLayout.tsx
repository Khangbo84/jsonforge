import { ReactNode } from "react";
import { DockId } from "./DockLayout";

export interface TabLayoutProps {
  panels: Record<DockId, { title: string; content: ReactNode }>;
}

export function TabLayout({ panels }: TabLayoutProps) {
  const [activeTab, setActiveTab] = (window as any).__mobileTabState || ["canvas", () => {}];

  const panelIds: DockId[] = ["toolbox", "hierarchy", "canvas", "properties", "textures", "bindings", "json"];

  return (
    <div className="jf-tab-layout">
      {/* Tab Navigation */}
      <div className="jf-tab-navigation">
        {panelIds.map((id) => (
          <button
            key={id}
            className={`jf-tab-btn ${activeTab === id ? "jf-tab-btn--active" : ""}`}
            onClick={() => {
              (window as any).__mobileTabState = [id, (window as any).__mobileTabState?.[1]];
              window.dispatchEvent(new CustomEvent("mobile-tab-change", { detail: id }));
            }}
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
          >
            {panels[id].content}
          </div>
        ))}
      </div>
    </div>
  );
}
