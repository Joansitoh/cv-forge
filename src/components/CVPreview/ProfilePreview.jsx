const ProfilePreview = ({ mail, phone, website }) => {
  return (
    <ul className="px-6 space-y-2 flex-wrap text-sm">
      {mail && (
        <li>
          <span className="font-bold">Email</span>
          <br />
          {mail}
        </li>
      )}
      {phone && (
        <li>
          <span className="font-bold">Teléfono</span>
          <br />
          {phone}
        </li>
      )}
      {website && (
        <li>
          <span className="font-bold">Página web</span>
          <br />
          {website}
        </li>
      )}
    </ul>
  );
};

export default ProfilePreview;
