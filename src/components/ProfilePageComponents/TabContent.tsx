import { useState } from "react";
import Personalized from "./Personalized";
import ActivityTable from "./ActivityTable";

const TabContent = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");

  return (
    <div className="tab-section-left overflow-visible rounded-custom w-full">
      <div className="flex justify-between gap-1 font-semibold">
        <button
          className={`rounded-custom hover:text-accent2 text-2xl ${
            activeTab === "tab1" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Overview
        </button>
        <button
          className={`rounded-custom hover:text-accent2 ${
            activeTab === "tab2" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Movie List
        </button>
        <button
          className={`rounded-custom hover:text-accent2 ${
            activeTab === "tab3" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab3")}
        >
          Favorites
        </button>
        <button
          className={`rounded-custom hover:text-accent2 ${
            activeTab === "tab4" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab4")}
        >
          Social
        </button>
        <button
          className={`rounded-custom hover:text-accent2 ${
            activeTab === "tab5" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab5")}
        >
          Reviews
        </button>
      </div>

      <div className="mt-4 text-2xl">
        {activeTab === "tab1" && (
          <div id="tab1" className="tab-content block mb-4">
            <Personalized />
            <div className="activity mt-4 text-xl">
              <ActivityTable />
            </div>
          </div>
        )}
        {activeTab === "tab2" && (
          <div id="tab2" className="tab-content block mb-4">
            Stuff will come / tba
          </div>
        )}
        {activeTab === "tab3" && (
          <div id="tab3" className="tab-content block mb-4">
            Stuff will come / tba
          </div>
        )}
        {activeTab === "tab4" && (
          <div id="tab4" className="tab-content block mb-4">
            Stuff will come / tba
          </div>
        )}
        {activeTab === "tab5" && (
          <div id="tab5" className="tab-content block mb-4">
            Stuff will come / tba
          </div>
        )}
      </div>
    </div>
  );
};

export default TabContent;
