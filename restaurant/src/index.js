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

"use strict"

const consumableFood = require ('./food.json');

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
    const getType = () => { return type }

    return { getType, getName, getDescription, getPrice, getCourse, getStyle };
}

const Menu = () => {
    const foodCollection = [];
    const beverageCollection = [];

    const collectConsumable = (consumable) => {
        if (consumable.getType() === "Food") {
            foodCollection.push(consumable)
            console.log("Added consumable to foodCollection")
        } else if (consumable.getType() === "Beverage") {
            beverageCollection.push(consumable)
            console.log("Added consumable to beverageCollection")
        } else {
            console.warn('Consumable is not a Food or Beverage.')
        }
    }

    consumableFood.forEach(food => {
        collectConsumable(Consumable(food))
    })

    const getFoodCollection = () => { return foodCollection }
    const getBeverageCollection = () => { return beverageCollection }

    return { getFoodCollection, getBeverageCollection }
}

const htmlMixin = () => {

    const makeElement = (obj = {}) => {
        const element = document.createElement('div');
        element.id = obj['id'];
        element.classList = obj['class'];
        element.textContent = obj['text'];
        return element
    }

    return { makeElement }
}

const MenuView = () => {
    const { makeElement } = htmlMixin();

    const containerElement = document.createDocumentFragment();

    const getMenu = () => {
        return containerElement;
    }

    const buildConsumableElement = consumable => {

        const content = makeElement({class: 'consumable'});
        const topContainer = makeElement();
        const bottomContainer = makeElement();

        // initialise consumableNameElement as one line
        // create a function definition...
        // why return a function definition as a value
        // when you can return a simple value instead
        // returning a function definition allows state to be further changed when the function is invoked
        // if the function doesn't change the state when invoked, then you should return a simple value instead

        // apply becomes relevant because it enables rest parameters to be declared
        // decoupling the function from always needing positional arguments
        // using makeElement without arguments is fragile, but vanilla js allows for it

        // visualise similar patterns, try to abstract it to increase readability

        const consumableNameElement = makeElement({class: 'name', text: consumable.getName()});
        const consumableDescriptionElement = makeElement({class: 'description', text: consumable.getDescription()});
        const consumablePriceElement = makeElement({class: 'price', text: consumable.getPrice()});

        topContainer.appendChild(consumableNameElement);
        topContainer.appendChild(consumablePriceElement);
        bottomContainer.appendChild(consumableDescriptionElement);

        content.appendChild(topContainer);
        content.appendChild(bottomContainer);

        return containerElement.appendChild(content);
    }

    const makeHeading = (title) => {
        const heading = document.createElement('h1');
        heading.textContent = title
        return heading
    }

    const HeadingStarterElement = makeHeading('Starter');
    const HeadingMainElement = makeHeading('Main');

    return { getMenu, buildConsumableElement }
}

const MenuController = () => {
    const { getFoodCollection } = Menu();
    const { getMenu, buildConsumableElement } = MenuView();

    const buildMenu = () => {
        getFoodCollection().forEach(item => {
            buildConsumableElement(item);
        })
    }

    return { getFoodCollection, buildConsumableElement, getMenu, buildMenu }
}

const Content = () => {
    const { buildMenu, getMenu } = MenuController();
    const { makeElement } = htmlMixin();

    let contentElement = makeElement({id: 'content'});
    const aboutContent = makeElement({text: 'about'});
    const contactContent = makeElement({text: 'contact'});

    const getContentElement = () => {
        return contentElement
    }
    const createNewContentElement = () => {
        return contentElement = makeElement({id: 'content'});
    }

    const displayMenuContent = () => {
        getContentElement().appendChild(getMenu());
        document.body.append(getContentElement());
    }

    const displayAboutContent = () => {
        getContentElement().appendChild(aboutContent);
        document.body.append(getContentElement());
    }

    const displayContactContent = () => {
        getContentElement().appendChild(contactContent);
        document.body.append(getContentElement())
    }

    return { getContentElement, createNewContentElement, displayAboutContent, displayContactContent, buildMenu, displayMenuContent }
}

const Navigation = () => {
    const {
        getContentElement,
        createNewContentElement,
        buildMenu,
        displayMenuContent,
        displayAboutContent,
        displayContactContent,
    } = Content();

    const initialiseLandingPage = () => {
        buildMenu();
        displayMenuContent();
    }
    const initialiseNavigation = () => {
        const navElement = document.querySelector('nav')
        const navItems = navElement.querySelectorAll('div')
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                getContentElement().remove();
                createNewContentElement();

                switch (item.getAttribute('data-navigation')) {
                    case 'menu':
                        buildMenu();
                        displayMenuContent();
                        break
                    case 'about':
                        displayAboutContent();
                        break
                    case 'contact':
                        displayContactContent();
                        break
                    default:
                        break
                }
            })
        })
    }

    return { initialiseLandingPage, initialiseNavigation }
}

const main = (() => {
    const nav = Navigation();
    nav.initialiseLandingPage();
    nav.initialiseNavigation();

    return {}
})();
