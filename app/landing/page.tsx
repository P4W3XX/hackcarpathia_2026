import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  TrendingUp,
  Calculator,
  FileSearch,
  FileText,
  MessageSquare,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
const features = [
  {
    icon: Briefcase,
    title: "Pierwsza praca",
    description:
      "Szukaj ogłoszeń idealnych na start: dorywczo, weekendowo albo po szkole.",
  },
  {
    icon: Calculator,
    title: "Kalkulator wypłaty",
    description:
      "Sprawdź, ile realnie zostanie Ci na koncie po podatkach i składkach.",
  },
  {
    icon: TrendingUp,
    title: "Plan dorastania",
    description:
      "Krok po kroku buduj kierunek: szkoła, umiejętności, pierwsze cele zawodowe.",
  },
  {
    icon: FileSearch,
    title: "Audyt umowy",
    description:
      "Zanim podpiszesz, sprawdź czy w umowie nie ma pułapek dla początkujących.",
  },
  {
    icon: FileText,
    title: "CV na start",
    description: "Stwórz CV, nawet jeśli masz mało doświadczenia i dopiero zaczynasz.",
  },
  {
    icon: MessageSquare,
    title: "Trening rozmowy",
    description:
      "Przećwicz stresującą rozmowę o pracę i zyskaj większą pewność siebie.",
  },
];

const highlights = [
  {
    icon: Zap,
    title: "Po ludzku",
    description: "Prosto i bez spiny: narzędzia stworzone dla nastolatków.",
  },
  {
    icon: ShieldCheck,
    title: "Bez presji",
    description:
      "Uczysz się i testujesz decyzje we własnym tempie, bez oceniania.",
  },
  {
    icon: Sparkles,
    title: "Mądrzej",
    description:
      "AI pomaga ogarnąć pierwsze dorosłe decyzje szybciej i spokojniej.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md text-primary-foreground">
              <Image src="/adultify.png" alt="Logo" className="size-6" width={100} height={100} />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Adultify
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground transition-colors">
              Funkcje
            </a>
            <a href="#how" className="hover:text-foreground transition-colors">
              Jak działa
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Zaloguj się</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">
                Zacznij za darmo
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 text-center">
        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-accent/60 px-3 py-1 text-xs font-medium text-foreground/80">
          <Sparkles className="size-3.5 text-primary" />
          Platforma na czas dorastania
        </span>

        <h1 className="mx-auto max-w-3xl text-balance text-5xl font-bold tracking-tight md:text-6xl">
          Ogarnij dorastanie spokojnie{" "}
          <span className="text-primary">i wejdź pewniej w dorosłość</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          Jedno miejsce na najważniejsze &quot;pierwsze razy&quot;: pierwsza praca,
          pierwsza wypłata, pierwsze CV i pierwsze decyzje, które naprawdę mają
          znaczenie.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/register">
              Zacznij swoją drogę
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login">Mam już konto</Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-primary" />
            Bez karty i bez opłat
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-primary" />
            Start w mniej niż minutę
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-primary" />
            Wsparcie AI na każdym kroku
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="border-y border-border bg-accent/30">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px bg-border md:grid-cols-3">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.title}
                className="flex items-start gap-4 bg-background p-6"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{h.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {h.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight">
            Wszystko, czego potrzebujesz na start
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Sześć narzędzi, które pomagają przejść przez czas dorastania z
            większym spokojem i planem.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="transition-colors hover:border-primary/40"
              >
                <CardHeader>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border bg-accent/30">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-bold tracking-tight">
              Jak to działa
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Trzy kroki, żeby łatwiej wejść w dorosłość i pierwsze obowiązki.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Załóż konto",
                description:
                  "Szybki start bez formalności. Bez karty i bez stresu.",
              },
              {
                step: "02",
                title: "Powiedz, na jakim jesteś etapie",
                description:
                  "Dodaj kilka informacji o szkole, celach i tym, czego chcesz się nauczyć.",
              },
              {
                step: "03",
                title: "Działaj krok po kroku",
                description:
                  "Korzystaj z podpowiedzi AI i podejmuj mądrzejsze decyzje każdego dnia.",
              },
            ].map((item) => (
              <Card key={item.step}>
                <CardHeader>
                  <div className="text-sm font-mono font-semibold text-primary">
                    {item.step}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-base">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Extra tool mention */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Card className="overflow-hidden border-primary/20 bg-primary/5">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-3 p-8 md:p-12">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/80">
                <Stethoscope className="size-3.5 text-primary" />
                Dorastanie to też codzienność
              </span>
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                Pomagamy nie tylko w pracy, ale też w życiu na co dzień
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
                Gdy dorastasz, wszystko dzieje się naraz. Umów wizytę u lekarza
                albo sprawdź, jak zadbać o ubrania. Jedna aplikacja, mniej chaosu.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/register">
                    Wypróbuj za darmo
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/login">Zaloguj się</Link>
                </Button>
              </div>
            </div>
            <div className="md:col-span-2 border-t border-border/60 md:border-l md:border-t-0">
              <div className="flex h-full flex-col justify-center gap-4 p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-background text-primary">
                    <Stethoscope className="size-5" />
                  </div>
                  <div>
                    <div className="font-medium">Wizyty lekarskie</div>
                    <div className="text-sm text-muted-foreground">
                      Szybkie ogarnianie zdrowia online
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-background text-primary">
                    <Sparkles className="size-5" />
                  </div>
                  <div>
                    <div className="font-medium">Mistrz prania</div>
                    <div className="text-sm text-muted-foreground">
                      Pomoc przy ubraniach i metkach
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-background text-primary">
                    <FileSearch className="size-5" />
                  </div>
                  <div>
                    <div className="font-medium">Audyt umów</div>
                    <div className="text-sm text-muted-foreground">
                      Bezpieczniejsze pierwsze umowy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-bold tracking-tight">
              Najczęstsze pytania
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Krótkie odpowiedzi na to, o co pytają najczęściej.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {[
              {
                q: "Czy korzystanie z aplikacji jest darmowe?",
                a: "Tak. Zakładasz konto i korzystasz bez opłat oraz bez podawania danych karty.",
              },
              {
                q: "Czy moje dane są bezpieczne?",
                a: "Logowanie jest szyfrowane, a Twoje dane nigdy nie są udostępniane osobom trzecim.",
              },
              {
                q: "Czy to jest dla nastolatków bez doświadczenia?",
                a: "Tak. To narzędzie jest zaprojektowane właśnie dla osób, które dopiero zaczynają i uczą się dorosłego życia.",
              },
              {
                q: "Jak AI pomaga w czasie dorastania?",
                a: "Na podstawie Twoich celów AI podpowiada kolejne kroki: od pierwszej pracy i CV po rozwój umiejętności i plan działania.",
              },
            ].map((item) => (
              <Card key={item.q}>
                <CardContent className="p-6">
                  <h3 className="font-semibold">{item.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Card className="border-primary/30 bg-primary text-primary-foreground">
          <CardContent className="flex flex-col items-center gap-6 p-10 text-center md:p-14">
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Gotowy wejść pewniej w dorosłość?
            </h2>
            <p className="max-w-xl text-pretty text-primary-foreground/80">
              Dołącz za darmo i zobacz, jak AI może wspierać Cię w tym ważnym
              czasie zmian.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/register">
                  Zacznij za darmo
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/login">Zaloguj się</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md  text-primary-foreground">
              <Image src="/adultify.png" alt="Logo" className="size-4" width={50} height={50} />
            </div>
            <span className="font-medium text-foreground">Adultify</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-foreground transition-colors">
              Logowanie
            </Link>
            <Link
              href="/register"
              className="hover:text-foreground transition-colors"
            >
              Rejestracja
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
