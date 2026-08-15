import Image from "next/image";

interface AuthSplitLayoutProps {
  children: React.ReactNode;
}

const AuthSplitLayout = ({ children }: AuthSplitLayoutProps) => {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="grid min-h-svh grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(32rem,1.2fr)]">
        <aside className="relative hidden min-h-svh items-center justify-center lg:flex">
          <div className="relative aspect-[16/10] w-full lg:absolute lg:inset-0 lg:aspect-auto">
            <Image
              src="/admin-dashboard-light.svg"
              alt="Light mode Admin Operations Platform preview showing orders, revenue, category distribution, and sales charts"
              title="Admin Operations Platform light theme"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-contain object-center p-4 sm:p-5 lg:p-6 xl:p-8 dark:hidden"
            />
            <Image
              src="/admin-dashboard-dark.svg"
              alt="Dark mode Admin Operations Platform preview showing orders, revenue, category distribution, and sales charts"
              title="Admin Operations Platform dark theme"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="hidden object-contain object-center p-4 sm:p-5 lg:p-6 xl:p-8 dark:block"
            />
          </div>
        </aside>

        <section className="flex min-h-svh items-center justify-center px-5 py-8 sm:px-8 lg:px-8 lg:py-10 xl:px-10">
          <div className="flex w-full max-w-[30rem] justify-center">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthSplitLayout;
