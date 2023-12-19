interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  type?: "success" | "warning" | "danger";
}

export function Button({ label, type, ...props }: Props) {
  const typeStyle = !type
    ? "text-white bg-zinc-600"
    : type === "success"
    ? "text-white bg-green-600"
    : type === "warning"
    ? "text-black bg-yellow-600"
    : "text-white bg-red-600";

  return (
    <button {...props} className={`rounded-lg px-4 py-2 font-bold ${typeStyle}`}>
      {label}
    </button>
  );
}
