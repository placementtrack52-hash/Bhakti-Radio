export interface Festival {
  name: string;
  slug: string;
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
  theme: string;
  icon: string;
  description: string;
  activeOverride?: boolean;
}
