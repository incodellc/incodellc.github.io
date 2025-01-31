import classNames from "classnames";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function SubmitButton({ children, className, ...props }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={classNames(
        "w-full h-11 text-lg uppercase font-semibold bg-green-400 text-white rounded-md transition-colors duration-200 hover:bg-green-500 disabled:opacity-70 disabled:pointer-events-none",
        className
      )}
      {...props}>
      {children}
    </button>
  );
}
