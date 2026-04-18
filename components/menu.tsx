import React, { useState } from "react";
import { Briefcase, Menu as MenuIcon, X, TrendingUp, CheckCircle } from "lucide-react";

interface MenuProps {
  onNavigate?: (page: "jobs" | "career" | "home") => void;
  isExpanded: boolean;
  onToggleMenu: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onNavigate, isExpanded, onToggleMenu }) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const menuItems = [
        {
            id: "jobs",
            label: "Oferty pracy",
            icon: Briefcase,
            description: "Porównaj warunki pracy i wynagrodzenie",
            page: "jobs" as const,
        },
        {
            id: "career",
            label: "Ścieżka rozwoju",
            icon: TrendingUp,
            description: "Wymagania do awansu i wyższych zarobków",
            page: "career" as const,
        },
        {
            id: "form",
            label: "Sprawdź zgodność formularza",
            icon: CheckCircle,
            description: "Walidacja i weryfikacja danych",
            page: "home" as const,
        },
    ];

    const handleMenuItemClick = (item: typeof menuItems[0]) => {
        if (onNavigate) {
            onNavigate(item.page);
        }
        setActiveItem(item.id);
    };

    return (
        <div
            className={`fixed z-50 h-svh bg-black text-white transition-all duration-500 ease-in-out overflow-hidden flex flex-col ${
                isExpanded ? "w-90" : "w-20"
            }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
                {isExpanded && (
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        JobFinder
                    </h1>
                )}
                <button
                    onClick={() => onToggleMenu()}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-all duration-300 ml-auto"
                    aria-label="Toggle menu"
                >
                    {isExpanded ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <MenuIcon className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Menu Items */}
            <nav className="p-3 space-y-2 flex flex-col overflow-y-auto flex-1 max-h-[calc(100vh-180px)]">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleMenuItemClick(item)}
                            onMouseEnter={() => setActiveItem(item.id)}
                            onMouseLeave={() => setActiveItem(null)}
                            className={`group relative w-full p-3 rounded-lg transition-all duration-300 cursor-pointer text-left ${
                                isActive
                                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/50"
                                    : "bg-slate-700/50 hover:bg-slate-700 hover:shadow-lg hover:shadow-slate-600/30"
                            } overflow-hidden`}
                        >
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />

                            {/* Content */}
                            <div className="relative flex items-start gap-3 min-w-0">
                                <Icon className="w-6 h-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 mt-0.5" />

                                {isExpanded && (
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-base leading-tight group-hover:translate-x-1 transition-transform duration-300 truncate">
                                            {item.label}
                                        </h3>
                                        <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate mt-0.5">
                                            {item.description}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Underline animation */}
                            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 w-0 group-hover:w-full transition-all duration-300" />
                        </button>
                    );
                })}
            </nav>

            {/* Footer info */}
            {isExpanded && (
                <div className="p-3 mt-auto border-t border-slate-700">
                    <p className="text-xs text-slate-400 text-center">
                        ✨ JobFinder
                    </p>
                </div>
            )}
        </div>
    );
}