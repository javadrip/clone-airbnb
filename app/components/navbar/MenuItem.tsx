"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

// Using a function expression instead of a function declaration to keep syntax cleaner.
const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </div>
  );
};

export default MenuItem;
