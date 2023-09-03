// who: self
// what: creating a webpage with three tabs which switches contents, does this all through javascript
// when: now
// where:  ./src/index.js and ./dist/index.html
// why: handle data sent between objects, manage scope, develop project with webpack running in background,
// how:
// home page with about blurb
// menu page with menu object + food + beverage
// json data file to generate food and beverage objects
// food objects have: type, course, name, description, price
// beverage objects have: type, style, name, description, price
// contact page with form object, fields and addresses

// website object
// displayController object
// TODO make Order factory function shopping cart

const Content = () => {
    const { buildMenu, getContainer } = MenuController();

    let contentElement = document.querySelector('#content');
    const menuContent = document.createElement('div');
    const aboutContent = document.createElement('div');
    const contactContent = document.createElement('div');
    aboutContent.textContent = "about"
    contactContent.textContent = "contact"

    const getContentElement = () => {
        return contentElement
    }
    const createNewContentElement = () => {
        contentElement = document.createElement('div');
        contentElement.id = 'content';
        return contentElement;
    }

    const getMenuContent = () => {
        return menuContent
    }

    const setMenuContent = () => {
        return buildMenu();
    }

    return { getContentElement, createNewContentElement, getMenuContent, setMenuContent, aboutContent, contactContent,
        getContainer,
        buildMenu, }
}

const Navigation = () => {
    const {
        getContentElement,
        createNewContentElement,
        getMenuContent,
        setMenuContent,
        buildMenu,
        getContainer,
        aboutContent,
        contactContent,
    } = Content();

    const initialiseLandingPage = () => {
        buildMenu();
        getContentElement().appendChild(getContainer());
    }
    const initialiseNavigation = () => {
        const navElement = document.querySelector('nav')
        const navItems = navElement.querySelectorAll('div')
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                getContentElement().remove();
                createNewContentElement();

                if (item.getAttribute('data-navigation') === 'menu') {
                    buildMenu();
                    getContentElement().appendChild(getContainer())
                    document.body.append(getContentElement());
                }

                if (item.getAttribute('data-navigation') === 'about') {
                    getContentElement().appendChild(aboutContent);
                    document.body.append(getContentElement());
                }

                if (item.getAttribute('data-navigation') === 'contact') {
                    getContentElement().appendChild(contactContent);
                    document.body.append(getContentElement())
                }

            })
        })
    }

    return { initialiseLandingPage, initialiseNavigation }

}

const MenuController = () => {
    const { getFoodCollection } = Menu();
    const { getContainer, makeContainer } = MenuView();

    const buildMenu = () => {
        getFoodCollection().forEach(item => {
            makeContainer(item);
        })
    }

    return { getFoodCollection, makeContainer, getContainer, buildMenu }
}

const MenuView = () => {
    const containerElement = document.createDocumentFragment();

    const getContainer = () => {
        return containerElement;
    }
    const makeContainer = (obj) => {
        const content = document.createElement('div');
        content.classList.add('consumable');

        const consumableNameElement = document.createElement('div');
        const consumableDescriptionElement = document.createElement('div');
        const consumablePriceElement = document.createElement('div');

        consumableNameElement.classList.add('name')
        consumableDescriptionElement.classList.add('description')
        consumablePriceElement.classList.add('price')

        consumableNameElement.textContent = obj.getName()
        consumableDescriptionElement.textContent = obj.getDescription();
        consumablePriceElement.textContent = obj.getPrice();

        content.appendChild(consumableNameElement);
        content.appendChild(consumablePriceElement);
        content.appendChild(consumableDescriptionElement);

        return containerElement.appendChild(content);
    }

    return { getContainer, makeContainer }
}

const Menu = () => {
    const foodCollection = [];
    const beverageCollection = [];

    const consumable = Consumable({ name: "Laksa Soup", description: "Coconut-based spicy soup", price: "20.80", course: "Main"});
    const consumable0 = Consumable({name: "Chicken Wing", description: "Deep fried specially made chicken wing", price: "9.80", course: "Starter"});
    const consumable1 = Consumable({name: "Mini Spring Roll", description: "Deep fried mini spring rolls, served with sweet chilli sauce", price: "10.80", course: "Starter"});
    const consumable2 = Consumable({name: "Malay Tofu", description: "Crispy yum nom tofu with cucumber, carrots, sesame, sweet chilli sauce. Crispy outside and soft inside", price: "12.80", course: "Starter"});
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

    collectConsumable(consumable);
    collectConsumable(consumable0);
    collectConsumable(consumable1);
    collectConsumable(consumable2);

    const getFoodCollection = () => { return foodCollection }
    const getBeverageCollection = () => { return beverageCollection }

    return { getFoodCollection, getBeverageCollection }
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
    const nav = Navigation();
    nav.initialiseLandingPage();
    nav.initialiseNavigation();

    return {}
})();

// a menuController object can run the collectConsumable function belonging to the Menu object
// how does the resolution work here?
// inside the menuController function expression, Menu is invoked and assigned to const collectConsumable
// so if I run menuController.collectConsumable, I return Menu()
