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

const MenuView = () => {
    const containerElement = document.createDocumentFragment();

    const getMenuElements = () => {
        return containerElement;
    }
    const buildMenuElements = (obj) => {
        const content = document.createElement('div');
        content.classList.add('consumable');

        const topContainer = document.createElement('div');
        const bottomContainer = document.createElement('div');

        const consumableNameElement = document.createElement('div');
        const consumableDescriptionElement = document.createElement('div');
        const consumablePriceElement = document.createElement('div');

        consumableNameElement.classList.add('name')
        consumableDescriptionElement.classList.add('description')
        consumablePriceElement.classList.add('price')

        consumableNameElement.textContent = obj.getName()
        consumableDescriptionElement.textContent = obj.getDescription();
        consumablePriceElement.textContent = obj.getPrice();

        topContainer.appendChild(consumableNameElement);
        topContainer.appendChild(consumablePriceElement);
        bottomContainer.appendChild(consumableDescriptionElement);

        content.appendChild(topContainer);
        content.appendChild(bottomContainer);

        return containerElement.appendChild(content);
    }

    return { getMenuElements, buildMenuElements }
}

const MenuController = () => {
    const { getFoodCollection } = Menu();
    const { getMenuElements, buildMenuElements } = MenuView();

    const buildMenu = () => {
        getFoodCollection().forEach(item => {
            buildMenuElements(item);
        })
    }

    return { getFoodCollection, buildMenuElements, getMenuElements, buildMenu }
}

const Content = () => {
    const { buildMenu, getMenuElements } = MenuController();

    let contentElement = document.createElement('div');
    const aboutContent = document.createElement('div');
    const contactContent = document.createElement('div');
    contentElement.id = 'content'
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

    const displayMenuContent = () => {
        getContentElement().appendChild(getMenuElements());
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
