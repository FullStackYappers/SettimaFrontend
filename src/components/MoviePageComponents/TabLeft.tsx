import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface CrewMember {
  person: { name: string; id: number };
  department: { name: string };
}

interface CastMember {
  person: { name: string; id: number };
  character_name: string;
}

const TabLeft = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const { movieId } = useParams();
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [cast, setCast] = useState<CastMember[]>([]);

  useEffect(() => {
    const fetchCrew = async () => {
      console.log("api called");
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/${movieId}/crew`
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

    const fetchCast = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/${movieId}/cast`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCast(data);
      } catch (error: any) {
        console.error("Error fetching data:", error.message as Error);
      }
    };

    fetchCrew();
    fetchCast();
  }, [movieId]);

  const getCrewByDepartment = (department: string): JSX.Element[] => {
    const members = crew.filter(
      (member) => member.department.name === department
    );

    {
      /*using truthy and falsy js thing*/
    }
    return members.length > 0
      ? [
          <p>
            <span className="font-extrabold">{department}</span>:{" "}
            {members.map((member, index) => (
              <Link to={`/person/${member.person.id}`}>
                <span className="hover:text-accent2">
                  {member.person.name}
                  {index < members.length - 1 && ", "}
                  {/* */}
                </span>
              </Link>
            ))}
          </p>,
        ]
      : [
          <p>
            <strong>{department}</strong> N/A
          </p>,
        ];
  };

  const getCast = (): JSX.Element[] => {
    return cast.length > 0
      ? cast.map((member) => {
          return (
            <p>
              <span className="font-extrabold">{member.character_name}</span>:{" "}
              <Link to={`/person/${member.person.id}`}>
                <span className="hover:text-accent2">{member.person.name}</span>
              </Link>
            </p>
          );
        })
      : [<p>No cast information available</p>];
  };

  if (!cast || !crew) {
    return (
      <div id="preloader">
        <div className="image">
          <img src="/combWhite.svg" alt="preloader" />
        </div>
      </div>
    );
  }

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
          <div id="tab1" className="tab-content block mb-8">
            <div className="grid gap-4 px-4">{getCast()}</div>
          </div>
        )}
        {activeTab === "tab2" && (
          <div id="tab2" className="tab-content block mb-8">
            <div className="grid gap-4 px-4">
              {getCrewByDepartment("Director")}
              {getCrewByDepartment("Writer")}
              {getCrewByDepartment("Composer")}
              {getCrewByDepartment("Editor")}
              {getCrewByDepartment("Cinematographer")}
              {getCrewByDepartment("Costume Designer")}
            </div>
          </div>
        )}
        {activeTab === "tab3" && (
          <div id="tab3" className="tab-content block mb-8">
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
