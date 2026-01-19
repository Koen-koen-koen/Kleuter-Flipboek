
export interface EducationalApp {
  id: string;
  title: string;
  url: string;
  icon: string;
  color: string;
  description?: string;
}

export interface FlipbookState {
  currentIndex: number;
  apps: EducationalApp[];
  isFullscreen: boolean;
}
