# Adultify

Adultify to aplikacja webowa wspierająca nastolatków i młode osoby w pierwszych krokach dorosłego życia: od szukania pracy, przez pierwsze CV i rozmowy rekrutacyjne, po podatki, umowy i codzienne decyzje.

## Najważniejsze funkcje

- porównywanie ofert pracy i benefitów,
- kalkulator wynagrodzenia,
- AI do planowania ścieżki kariery,
- analiza umów i formularzy,
- generator CV i PDF,
- symulator rozmowy kwalifikacyjnej,
- asystent do odczytywania metek i instrukcji prania,
- sekcja z terminami podatkowymi i podstawami PIT, CIT oraz VAT,
- moduł wizyt lekarskich,
- logowanie, rejestracja, reset hasła i ustawienia konta.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase
- Google Gemini API
- shadcn/ui, Radix UI, Lucide, Sonner, Motion

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Po starcie aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000).

## Skrypty

- `npm run dev` - uruchamia serwer developerski,
- `npm run build` - buduje produkcyjną wersję aplikacji,
- `npm run start` - uruchamia zbudowaną aplikację,
- `npm run lint` - odpala ESLint.

## Wymagane zmienne środowiskowe

Utwórz plik `.env.local` i uzupełnij:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
```

## Struktura projektu

- `app/` - strony, layout, API routes i widoki aplikacji,
- `components/` - komponenty UI i moduły funkcjonalne,
- `lib/` - helpery i konfiguracja klienta,
- `actions/` - akcje serwerowe,
- `schema/` - schematy walidacji,
- `store/` - stan aplikacji,
- `public/` - zasoby statyczne.

## API

Aplikacja zawiera m.in. endpointy do:

- analizy umów,
- generowania kariery,
- generowania CV,
- generowania PDF,
- pobierania danych użytkownika,
- symulatora interview,
- obsługi modułu laundry,
- callbacka autoryzacji.

## Uwagi

Projekt jest przygotowany pod środowisko Vercel i korzysta z App Routera. Główny ekran aplikacji znajduje się w [app/page.tsx](app/page.tsx), a globalne metadata i konfiguracja layoutu w [app/layout.tsx](app/layout.tsx).
