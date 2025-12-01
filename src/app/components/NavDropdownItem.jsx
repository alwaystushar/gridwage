export default function NavDropdownItem({ children }) {
  return (
    <div
      className="cursor-pointer hover:bg-gray-100 rounded-md px-[1vw] py-[0.7vw] text-[1vw]"
      style={{ transition: "0.2s" }}
    >
      {children}
    </div>
  );
}
