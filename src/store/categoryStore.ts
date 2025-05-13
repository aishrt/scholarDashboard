import { create } from 'zustand';

interface Category {
  id: string;
  categoryType: string;
}

interface CategoryStore {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  fetchCategories: () => Promise<void>;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  fetchCategories: async () => {
    try {
      const response = await fetch('https://getallcategories-g2ivo4mtsa-uc.a.run.app');
      const data = await response.json();
      set({ categories: data });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
}));

export default useCategoryStore; 