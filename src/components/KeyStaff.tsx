const KeyStaff = () => {
  return (
    <div className="specificCast flex flex-col justify-between gap-2">
      <div className="rounded-custom text-lg font-semibold bg-secondary w-full flex flex-col justify-center items-center p-4">
        <span className="block">Directed by:</span>
        <span className="block">Director</span>
      </div>
      <div className="rounded-custom text-lg font-semibold bg-secondary w-full flex flex-col justify-center items-center p-4">
        <span className="block">Cinematography by:</span>
        <span className="block">Cinematographer</span>
      </div>
      <div className="rounded-custom text-lg font-semibold bg-secondary w-full flex flex-col justify-center items-center p-4">
        <span className="block">Music by:</span>
        <span className="block">Composer</span>
      </div>
      <div className="rounded-custom text-lg font-semibold bg-secondary w-full flex flex-col justify-center items-center p-4">
        <span className="block">Costumes designed by:</span>
        <span className="block">Designer 1</span>
        <span className="block">Designer 2</span>
      </div>
    </div>
  );
};

export default KeyStaff;
