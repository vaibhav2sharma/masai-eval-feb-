
type MenuItem = {
    available: number;
    price: number;
  };
  
  type Order = {
    id: number;
    items: string[];
    total: number;
  };
  
  type Restaurant = {
    menu: Record<string, MenuItem>;
    orders: Order[];
    open: boolean;
  };
  
  type FoodDeliveryService = {
    serviceName: string;
    location: string;
    restaurants: Record<string, Restaurant>;
    restaurantNames: string[];
    totalRestaurants: number;
  };
  
  const foodDeliveryService: FoodDeliveryService = {
    serviceName: "TastyBites Delivery",
    location: "Foodville",
    restaurants: {
      italianCorner: {
        menu: {
          pizza: { available: 20, price: 12 },
          pasta: { available: 30, price: 10 },
          salad: { available: 15, price: 8 },
        },
        orders: [
          { id: 1, items: ["pizza", "pasta"], total: 22 },
          { id: 2, items: ["salad", "pasta"], total: 18 },
          { id: 3, items: ["pizza", "pasta"], total: 12 },
        ],
        open: false,
      },
      burgerJoint: {
        menu: {
          burger: { available: 25, price: 8 },
          fries: { available: 40, price: 4 },
          drink: { available: 30, price: 2 },
        },
        orders: [
          { id: 1, items: ["burger", "fries"], total: 12 },
          { id: 2, items: ["drink", "burger", "fries"], total: 14 },
          { id: 3, items: ["drink"], total: 2 },
        ],
        open: true,
      },
    },
    restaurantNames: ["italianCorner", "burgerJoint"],
    totalRestaurants: 2,
  };
  

  
  class Building {
    constructor(
      public name: string,
      public location: string,
      public architect: string,
      public constructionDate: number,
      public style: string
    ) {}
  
    getInfo(): string {
      return `${this.name} is a ${this.style} building located in ${this.location}, designed by ${this.architect} in ${this.constructionDate}.`;
    }
  }
  
  class ArtDecoBuilding extends Building {
    constructor(name: string, location: string, architect: string, constructionDate: number) {
      super(name, location, architect, constructionDate, "Art Deco");
    }
  
    getArchitecturalDetails(): string {
      return `${this.name} features geometric patterns, bold colors, and intricate designs, characteristic of Art Deco.`;
    }
  }
  
  class ModernistBuilding extends Building {
    constructor(name: string, location: string, architect: string, constructionDate: number) {
      super(name, location, architect, constructionDate, "Modernist");
    }
  
    getArchitecturalDetails(): string {
      return `${this.name} follows the principles of Modernism, emphasizing functionality, simplicity, and minimal ornamentation.`;
    }
  }
  
 
  const empireState = new ArtDecoBuilding("Empire State Building", "New York", "Shreve, Lamb & Harmon", 1931);
  const searsTower = new ModernistBuilding("Willis Tower", "Chicago", "Bruce Graham", 1973);
  
  console.log(empireState.getInfo());
  console.log(empireState.getArchitecturalDetails());
  console.log(searsTower.getInfo());
  console.log(searsTower.getArchitecturalDetails());
  