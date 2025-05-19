import FeatureSection from "@/components/landing/FeatureSection";
import Hero from "@/components/landing/Hero";
import ThemeToggle from "@/components/system/ThemeToggle";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Hero />
      <FeatureSection />
    </main>
  );
}
