interface HeaderProps {
    icon: string | React.ReactNode;
    onClick?: () => void;
    title?: string;
}

function HeaderButton({ icon, onClick, title }: HeaderProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-surface border border-border hover:bg-background transition-colors shadow-sm"
    >
      {typeof icon === "string" ? (
        <span className={`${icon} text-foreground text-xl`}></span>
      ) : (
        <span className="text-foreground text-xl">{icon}</span>
      )}
    </button>
  );
}

export default HeaderButton;