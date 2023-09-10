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

const jsonConsumables = require ('./food.json');

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
    const _setType = () => {
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

const Menu = (consumables) => {
    const foodCollection = [];
    const beverageCollection = [];

    const _collectConsumable = (consumable) => {
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

    const _collectConsumables = () => {
        consumables.forEach(food => {
            _collectConsumable(Consumable(food));
        })
    }

    const getFoodCollection = () => {
        foodCollection.length === 0 ? _collectConsumables(consumables) : foodCollection
        return foodCollection
    }
    const getBeverageCollection = () => { return beverageCollection }

    return { getFoodCollection, getBeverageCollection }
}

const MenuView = () => {
    const { makeElement, makeHeading } = htmlMixin();
    const { getFoodCollection } = Menu(jsonConsumables);

    let courseElement
    let consumablesElement
    const HeadingStarterElement = makeHeading('Starter');
    const HeadingMainElement = makeHeading('Main');

    const initialiseConsumablesElement = () => {
        return consumablesElement = makeElement({class: 'consumables'})
    }

    const initialiseCourseElement = () => {
        return courseElement = makeElement({class: 'course'})
    }

    const getCourseElement = () => { return courseElement }

    const getConsumablesElement = () => { return consumablesElement }

    const getHeadingStarterElement = () => { return HeadingStarterElement }

    const getHeadingMainElement = () => { return HeadingMainElement }

    const buildConsumableElement = consumable => {
        const consumableElement = makeElement({class: 'consumable'});
        const topContainer = makeElement();
        const bottomContainer = makeElement();

        const consumableNameElement = makeElement({class: 'name', text: consumable.getName()});
        const consumableDescriptionElement = makeElement({class: 'description', text: consumable.getDescription()});
        const consumablePriceElement = makeElement({class: 'price', text: consumable.getPrice()});

        topContainer.appendChild(consumableNameElement);
        topContainer.appendChild(consumablePriceElement);
        bottomContainer.appendChild(consumableDescriptionElement);

        consumableElement.appendChild(topContainer);
        consumableElement.appendChild(bottomContainer);

        return consumableElement;
    }

    const buildConsumablesElement = (course) => {
        initialiseConsumablesElement();
        getFoodCollection().forEach( item => {
            if (course === 'Starter' && item.getCourse() === 'Starter') {
                getConsumablesElement().appendChild(buildConsumableElement(item));
            } else if (course === 'Main' && item.getCourse() === 'Main') {
                getConsumablesElement().appendChild(buildConsumableElement(item));
            }
        })
    }

    return {
        getConsumablesElement,
        buildConsumablesElement,
        getHeadingStarterElement,
        getHeadingMainElement,
        getCourseElement,
        initialiseCourseElement
    }
}

const MenuController = () => {
    const {
        getConsumablesElement,
        buildConsumablesElement,
        getHeadingStarterElement,
        getHeadingMainElement,
        getCourseElement,
        initialiseCourseElement,
    } = MenuView();

    const menuElement = document.createDocumentFragment();

    const getMenuElement = () => { return menuElement }

    const buildMenuElement = () => {
        initialiseCourseElement();
        getMenuElement().appendChild(getCourseElement());
        getCourseElement().appendChild(getHeadingStarterElement());
        buildConsumablesElement('Starter');
        getCourseElement().appendChild(getConsumablesElement());

        initialiseCourseElement();
        getMenuElement().appendChild(getCourseElement());
        getCourseElement().appendChild(getHeadingMainElement());
        buildConsumablesElement('Main');
        getCourseElement().appendChild(getConsumablesElement())
    }

    return { buildConsumablesElement, getMenuElement, buildMenuElement }
}

const Content = () => {
    const { buildMenuElement, getMenuElement } = MenuController();
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
        getContentElement().appendChild(getMenuElement());
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

    return { getContentElement, createNewContentElement, displayAboutContent, displayContactContent, buildMenuElement, displayMenuContent }
}

const Navigation = () => {
    const {
        getContentElement,
        createNewContentElement,
        buildMenuElement,
        displayMenuContent,
        displayAboutContent,
        displayContactContent,
    } = Content();

    const initialiseLandingPage = () => {
        buildMenuElement();
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
                        buildMenuElement();
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
const htmlMixin = () => {

    // makeElement currently only makes a div, but what if we want it to be dynamic
    // and for it to accept any html element type and create that dynamically?

    // well that got ugly fast, have to add a condition otherwise empty id and classes get assigned undefined
    // this pattern is okay for handling objects with properties as undefined properties are truly undefined
    // whereas DOM objects take 'undefined' as a string
    const makeElement = (obj = {}) => {
        const element = document.createElement('div');
        obj['id'] === void(0) ? element.id : element.id = obj['id'];
        obj['class'] === void(0) ?  element.classList : element.classList = obj['class'];
        obj['text'] === void(0) ? element.textContent : element.textContent = obj['text'];
        return element
    }

    const makeHeading = (title) => {
        const headingElement = makeElement({class: 'heading'});
        const heading = document.createElement('h1');
        heading.textContent = title
        headingElement.appendChild(heading)
        return headingElement
    }

    return { makeElement, makeHeading }
}

const main = (() => {
    const nav = Navigation();
    nav.initialiseLandingPage();
    nav.initialiseNavigation();

    return {}
})();
