interface PublicLayoutProps {
  center: React.ReactNode;
}

export default function PublicLayout({ center }: PublicLayoutProps) {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      {center}
    </div>
  );
}
