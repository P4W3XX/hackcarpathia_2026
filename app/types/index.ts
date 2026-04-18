export interface JobOffer {
  id: string;
  title: string;
  company: string;
  salary: {
    min: number;
    max: number;
  };
  location: string;
  workSchedule: string;
  workStyle: string;
  experience: string;
  employmentType: string;
  applicants: number;
  date: string;
  tags: string[];
  description: string;
  color: string;
  logo?: string;
}

export interface FilterState {
  workSchedule: string[];
  salaryRange: [number, number];
  employmentType: string[];
  workStyle: string[];
  searchTerm: string;
}

export interface CareerLevel {
  level: number;
  title: string;
  currentSalary: number;
  nextSalary: number;
  requirements: string[];
  skills: string[];
  estimatedTime: string;
}
