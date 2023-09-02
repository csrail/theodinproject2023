// home page with about blurb
// menu page with menu object + food + beverage
// json data file to generate food and beverage objects
// food objects have: type, course, name, description, price
// beverage objects have: type, style, name, description, price
// contact page with fields and addresses

// website object
// displayController object
// TODO make Order factory function shopping cart

const Content = () => {
    let contentElement = document.querySelector('#content');

    const menuContent = document.createElement('div');

    const aboutContent = document.createElement('div');
    aboutContent.textContent = "about"

    const contactContent = document.createElement('div');
    contactContent.textContent = "contact"

    const createNewContentElement = () => {
        contentElement = document.createElement('div');
        contentElement.id = 'content';
        return contentElement
    }


    return { contentElement, createNewContentElement, menuContent, aboutContent, contactContent }
}

const Navigation = (obj = {}) => {
    let { contentElement} = Content();
    const {
        createNewContentElement,
        menuContent,
        aboutContent,
        contactContent,
    } = Content();
    const menuController = obj
    console.log(menuController.getFoodCollection())


    const navElement = document.querySelector('nav')
    const navItems = navElement.querySelectorAll('div')
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            contentElement.remove();
            contentElement = createNewContentElement();

            if (item.getAttribute('data-navigation') === 'menu') {
                contentElement.appendChild(menuContent);
                menuController.getFoodCollection()
                    .forEach((obj) => {
                        contentElement.appendChild(menuController.makeContainer(obj));
                    })
                document.body.append(contentElement);
                // menuController is doing lots of things internally and not returning anything
                // you must use the return otherwise it gets discarded
                // the return is a containerElement
                // which you then append to contentElement that is known within Navigation
                // issue here is that contentElement exists in both Navigation and menuController
                // In menuController, contentElement exists as a side effect to generate the menu on first page load
                // whereas contentElement exists in Navigation solely for creating new content
            }

            if (item.getAttribute('data-navigation') === 'about') {
                contentElement.appendChild(aboutContent);
                document.body.append(contentElement);
            }

            if (item.getAttribute('data-navigation') === 'contact') {
                contentElement.appendChild(contactContent);
                document.body.append(contentElement)
            }

        })
    })
}

const MenuController = () => {
    const { collectConsumable, getFoodCollection } = Menu();
    const { makeContainer } = MenuDisplay();

    return { collectConsumable, getFoodCollection, makeContainer, }
}

const MenuDisplay = () => {
    const { contentElement } = Content();
    const makeContainer = (obj) => {
        const containerElement = document.createElement('div');
        containerElement.classList.add('consumable');
        // const courseStarterElement =  document.createElement('div');
        // courseStarterElement.classList.add('course');

        const consumableNameElement = document.createElement('div');
        const consumableDescriptionElement = document.createElement('div');
        const consumablePriceElement = document.createElement('div');
        // create a closure here?
        // what functions go on the outside, what ones on the inside??
        consumableNameElement.classList.add('name')
        consumableDescriptionElement.classList.add('description')
        consumablePriceElement.classList.add('price')

        consumableNameElement.textContent = obj.getName()
        consumableDescriptionElement.textContent = obj.getDescription();
        consumablePriceElement.textContent = obj.getPrice();

        containerElement.appendChild(consumableNameElement);
        containerElement.appendChild(consumablePriceElement);
        containerElement.appendChild(consumableDescriptionElement);

        contentElement.appendChild(containerElement);

        return containerElement;

        // const contentPrime = containerElement.cloneNode(true)

        // const contentClassElement = document.querySelector('.content');
        // contentClassElement.appendChild(contentPrime);
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
    const { getStyle } = Beverage(obj);
    let type;

    const getName = () => { return name }
    const getDescription = () => { return description }
    const getPrice = () => { return price}
    const _setType = (consumable) => {
        if ( getCourse() !== void(0) && getStyle() === void(0)) {
            return type = "Food";
        } else if ( getStyle() !== void(0) && getCourse() === void(0)) {
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

    menuController.getFoodCollection()
        .forEach((obj) => {
            menuController.makeContainer(obj);
        })

    Navigation(menuController);

    return {}
})();

// a menuController object can run the collectConsumable function belonging to the Menu object
// how does the resolution work here?
// inside the menuController function expression, Menu is invoked and assigned to const collectConsumable
// so if I run menuController.collectConsumable, I return Menu()
