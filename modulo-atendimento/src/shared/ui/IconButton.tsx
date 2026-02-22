interface IconButtonProps {
    icon: string | React.ReactNode;
    onClick?: () => void;
    title?: string;
    disabled?: boolean;
    variant?: "default" | "ghost";
    size?: "sm" | "md" | "lg";
}

function IconButton({ 
    icon, 
    onClick, 
    title, 
    disabled = false,
    variant = "default",
    size = "md"
}: IconButtonProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-10 h-10 text-xl",
    lg: "w-12 h-12 text-2xl"
  };

  const variantClasses = {
    default: "bg-surface border border-border hover:bg-background hover:cursor-pointer",
    ghost: "bg-transparent hover:bg-surface"
  };

  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`flex items-center justify-center rounded-full transition-colors shadow-sm 
        disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} text-foreground`}
    >
      {typeof icon === "string" ? (
        <span className={icon}></span>
      ) : (
        <span>{icon}</span>
      )}
    </button>
  );
}

export default IconButton;