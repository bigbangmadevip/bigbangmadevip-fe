type SectionTitleProps = {
  children: React.ReactNode;
  action?: React.ReactNode;
};

export function SectionTitle({ children, action }: SectionTitleProps) {
  return (
    <div className="mb-[12px] flex items-baseline justify-between">
      <h2 className="text-title-17 font-bold text-secondary-1">{children}</h2>
      {action}
    </div>
  );
}
