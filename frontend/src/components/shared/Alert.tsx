"use client";

type Props = {
  variant: "error" | "success";
  children: React.ReactNode;
  role?: "alert";
};

export default function Alert({ variant, children, role = "alert" }: Props) {
  const classes =
    variant === "error"
      ? "rounded-md bg-red-50 p-3 text-sm text-red-800"
      : "rounded-md bg-green-50 p-3 text-sm text-green-800";
  return (
    <div className={classes} role={role}>
      {children}
    </div>
  );
}
