// home page with about blurb
// menu page with menu object + food + beverage
// json data file to generate food and beverage objects
// food objects have: type, course, name, description, price
// beverage objects have: type, style, name, description, price
// contact page with fields and addresses

// website object
// displayController object

const MenuController = () => {
    const { collectConsumable, getFoodCollection } = Menu();
    const { makeContainer } = MenuDisplay();

    return { collectConsumable, getFoodCollection, makeContainer }
}

const MenuDisplay = () => {
    const makeContainer = () => {
        const div = document.createElement('div');
        div.classList.add('consumable');
        div.textContent = 'FOOD HERE';

        document.body.appendChild(div);
    }

    return { makeContainer }
}

const Menu = () => {
    const foodCollection = [];
    const beverageCollection = [];
    const { getType } = Consumable();

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
    const getName = obj['name'];
    const getDescription = obj['description'];
    const getPrice = obj['price'];
    const { getCourse } = Food(obj['course']);
    const { getStyle } = Beverage(obj['style']);
    let type;

    const _setType = (consumable) => {
        if ( getCourse === void (0) && getStyle === void(0)) {
            return
        } else if ( getCourse !== void(0) && getStyle === void(0)) {
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

const Food = (course) => {
    const getCourse = course;

    return { getCourse };
}

const Beverage = (style) => {
    const getStyle = style;

    return { getStyle };
}

const DisplayController = () => {

}

const main = (() => {
    const consumable = Consumable({ name: "Laksa Soup", description: "Coconut-based spicy soup", price: "20.80", course: "Main"});
    const consumable0 = Consumable({name: "Chicken Wing", description: "Deep fried specially made chicken wing", price: "9.80", course: "Starter"});
    const consumable1 = Consumable({name: "Mini Spring Roll", description: "Deep fried mini spring rolls, served with sweet chilli sauce", price: "10.80", course: "Starter"})
    const consumable2 = Consumable({name: "Malay Tofu", description: "Crispy yum nom tofu with cucumber, carrots, sesame, sweet chilli sauce. Crispy outside and soft inside", price: "12.80", course: "Starter"})
    const dummy = {}
    const menuController = MenuController();
    menuController.collectConsumable(consumable);
    menuController.collectConsumable(consumable0);
    menuController.collectConsumable(consumable1);
    menuController.collectConsumable(dummy);
    menuController.collectConsumable(consumable2);
    console.log(menuController.getFoodCollection());
    menuController.makeContainer();
    return {}
})();
