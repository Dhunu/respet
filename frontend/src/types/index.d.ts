declare type Recipe = {
    id: string;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    image: string;
    category: string;
    featured: boolean;
    rating: float;
};

declare type Category = {
    id: string;
    name: string;
    image: string;
};
