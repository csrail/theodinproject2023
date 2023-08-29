// home page with about blurb
// menu page with menu object + food + beverage
// json data file to generate food and beverage objects
// food objects have: type, course, name, description, price
// beverage objects have: type, style, name, description, price
// contact page with fields and addresses

// website object
// displayController object
// TODO make Order factory function shopping cart

const MenuController = () => {
    const { collectConsumable, getFoodCollection } = Menu();
    const { makeContainer } = MenuDisplay();

    return { collectConsumable, getFoodCollection, makeContainer, }
}

const MenuDisplay = () => {
    const makeContainer = (arg) => {
        const containerElement = document.createElement('div');
        containerElement.classList.add('consumable');
        // const courseStarterElement =  document.createElement('div');
        // courseStarterElement.classList.add('course');

        const consumableNameElement = document.createElement('div');
        const consumableDescriptionElement = document.createElement('div');
        const consumablePriceElement = document.createElement('div');
        // create a closure here?
        // what functions go on the outside, what ones on the inside??
        console.log(arg)
        const obj = arg[0]
        consumableNameElement.textContent = obj.getName()
        consumableDescriptionElement.textContent = obj.getDescription();
        consumablePriceElement.textContent = obj.getPrice();

        document.body.appendChild(consumableNameElement);
        document.body.appendChild(consumableDescriptionElement);
        document.body.appendChild(consumablePriceElement);

        console.log(obj.getCourse());
    }

    return { makeContainer }
}

const Menu = () => {
    const foodCollection = [];
    const beverageCollection = [];

    const collectConsumable = (consumable) => {
        if (consumable.getType === "Food") {
            foodCollection.push(consumable)
            console.log("Added consumable to foodCollection")
        } else if (consumable.getType === "Beverage") {
            beverageCollection.push(consumable)
            console.log("Added consumable to beverageCollection")
        } else {
            console.warn('Consumable is not a Food or Beverage.')
        }
    }

    const getFoodCollection = () => { return foodCollection }
    const getBeverageCollection = () => { return beverageCollection }

    return { collectConsumable, getFoodCollection, getBeverageCollection }
};

const Consumable = (obj = {}) => {
    const name = obj['name'];
    const description = obj['description'];
    const price = obj['price'];
    const { getCourse } = Food(obj);
    const { getStyle } = Beverage(obj['style']);
    let type;

    const getName = () => { return name }
    const getDescription = () => { return description }
    const getPrice = () => { return price}
    const _setType = (consumable) => {
        if ( getCourse !== void(0) && getStyle === void(0)) {
            return type = "Food";
        } else if ( getStyle !== void(0) && getCourse === void(0)) {
            return type = "Beverage";
        } else {
            throw TypeError("Consumable is not a Food or Beverage.");
        }
    }

    _setType(obj);
    const getType = type;

    return { getType, getName, getDescription, getPrice, getCourse, getStyle };
}

const Food = (obj = {}) => {
    const course = obj['course']

    const getCourse = () => { return course }
    // TODO get pieces e.g. for spring rolls

    return { getCourse };
}

const Beverage = (obj = {}) => {
    const style = obj['style'];

    const getStyle = () => { return style }

    return { getStyle };
}

const DisplayController = () => {

}

const main = (() => {
    const consumable = Consumable({ name: "Laksa Soup", description: "Coconut-based spicy soup", price: "20.80", course: "Main"});
    const consumable0 = Consumable({name: "Chicken Wing", description: "Deep fried specially made chicken wing", price: "9.80", course: "Starter"});
    const consumable1 = Consumable({name: "Mini Spring Roll", description: "Deep fried mini spring rolls, served with sweet chilli sauce", price: "10.80", course: "Starter"});
    const consumable2 = Consumable({name: "Malay Tofu", description: "Crispy yum nom tofu with cucumber, carrots, sesame, sweet chilli sauce. Crispy outside and soft inside", price: "12.80", course: "Starter"});
    // const dummy = Consumable({});
    // menuController.collectConsumable(dummy);
    const menuController = MenuController();
    menuController.collectConsumable(consumable);
    menuController.collectConsumable(consumable0);
    menuController.collectConsumable(consumable1);
    menuController.collectConsumable(consumable2);
    console.log(menuController.getFoodCollection());
    menuController.makeContainer(menuController.getFoodCollection());
    return {}
})();

// a menuController object can run the collectConsumable function belonging to the Menu object
// how does the resolution work here?
// inside the menuController function expression, Menu is invoked and assigned to const collectConsumable
// so if I run menuController.collectConsumable, I return Menu()