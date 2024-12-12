const KeyStaff = () => {
  return (
    <div className="specificCast text-lg font-semibold flex flex-col justify-between gap-4">
      <div className="rounded-custom bg-secondary w-full flex flex-col flex-1 justify-center items-center">
        <span className="block">Directed by:</span>
        <span className="block">Director</span>
      </div>
      <div className="rounded-custom bg-secondary w-full flex flex-col flex-1 justify-center items-center">
        <span className="block">Cinematography by:</span>
        <span className="block">Cinematographer</span>
      </div>
      <div className="rounded-custom bg-secondary w-full flex flex-col flex-1 justify-center items-center">
        <span className="block">Music by:</span>
        <span className="block">Composer</span>
      </div>
      <div className="rounded-custom bg-secondary w-full flex flex-col flex-1 justify-center items-center">
        <span className="block">Costumes designed by:</span>
        <span className="block">Designer 1</span>
        <span className="block">Designer 2</span>
      </div>
    </div>
  );
};

export default KeyStaff;
