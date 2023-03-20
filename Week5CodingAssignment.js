class Food{
  constructor(name, calories) {
    this.name = name;
    this.calories = calories;
  }

  describe() {
    return `${this.name} has ${this.calories} calories.`;
  }
}

class Meal {
  constructor(name) {
    this.name = name;
    this.foods = [];
  }

  addFood(food) {
    if (food instanceof Food) {
      this.foods.push(food);
    } else {
      throw new Error(
        `You can only add an instance of Food. Argument is not a food: ${food}`
      );
    }
  }
  describe() {
    return `${this.name} has ${this.foods.length} foods.`;
  }
}

class Menu {
  constructor() {
    this.meals = [];
    this.selected = null;
  }

  start() {
    let selection = this.showMainMenuOptions();

    while (selection != 0) {
      switch (selection) {
        case '1':
          this.createMeal();
          break;
        case '2':
          this.viewMeal();
          break;
        case '3':
          this.deleteMeal();
          break;
        case '4':
          this.displayMeals();
          break;
        case '5':
          this.viewAllFoods();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }

    alert('Goodbye!');
  }

  showMainMenuOptions() {
    return prompt(`
        0) exit
        1) create new meal
        2) view meal
        3) delete meal
        4) display all meals
        5) view all foods
    `);
  }

  showMealMenuOptions(mealInfo) {
    return prompt(`
      0) back
      1) create food
      2) delete food
      -------------------
      ${mealInfo}
    `);
  }

  displayMeals() {
    let mealString = '';
    for (let i = 0; i < this.meals.length; i++) {
      mealString += i + ') ' + this.meals[i].name + '\n';
    }
    alert(mealString);
  }

  createMeal() {
    const name = prompt('Enter name for new meal: ');
    this.meals.push(new Meal(name));
  }

  generateDescriptionForViewAllFoods() {
    let description = 'All Foods:' + '\n';

    
    for (let mealIndex = 0; mealIndex < this.meals.length; mealIndex++) {
      description += mealIndex + ') ' + this.meals[mealIndex].name + '\n';

  
      for (
        let foodIndex = 0;
        foodIndex < this.meals[mealIndex].foods.length;
        foodIndex++
      ) {
        description +=
          foodIndex +
          ') ' +
          this.meals[mealIndex].foods[foodIndex].name +
          ' - ' +
          this.meals[mealIndex].foods[foodIndex].calories + ' calories' +
          '\n';
      }
      description += '--' + '\n';
    }
    return description;
  }

  viewAllFoods() {
    const description = this.generateDescriptionForViewAllFoods();

    
    const selection = this.showMealMenuOptions(description);
  
    switch (selection) {
      case '1':
        this.createFood();
        break;
      case '2':
        this.deleteFood();
        break;
    }
  }

  viewMeal() {
    const index = prompt('Enter the index of the meal you wish to view: ');
    if (index > -1 && index < this.meals.length) {
      this.selectedMeal = this.meals[index];
      let description = 'Meal Name: ' + this.selectedMeal.name + '\n';

      for (let i = 0; i < this.selectedMeal.foods.length; i++) {
        description +=
          i +
          ') ' +
          this.selectedMeal.foods[i].name +
          ' - ' +
          this.selectedMeal.foods[i].calories +
          "\n";
      }

      const selection = this.showMealMenuOptions(description);
      switch (selection) {
        case "1":
          this.createFood();
          break;
        case "2":
          this.deleteFood();
          break;
      }
    }
  }

  deleteMeal() {
    const index = prompt("Enter the index of the meal you wish to delete: ");
    if (index > -1 && index < this.meals.length) {
      this.meals.splice(index, 1);
    }
  }
  createFood() {
    const name = prompt("Enter name for new food: ");
    const calories = prompt("Enter calories for new food: ");
    this.selectedMeal.foods.push(new Food(name, calories));
  }

  deleteFood() {
    const index = prompt("Enter the index of the food you wish to delete: ");
    if (index > -1 && index < this.selectedMeal.foods.length) {
      this.selectedMeal.foods.splice(index, 1);
    }
  }
}

const menu = new Menu();
menu.start();