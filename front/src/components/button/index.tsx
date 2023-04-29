interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "success" | "danger";
  variant?: "contained" | "outlined" | "text";
}
function Button({
  children,
  className,
  variant = "contained",
  color = "primary",
  ...props
}: Props) {
  const variants = {
    contained: `text-white bg-${color}`,
    outlined: `outline outline-1 outline-${color} text-${color}`,
    text: `text-${color}`,
  };
  return (
    <button
      {...props}
      className={`${variants[variant]} select-none px-2 py-1 hover:shadow-md hover:brightness-105  active:brightness-95 active:shadow-black/25 active:shadow-inner rounded-lg ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
