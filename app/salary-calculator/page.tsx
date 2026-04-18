/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Wallet,
  MapPin,
  Home,
  Coffee,
  Smartphone,
  Briefcase,
  Plus,
  Trash2,
  Loader2,
  TrendingDown,
} from "lucide-react";
import { useUserStore } from "@/store/user";
import { createClient } from "@/lib/supabase/client";

const DATA = {
  cities: {
    Warszawa: {
      rentApartment: 5250,
      rentStudio: 3500,
      rentRoom: 1800,
      transport: 180,
      foodBase: 1200,
    },
    Rzeszów: {
      rentApartment: 4500,
      rentStudio: 2200,
      rentRoom: 1200,
      transport: 100,
      foodBase: 900,
    },
    Kraków: {
      rentApartment: 5000,
      rentStudio: 3000,
      rentRoom: 1600,
      transport: 160,
      foodBase: 1100,
    },
  },
  lifestyles: {
    "Student (Przetrwanie)": 0.6,
    "Normalny człowiek": 1.0,
    "Żymianin ✡️ (Premium)": 1.8,
  },
};

export default function JobFinderSalaryDashboard() {
  const { user, setUser } = useUserStore();
  const supabase = createClient();

  const [isMounted, setIsMounted] = useState(false);
  const [netSalary, setNetSalary] = useState(0);
  const [goals, setGoals] = useState<any[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string>("");

  // State dla nowego celu
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalPrice, setNewGoalPrice] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const [city, setCity] = useState(Object.keys(DATA.cities)[0]);
  const [housing, setHousing] = useState<
    "rentStudio" | "rentRoom" | "rentApartment"
  >("rentStudio");
  const [lifestyle, setLifestyle] = useState("Normalny człowiek");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (!authUser) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, salary")
        .eq("id", authUser.id)
        .single();

      if (profile) {
        setUser({
          id: authUser.id,
          email: authUser.email!,
          name: profile.full_name,
          salary: profile.salary,
        });
        setNetSalary(profile.salary || 0);
      }

      // 2. Pobierz cele
      const { data: userGoals } = await supabase
        .from("goals")
        .select("*")
        .order("created_at", { ascending: false });

      if (userGoals) {
        setGoals(userGoals);
        if (userGoals.length > 0) setSelectedGoalId(userGoals[0].id);
      }
    };

    if (isMounted) fetchData();
  }, [isMounted, supabase, setUser]);

  // Funkcja dodawania celu
  const addGoal = async () => {
    if (!newGoalTitle || !newGoalPrice || !user) return;
    setIsAdding(true);
    const { data, error } = await supabase
      .from("goals")
      .insert([
        { title: newGoalTitle, price: Number(newGoalPrice), user_id: user.id },
      ])
      .select()
      .single();

    if (!error) {
      setGoals([data, ...goals]);
      setSelectedGoalId(data.id);
      setNewGoalTitle("");
      setNewGoalPrice("");
    }
    setIsAdding(false);
  };

  const deleteGoal = async (e: React.MouseEvent, goalId: string) => {
    e.stopPropagation();
    const { error } = await supabase.from("goals").delete().eq("id", goalId);
    if (!error) {
      setGoals(goals.filter((g) => g.id !== goalId));
      if (selectedGoalId === goalId) {
        setSelectedGoalId(goals.find((g) => g.id !== goalId)?.id || "");
      }
    }
  };

  // Kalkulacje
  const calculation = useMemo(() => {
    const cityData = DATA.cities[city as keyof typeof DATA.cities];
    const rent = cityData[housing as keyof typeof cityData];
    const foodAndLife =
      cityData.foodBase *
      (DATA.lifestyles[lifestyle as keyof typeof DATA.lifestyles] || 1);
    const totalCosts = rent + foodAndLife + cityData.transport;
    const balance = netSalary - totalCosts;

    const selectedGoal = goals.find((g) => g.id === selectedGoalId);
    const monthsToGoal =
      balance > 0 && selectedGoal
        ? Math.ceil(selectedGoal.price / balance)
        : Infinity;

    return {
      rent,
      foodAndLife,
      transport: cityData.transport,
      balance,
      monthsToGoal,
      selectedGoal,
    };
  }, [netSalary, city, housing, lifestyle, goals, selectedGoalId]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FD] text-slate-800 font-sans flex w-full">
      <aside className="w-72 bg-white border-r border-slate-200 p-8 flex flex-col gap-8 hidden lg:flex">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <Briefcase size={28} />
          <span>PayCheck.io</span>
        </div>
        <nav className="space-y-6">
          <FilterSelect
            label="Lokalizacja"
            icon={<MapPin size={14} />}
            value={city}
            onChange={setCity}
            options={Object.keys(DATA.cities)}
          />
          <FilterSelect
            label="Rodzaj lokum"
            icon={<Home size={14} />}
            value={housing}
            onChange={setHousing}
            options={["rentRoom", "rentStudio", "rentApartment"]}
            labels={{
              rentRoom: "Pokój",
              rentStudio: "Kawalerka",
              rentApartment: "Apartament",
            }}
          />
          <FilterSelect
            label="Styl życia"
            icon={<Coffee size={14} />}
            value={lifestyle}
            onChange={setLifestyle}
            options={Object.keys(DATA.lifestyles)}
          />
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Cześć, {user?.name || "Użytkowniku"} 👋
            </h1>
            <p className="text-slate-500 text-sm">
              Twoja analiza finansowa,
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
            <h2 className="font-semibold flex items-center gap-2 mb-6">
              <Wallet className="text-indigo-500" size={20} /> Twoja Pensja
              Netto
            </h2>
            <div className="flex items-baseline gap-2">
              <input
                type="number"
                value={netSalary}
                onChange={(e) => setNetSalary(Number(e.target.value))}
                className="text-5xl font-black text-slate-800 focus:outline-none w-full bg-transparent"
              />
              <span className="text-xl font-bold text-slate-400">PLN</span>
            </div>
          </div>

          <div
            className={`p-6 rounded-[24px] shadow-sm border ${calculation.balance > 0 ? "bg-indigo-600 text-white" : "bg-red-500 text-white"}`}
          >
            <h2 className="font-medium opacity-80 mb-1">Zostaje na czysto</h2>
            <div className="text-4xl font-black mb-4">
              {calculation.balance.toFixed(0)} zł
            </div>
            <p className="text-sm opacity-90 font-medium">
              {calculation.balance > 0
                ? "Możesz odłożyć na marzenia!"
                : "Przekraczasz budżet!"}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 mb-8 rounded-[24px] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <TrendingDown size={20} className="text-red-500" /> Wykaz
            kosztów
          </h3>

          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Dach nad głową
                </span>
                <span className="font-semibold text-slate-700">
                  {housing === "rentRoom"
                    ? "Pokój u obcych"
                    : housing === "rentStudio"
                      ? "Własna kawalerka"
                      : "Apartament"}
                </span>
              </div>
              <span className="font-black text-red-500">
                -{calculation.rent} zł
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Przewidywane tryb wydawania pieniędzy na jedzenie i podstawowe przedmioty
                </span>
                <span className="font-semibold text-slate-700">
                  {lifestyle}
                </span>
              </div>
              <span className="font-black text-red-500">
                -{calculation.foodAndLife.toFixed(0)} zł
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Transport
                </span>
                <span className="font-semibold text-slate-700">
                  Bilet w {city}
                </span>
              </div>
              <span className="font-black text-red-500">
                -{calculation.transport} zł
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-dashed border-slate-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 text-lg">
                Łączne wydatki:
              </span>
              <span className="text-2xl font-black text-red-600">
                {(
                  calculation.rent +
                  calculation.foodAndLife +
                  calculation.transport
                ).toFixed(0)}{" "}
                zł
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-right uppercase tracking-widest font-bold">
              Pieniądze nie dają szczęścia, ale ich brak daje smutek.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Plus size={20} className="text-indigo-500" /> Dodaj nowy cel
            </h3>
            <div className="flex flex-col gap-3">
              <input
                placeholder="Nazwa (np. MacBook Pro)"
                className="bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Cena (zł)"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none"
                  value={newGoalPrice}
                  onChange={(e) => setNewGoalPrice(e.target.value)}
                />
                <button
                  onClick={addGoal}
                  disabled={isAdding}
                  className="bg-indigo-600 text-white px-6 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {isAdding ? <Loader2 className="animate-spin" /> : "Dodaj"}
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                Twoje Cele
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {goals.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGoalId(g.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedGoalId === g.id ? "border-indigo-500 bg-indigo-50" : "border-slate-100 hover:border-slate-300"}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="font-bold">{g.title}</span>
                        <span className="text-indigo-600 font-black">
                          {g.price} zł
                        </span>
                      </div>
                      <button
                        onClick={(e) => deleteGoal(e, g.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={28} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
            <Smartphone size={48} className="text-indigo-100 mb-4" />
            <h3 className="text-xl font-bold mb-2">Czas realizacji celu</h3>
            {calculation.selectedGoal ? (
              <>
                <p className="text-slate-500 mb-6 font-medium">
                  Odkładając całą nadwyżkę na Twoje cele:
                </p>
                <div className="text-6xl font-black text-slate-800 mb-2">
                  {calculation.monthsToGoal === Infinity
                    ? "∞"
                    : calculation.monthsToGoal}
                  <span className="text-xl ml-2">mies.</span>
                </div>
                <p className="text-slate-400 text-sm italic">
                  To tylko {(calculation.monthsToGoal / 12).toFixed(1)} lat
                  Twojej młodości
                </p>
              </>
            ) : (
              <p className="text-slate-400">
                Dodaj cel, aby sprawdzić kiedy go osiągniesz.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function FilterSelect({ label, icon, value, onChange, options, labels }: any) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase mb-3">
        {icon} {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        {options.map((o: string) => (
          <option key={o} value={o}>
            {labels ? labels[o] : o}
          </option>
        ))}
      </select>
    </div>
  );
}
