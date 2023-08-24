// home page with about blurb
// menu page with menu object + food + beverage
// json data file to generate food and beverage objects
// food objects have: type, course, name, description, price
// beverage objects have: type, style, name, description, price
// contact page with fields and addresses

// website object
// displayController object

const Menu = () => {
    // take consumables
    // sort into different collections
    // food consumables collection
    // beverage consumables collection
    const takeConsumable = (consumable) => {
        return console.log(consumable);
    }

    return { takeConsumable }
};

const Consumable = (obj) => {
    const getName = obj['name'];
    const getDescription = obj['description'];
    const getPrice = obj['price'];
    const { getCourse } = Food(obj['course']);
    const { getStyle } = Beverage(obj['style']);
    let type;

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
    const menu = Menu()
    menu.takeConsumable(consumable);
    // console.log(consumable.getName);
    // console.log(consumable.getDescription);
    // console.log(consumable.getPrice);
    // console.log(consumable.getCourse);
    // console.log(consumable.getStyle);
    return {}
})();
