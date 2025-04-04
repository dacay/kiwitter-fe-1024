import Header from "../../components/Header";

export default function PageLayout({ children, className }) {
  return (
    <div className="relative">
      <Header />
      <div className="pt-6 pb-12">
        <main className={`container mx-auto bg-white min-h-96 rounded-xl shadow-xl p-6 ${className}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
