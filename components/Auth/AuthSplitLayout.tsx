import Image from "next/image";

interface AuthSplitLayoutProps {
  children: React.ReactNode;
}

const AuthSplitLayout = ({ children }: AuthSplitLayoutProps) => {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="grid min-h-svh grid-cols-1 lg:grid-cols-[3fr_2fr]">
        <aside className="relative flex min-h-[14rem] items-center justify-center sm:min-h-[18rem] lg:min-h-svh">
          <div className="relative aspect-[16/10] w-full lg:absolute lg:inset-0 lg:aspect-auto">
            <Image
              src="/Admin-Dashboard-Light.png"
              alt="Admin dashboard analytics preview"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain object-center p-6 sm:p-8 lg:p-10 xl:p-12 dark:hidden"
            />
            <Image
              src="/Admin-Dashboard-Dark.png"
              alt="Admin dashboard analytics preview"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="hidden object-contain object-center p-6 sm:p-8 lg:p-10 xl:p-12 dark:block"
            />
          </div>
        </aside>

        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
          {children}
        </section>
      </div>
    </div>
  );
};

export default AuthSplitLayout;
