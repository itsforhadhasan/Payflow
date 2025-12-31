import Link from 'next/link';
import { ArrowRight, Wallet, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-10 glass border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            PayFlow.
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="#business" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Business</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/auth/register" className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-24 pb-12">
        <section className="container mx-auto px-6 py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6">
            The Future of <br className="hidden md:block" />
            <span className="text-gradient">Digital Payments</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10">
            Send money, pay bills, and manage your business finances with the most secure and intuitive mobile wallet platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/auth/register" className="px-8 py-4 rounded-full bg-primary text-primary-foreground text-lg font-bold hover:bg-primary/90 transition-all shadow-xl hover:shadow-primary/40 flex items-center gap-2">
              Create Free Account <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="px-8 py-4 rounded-full bg-secondary text-secondary-foreground text-lg font-bold hover:bg-secondary/80 transition-all">
              Learn More
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Wallet className="w-10 h-10 text-blue-500" />}
              title="Global Transfers"
              description="Send money to anyone, anywhere, instantly with zero hidden fees."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-10 h-10 text-purple-500" />}
              title="Bank-Grade Security"
              description="Your funds are protected by end-to-end encryption and fraud detection."
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10 text-yellow-500" />}
              title="Instant Cashout"
              description="Access your money anytime through our nationwide agent network."
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2024 PayFlow MFS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="mb-4 p-3 bg-accent rounded-xl w-fit">{icon}</div>
      <h3 className="text-xl font-bold font-heading mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
