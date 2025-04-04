import Searchbar from '@/app/(with-searchbar)/searchbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
