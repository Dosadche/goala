interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="border border-(--white) p-4 rounded-[20px] bg-(--card-bg)">
      {children}
    </div>
  );
}
