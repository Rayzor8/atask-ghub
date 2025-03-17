interface ErrorAlertProps {
  children: React.ReactNode;
}

export default function ErrorAlert({ children }: ErrorAlertProps) {
  return <p className="mt-2 text-red-500 text-sm">{children}</p>;
}
