import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface CrewMember {
  person: { name: string; id: number };
  department: { name: string };
}

const KeyStaff = () => {
  const { movieId } = useParams();
  const [crew, setCrew] = useState<CrewMember[]>([]);

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

    fetchCrew();
  }, [movieId]);

  const getCrewByDepartment = (department: string): JSX.Element[] => {
    const members = crew
      .filter((member) => member.department.name === department)
      .map((member) => member.person);

    if (members.length === 0) {
      return [<span className="block">N/A</span>];
    }

    //each name in a new line
    return members.map((person) => (
      <Link to={`/person/${person.id}`}>
        <span className="block hover:text-accent2">{person.name}</span>
      </Link>
    ));
  };

  console.log(crew);

  return (
    <div className="specificCast text-lg font-semibold flex flex-col justify-between gap-4">
      <div className="rounded-custom bg-secondary w-full flex flex-col flex-1 justify-center items-center">
        <span className="block">Directed by:</span>
        {getCrewByDepartment("Director")}
      </div>
      <div className="rounded-custom bg-secondary w-full flex flex-col flex-1 justify-center items-center">
        <span className="block">Cinematography by:</span>
        {getCrewByDepartment("Cinematographer")}
      </div>
      <div className="rounded-custom bg-secondary w-full flex flex-col flex-1 justify-center items-center">
        <span className="block">Music by:</span>
        {getCrewByDepartment("Composer")}
      </div>
      <div className="rounded-custom bg-secondary w-full flex flex-col flex-1 justify-center items-center">
        <span className="block">Costumes designed by:</span>
        {getCrewByDepartment("Costume Designer")}
      </div>
    </div>
  );
};

export default KeyStaff;
