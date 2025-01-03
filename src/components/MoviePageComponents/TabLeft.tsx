import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface CrewMember {
  person: { name: string };
  department: { name: string };
}

const TabLeft = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const { movieId } = useParams();
  const [crew, setCrew] = useState<CrewMember[]>([]);

  useEffect(() => {
    const fetchCrew = async () => {
      console.log("api called");
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/${movieId}}/crew`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCrew(data);
      } catch (error: any) {
        console.error("Error fetching data:", error.message as Error);
      }
    };

    fetchCrew();
  }, [movieId]);

  const getCrewByDepartment = (department: string): JSX.Element[] => {
    const members = crew
      .filter((member) => member.department.name === department)
      .map((member) => member.person.name);

    {
      /*using truthy and falsy js thing*/
    }
    return members.length > 0
      ? [
          <p>
            <strong>{department}</strong>:{" "}
            {members.map((name, index) => (
              <span className="hover:text-accent2">
                {name}
                {index < members.length - 1 && ", "}
                {/* */}
              </span>
            ))}
          </p>,
        ]
      : [
          <p>
            <strong>{department}</strong> N/A
          </p>,
        ];
  };

  return (
    <div className="tab-section-left overflow-visible bg-secondary rounded-custom w-full">
      <div className="flex flex-wrap gap-1  text-lg font-semibold">
        <button
          className={`mt-3 p-2 rounded-custom flex-grow hover:text-accent2 ${
            activeTab === "tab1" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Cast
        </button>
        <button
          className={`mt-3 p-2 rounded-custom flex-grow hover:text-accent2 ${
            activeTab === "tab2" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Crew
        </button>
        <button
          className={`mt-3 p-2 rounded-custom flex-grow hover:text-accent2 ${
            activeTab === "tab3" ? "text-accent2" : ""
          }`}
          onClick={() => setActiveTab("tab3")}
        >
          Details
        </button>
      </div>

      <div className="mt-4 font-semibold">
        {activeTab === "tab1" && (
          <div id="tab1" className="tab-content block mb-4 grid gap-4">
            <p>Actor 1</p>
            <p>Actor 2</p>
            <p>Actor 3</p>
          </div>
        )}
        {activeTab === "tab2" && (
          <div id="tab2" className="tab-content block mb-4 grid gap-4">
            <p>{getCrewByDepartment("Director")}</p>
            <p>{getCrewByDepartment("Writer")}</p>
            <p>{getCrewByDepartment("Composer")}</p>
            <p>{getCrewByDepartment("Editor")}</p>
            <p>{getCrewByDepartment("Cinematographer")}</p>
            <p>{getCrewByDepartment("Costume Designer")}</p>
          </div>
        )}
        {activeTab === "tab3" && (
          <div id="tab3" className="tab-content block mb-4 grid gap-4">
            <p>Location</p>
            <p>Release Date</p>
            <p>Language</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabLeft;
