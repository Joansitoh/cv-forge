const Education = ({ education }) => {
  const getFormattedDate = (dat) => {
    if (!dat) return "Non specified";
    const date = new Date(dat);
    return date.toLocaleDateString("es-ES", {
      month: "numeric",
      year: "numeric",
    });
  };

  return (
    <tr>
      <td className="justify-start flex flex-col text-xs text-gray-500 text-wrap w-24">
        <p>{getFormattedDate(education.startDate)}</p> -{" "}
        {getFormattedDate(education.endDate)}
      </td>
      <td>
        <div className="mb-4 space-y-2">
          <p className="text-xs text-gray-600 italic">{education.name}</p>
        </div>
      </td>
    </tr>
  );
};

export default Education;
