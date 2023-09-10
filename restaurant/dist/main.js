/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// who: self\n// what: creating a webpage with three tabs which switches contents, does this all through javascript\n// when: now\n// where:  ./src/index.js and ./dist/index.html\n// why: handle data sent between objects, manage scope, develop project with webpack running in background,\n// how:\n// home page with about blurb\n// menu page with menu object + food + beverage\n// json data file to generate food and beverage objects\n// food objects have: type, course, name, description, price\n// beverage objects have: type, style, name, description, price\n// contact page with form object, fields and addresses\n\n// website object\n// displayController object\n// TODO make Order factory function shopping cart\n\n\n\nconst consumableFood = __webpack_require__ (/*! ./food.json */ \"./src/food.json\");\n\nconst Food = (obj = {}) => {\n    const course = obj['course']\n\n    const getCourse = () => { return course }\n    // TODO get pieces e.g. for spring rolls\n\n    return { getCourse };\n}\n\nconst Beverage = (obj = {}) => {\n    const style = obj['style'];\n\n    const getStyle = () => { return style }\n\n    return { getStyle };\n}\nconst Consumable = (obj = {}) => {\n    const name = obj['name'];\n    const description = obj['description'];\n    const price = obj['price'];\n    const { getCourse } = Food(obj);\n    const { getStyle } = Beverage(obj);\n    let type;\n\n    const getName = () => { return name }\n    const getDescription = () => { return description }\n    const getPrice = () => { return price}\n    const _setType = (consumable) => {\n        if ( getCourse() !== void(0) && getStyle() === void(0)) {\n            return type = \"Food\";\n        } else if ( getStyle() !== void(0) && getCourse() === void(0)) {\n            return type = \"Beverage\";\n        } else {\n            throw TypeError(\"Consumable is not a Food or Beverage.\");\n        }\n    }\n\n    _setType(obj);\n    const getType = () => { return type }\n\n    return { getType, getName, getDescription, getPrice, getCourse, getStyle };\n}\n\nconst Menu = () => {\n    const foodCollection = [];\n    const beverageCollection = [];\n\n    const collectConsumable = (consumable) => {\n        if (consumable.getType() === \"Food\") {\n            foodCollection.push(consumable)\n            console.log(\"Added consumable to foodCollection\")\n        } else if (consumable.getType() === \"Beverage\") {\n            beverageCollection.push(consumable)\n            console.log(\"Added consumable to beverageCollection\")\n        } else {\n            console.warn('Consumable is not a Food or Beverage.')\n        }\n    }\n\n    consumableFood.forEach(food => {\n        collectConsumable(Consumable(food))\n    })\n\n    const getFoodCollection = () => { return foodCollection }\n    const getBeverageCollection = () => { return beverageCollection }\n\n    return { getFoodCollection, getBeverageCollection }\n}\n\nconst htmlMixin = () => {\n\n    // makeElement currently only makes a div, but what if we want it to be dynamic\n    // and for it to accept any html element type and create that dynamically?\n\n    // well that got ugly fast, have to add a condition otherwise empty id and classes get assigned undefined\n    // this pattern is okay for handling objects with properties as undefined properties are truly undefined\n    // whereas DOM objects take 'undefined' as a string\n    const makeElement = (obj = {}) => {\n        const element = document.createElement('div');\n        obj['id'] === void(0) ? element.id : element.id = obj['id'];\n        obj['class'] === void(0) ?  element.classList : element.classList = obj['class'];\n        obj['text'] === void(0) ? element.textContent : element.textContent = obj['text'];\n        return element\n    }\n\n    return { makeElement }\n}\n\nconst MenuView = () => {\n    const { makeElement } = htmlMixin();\n\n    const buildConsumableElement = consumable => {\n        const consumableElement = makeElement({class: 'consumable'});\n        const topContainer = makeElement();\n        const bottomContainer = makeElement();\n\n        // initialise consumableNameElement as one line\n        // create a function definition...\n        // why return a function definition as a value\n        // when you can return a simple value instead\n        // returning a function definition allows state to be further changed when the function is invoked\n        // if the function doesn't change the state when invoked, then you should return a simple value instead\n\n        // apply becomes relevant because it enables rest parameters to be declared\n        // decoupling the function from always needing positional arguments\n        // using makeElement without arguments is fragile, but vanilla js allows for it\n\n        // visualise similar patterns, try to abstract it to increase readability\n\n        const consumableNameElement = makeElement({class: 'name', text: consumable.getName()});\n        const consumableDescriptionElement = makeElement({class: 'description', text: consumable.getDescription()});\n        const consumablePriceElement = makeElement({class: 'price', text: consumable.getPrice()});\n\n        topContainer.appendChild(consumableNameElement);\n        topContainer.appendChild(consumablePriceElement);\n        bottomContainer.appendChild(consumableDescriptionElement);\n\n        consumableElement.appendChild(topContainer);\n        consumableElement.appendChild(bottomContainer);\n\n        return consumableElement;\n    }\n\n    const makeHeading = (title) => {\n        const headingElement = makeElement({class: 'course'})\n        const heading = document.createElement('h1');\n        heading.textContent = title\n        headingElement.appendChild(heading)\n        return headingElement\n    }\n\n    const HeadingStarterElement = makeHeading('Starter');\n    const HeadingMainElement = makeHeading('Main');\n\n    return { buildConsumableElement, HeadingStarterElement, HeadingMainElement }\n}\n\nconst MenuController = () => {\n    const { getFoodCollection } = Menu();\n    const { buildConsumableElement, HeadingStarterElement, HeadingMainElement } = MenuView();\n\n    const menuElement = document.createDocumentFragment();\n\n    const getMenuElement = () => {\n        return menuElement;\n    }\n    const buildMenuElement = () => {\n        menuElement.appendChild(HeadingStarterElement);\n        menuElement.appendChild(HeadingMainElement);\n\n        getFoodCollection().forEach(item => {\n            switch (item.getCourse()) {\n                case 'Starter':\n                    HeadingStarterElement.appendChild(buildConsumableElement(item));\n                    break\n                case 'Main':\n                    HeadingMainElement.appendChild(buildConsumableElement(item));\n                    break\n            }\n        })\n    }\n\n    return { getFoodCollection, buildConsumableElement, getMenuElement, buildMenuElement }\n}\n\nconst Content = () => {\n    const { buildMenuElement, getMenuElement } = MenuController();\n    const { makeElement } = htmlMixin();\n\n    let contentElement = makeElement({id: 'content'});\n    const aboutContent = makeElement({text: 'about'});\n    const contactContent = makeElement({text: 'contact'});\n\n    const getContentElement = () => {\n        return contentElement\n    }\n    const createNewContentElement = () => {\n        return contentElement = makeElement({id: 'content'});\n    }\n\n    const displayMenuContent = () => {\n        getContentElement().appendChild(getMenuElement());\n        document.body.append(getContentElement());\n    }\n\n    const displayAboutContent = () => {\n        getContentElement().appendChild(aboutContent);\n        document.body.append(getContentElement());\n    }\n\n    const displayContactContent = () => {\n        getContentElement().appendChild(contactContent);\n        document.body.append(getContentElement())\n    }\n\n    return { getContentElement, createNewContentElement, displayAboutContent, displayContactContent, buildMenuElement, displayMenuContent }\n}\n\nconst Navigation = () => {\n    const {\n        getContentElement,\n        createNewContentElement,\n        buildMenuElement,\n        displayMenuContent,\n        displayAboutContent,\n        displayContactContent,\n    } = Content();\n\n    const initialiseLandingPage = () => {\n        buildMenuElement();\n        displayMenuContent();\n    }\n    const initialiseNavigation = () => {\n        const navElement = document.querySelector('nav')\n        const navItems = navElement.querySelectorAll('div')\n        navItems.forEach(item => {\n            item.addEventListener('click', () => {\n                getContentElement().remove();\n                createNewContentElement();\n\n                switch (item.getAttribute('data-navigation')) {\n                    case 'menu':\n                        buildMenuElement();\n                        displayMenuContent();\n                        break\n                    case 'about':\n                        displayAboutContent();\n                        break\n                    case 'contact':\n                        displayContactContent();\n                        break\n                    default:\n                        break\n                }\n            })\n        })\n    }\n\n    return { initialiseLandingPage, initialiseNavigation }\n}\n\nconst main = (() => {\n    const nav = Navigation();\n    nav.initialiseLandingPage();\n    nav.initialiseNavigation();\n\n    return {}\n})();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnQvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyB3aG86IHNlbGZcbi8vIHdoYXQ6IGNyZWF0aW5nIGEgd2VicGFnZSB3aXRoIHRocmVlIHRhYnMgd2hpY2ggc3dpdGNoZXMgY29udGVudHMsIGRvZXMgdGhpcyBhbGwgdGhyb3VnaCBqYXZhc2NyaXB0XG4vLyB3aGVuOiBub3dcbi8vIHdoZXJlOiAgLi9zcmMvaW5kZXguanMgYW5kIC4vZGlzdC9pbmRleC5odG1sXG4vLyB3aHk6IGhhbmRsZSBkYXRhIHNlbnQgYmV0d2VlbiBvYmplY3RzLCBtYW5hZ2Ugc2NvcGUsIGRldmVsb3AgcHJvamVjdCB3aXRoIHdlYnBhY2sgcnVubmluZyBpbiBiYWNrZ3JvdW5kLFxuLy8gaG93OlxuLy8gaG9tZSBwYWdlIHdpdGggYWJvdXQgYmx1cmJcbi8vIG1lbnUgcGFnZSB3aXRoIG1lbnUgb2JqZWN0ICsgZm9vZCArIGJldmVyYWdlXG4vLyBqc29uIGRhdGEgZmlsZSB0byBnZW5lcmF0ZSBmb29kIGFuZCBiZXZlcmFnZSBvYmplY3RzXG4vLyBmb29kIG9iamVjdHMgaGF2ZTogdHlwZSwgY291cnNlLCBuYW1lLCBkZXNjcmlwdGlvbiwgcHJpY2Vcbi8vIGJldmVyYWdlIG9iamVjdHMgaGF2ZTogdHlwZSwgc3R5bGUsIG5hbWUsIGRlc2NyaXB0aW9uLCBwcmljZVxuLy8gY29udGFjdCBwYWdlIHdpdGggZm9ybSBvYmplY3QsIGZpZWxkcyBhbmQgYWRkcmVzc2VzXG5cbi8vIHdlYnNpdGUgb2JqZWN0XG4vLyBkaXNwbGF5Q29udHJvbGxlciBvYmplY3Rcbi8vIFRPRE8gbWFrZSBPcmRlciBmYWN0b3J5IGZ1bmN0aW9uIHNob3BwaW5nIGNhcnRcblxuXCJ1c2Ugc3RyaWN0XCJcblxuY29uc3QgY29uc3VtYWJsZUZvb2QgPSByZXF1aXJlICgnLi9mb29kLmpzb24nKTtcblxuY29uc3QgRm9vZCA9IChvYmogPSB7fSkgPT4ge1xuICAgIGNvbnN0IGNvdXJzZSA9IG9ialsnY291cnNlJ11cblxuICAgIGNvbnN0IGdldENvdXJzZSA9ICgpID0+IHsgcmV0dXJuIGNvdXJzZSB9XG4gICAgLy8gVE9ETyBnZXQgcGllY2VzIGUuZy4gZm9yIHNwcmluZyByb2xsc1xuXG4gICAgcmV0dXJuIHsgZ2V0Q291cnNlIH07XG59XG5cbmNvbnN0IEJldmVyYWdlID0gKG9iaiA9IHt9KSA9PiB7XG4gICAgY29uc3Qgc3R5bGUgPSBvYmpbJ3N0eWxlJ107XG5cbiAgICBjb25zdCBnZXRTdHlsZSA9ICgpID0+IHsgcmV0dXJuIHN0eWxlIH1cblxuICAgIHJldHVybiB7IGdldFN0eWxlIH07XG59XG5jb25zdCBDb25zdW1hYmxlID0gKG9iaiA9IHt9KSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IG9ialsnbmFtZSddO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gb2JqWydkZXNjcmlwdGlvbiddO1xuICAgIGNvbnN0IHByaWNlID0gb2JqWydwcmljZSddO1xuICAgIGNvbnN0IHsgZ2V0Q291cnNlIH0gPSBGb29kKG9iaik7XG4gICAgY29uc3QgeyBnZXRTdHlsZSB9ID0gQmV2ZXJhZ2Uob2JqKTtcbiAgICBsZXQgdHlwZTtcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7IHJldHVybiBuYW1lIH1cbiAgICBjb25zdCBnZXREZXNjcmlwdGlvbiA9ICgpID0+IHsgcmV0dXJuIGRlc2NyaXB0aW9uIH1cbiAgICBjb25zdCBnZXRQcmljZSA9ICgpID0+IHsgcmV0dXJuIHByaWNlfVxuICAgIGNvbnN0IF9zZXRUeXBlID0gKGNvbnN1bWFibGUpID0+IHtcbiAgICAgICAgaWYgKCBnZXRDb3Vyc2UoKSAhPT0gdm9pZCgwKSAmJiBnZXRTdHlsZSgpID09PSB2b2lkKDApKSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZSA9IFwiRm9vZFwiO1xuICAgICAgICB9IGVsc2UgaWYgKCBnZXRTdHlsZSgpICE9PSB2b2lkKDApICYmIGdldENvdXJzZSgpID09PSB2b2lkKDApKSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZSA9IFwiQmV2ZXJhZ2VcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIkNvbnN1bWFibGUgaXMgbm90IGEgRm9vZCBvciBCZXZlcmFnZS5cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc2V0VHlwZShvYmopO1xuICAgIGNvbnN0IGdldFR5cGUgPSAoKSA9PiB7IHJldHVybiB0eXBlIH1cblxuICAgIHJldHVybiB7IGdldFR5cGUsIGdldE5hbWUsIGdldERlc2NyaXB0aW9uLCBnZXRQcmljZSwgZ2V0Q291cnNlLCBnZXRTdHlsZSB9O1xufVxuXG5jb25zdCBNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvb2RDb2xsZWN0aW9uID0gW107XG4gICAgY29uc3QgYmV2ZXJhZ2VDb2xsZWN0aW9uID0gW107XG5cbiAgICBjb25zdCBjb2xsZWN0Q29uc3VtYWJsZSA9IChjb25zdW1hYmxlKSA9PiB7XG4gICAgICAgIGlmIChjb25zdW1hYmxlLmdldFR5cGUoKSA9PT0gXCJGb29kXCIpIHtcbiAgICAgICAgICAgIGZvb2RDb2xsZWN0aW9uLnB1c2goY29uc3VtYWJsZSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRkZWQgY29uc3VtYWJsZSB0byBmb29kQ29sbGVjdGlvblwiKVxuICAgICAgICB9IGVsc2UgaWYgKGNvbnN1bWFibGUuZ2V0VHlwZSgpID09PSBcIkJldmVyYWdlXCIpIHtcbiAgICAgICAgICAgIGJldmVyYWdlQ29sbGVjdGlvbi5wdXNoKGNvbnN1bWFibGUpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFkZGVkIGNvbnN1bWFibGUgdG8gYmV2ZXJhZ2VDb2xsZWN0aW9uXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvbnN1bWFibGUgaXMgbm90IGEgRm9vZCBvciBCZXZlcmFnZS4nKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3VtYWJsZUZvb2QuZm9yRWFjaChmb29kID0+IHtcbiAgICAgICAgY29sbGVjdENvbnN1bWFibGUoQ29uc3VtYWJsZShmb29kKSlcbiAgICB9KVxuXG4gICAgY29uc3QgZ2V0Rm9vZENvbGxlY3Rpb24gPSAoKSA9PiB7IHJldHVybiBmb29kQ29sbGVjdGlvbiB9XG4gICAgY29uc3QgZ2V0QmV2ZXJhZ2VDb2xsZWN0aW9uID0gKCkgPT4geyByZXR1cm4gYmV2ZXJhZ2VDb2xsZWN0aW9uIH1cblxuICAgIHJldHVybiB7IGdldEZvb2RDb2xsZWN0aW9uLCBnZXRCZXZlcmFnZUNvbGxlY3Rpb24gfVxufVxuXG5jb25zdCBodG1sTWl4aW4gPSAoKSA9PiB7XG5cbiAgICAvLyBtYWtlRWxlbWVudCBjdXJyZW50bHkgb25seSBtYWtlcyBhIGRpdiwgYnV0IHdoYXQgaWYgd2Ugd2FudCBpdCB0byBiZSBkeW5hbWljXG4gICAgLy8gYW5kIGZvciBpdCB0byBhY2NlcHQgYW55IGh0bWwgZWxlbWVudCB0eXBlIGFuZCBjcmVhdGUgdGhhdCBkeW5hbWljYWxseT9cblxuICAgIC8vIHdlbGwgdGhhdCBnb3QgdWdseSBmYXN0LCBoYXZlIHRvIGFkZCBhIGNvbmRpdGlvbiBvdGhlcndpc2UgZW1wdHkgaWQgYW5kIGNsYXNzZXMgZ2V0IGFzc2lnbmVkIHVuZGVmaW5lZFxuICAgIC8vIHRoaXMgcGF0dGVybiBpcyBva2F5IGZvciBoYW5kbGluZyBvYmplY3RzIHdpdGggcHJvcGVydGllcyBhcyB1bmRlZmluZWQgcHJvcGVydGllcyBhcmUgdHJ1bHkgdW5kZWZpbmVkXG4gICAgLy8gd2hlcmVhcyBET00gb2JqZWN0cyB0YWtlICd1bmRlZmluZWQnIGFzIGEgc3RyaW5nXG4gICAgY29uc3QgbWFrZUVsZW1lbnQgPSAob2JqID0ge30pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBvYmpbJ2lkJ10gPT09IHZvaWQoMCkgPyBlbGVtZW50LmlkIDogZWxlbWVudC5pZCA9IG9ialsnaWQnXTtcbiAgICAgICAgb2JqWydjbGFzcyddID09PSB2b2lkKDApID8gIGVsZW1lbnQuY2xhc3NMaXN0IDogZWxlbWVudC5jbGFzc0xpc3QgPSBvYmpbJ2NsYXNzJ107XG4gICAgICAgIG9ialsndGV4dCddID09PSB2b2lkKDApID8gZWxlbWVudC50ZXh0Q29udGVudCA6IGVsZW1lbnQudGV4dENvbnRlbnQgPSBvYmpbJ3RleHQnXTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRcbiAgICB9XG5cbiAgICByZXR1cm4geyBtYWtlRWxlbWVudCB9XG59XG5cbmNvbnN0IE1lbnVWaWV3ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbWFrZUVsZW1lbnQgfSA9IGh0bWxNaXhpbigpO1xuXG4gICAgY29uc3QgYnVpbGRDb25zdW1hYmxlRWxlbWVudCA9IGNvbnN1bWFibGUgPT4ge1xuICAgICAgICBjb25zdCBjb25zdW1hYmxlRWxlbWVudCA9IG1ha2VFbGVtZW50KHtjbGFzczogJ2NvbnN1bWFibGUnfSk7XG4gICAgICAgIGNvbnN0IHRvcENvbnRhaW5lciA9IG1ha2VFbGVtZW50KCk7XG4gICAgICAgIGNvbnN0IGJvdHRvbUNvbnRhaW5lciA9IG1ha2VFbGVtZW50KCk7XG5cbiAgICAgICAgLy8gaW5pdGlhbGlzZSBjb25zdW1hYmxlTmFtZUVsZW1lbnQgYXMgb25lIGxpbmVcbiAgICAgICAgLy8gY3JlYXRlIGEgZnVuY3Rpb24gZGVmaW5pdGlvbi4uLlxuICAgICAgICAvLyB3aHkgcmV0dXJuIGEgZnVuY3Rpb24gZGVmaW5pdGlvbiBhcyBhIHZhbHVlXG4gICAgICAgIC8vIHdoZW4geW91IGNhbiByZXR1cm4gYSBzaW1wbGUgdmFsdWUgaW5zdGVhZFxuICAgICAgICAvLyByZXR1cm5pbmcgYSBmdW5jdGlvbiBkZWZpbml0aW9uIGFsbG93cyBzdGF0ZSB0byBiZSBmdXJ0aGVyIGNoYW5nZWQgd2hlbiB0aGUgZnVuY3Rpb24gaXMgaW52b2tlZFxuICAgICAgICAvLyBpZiB0aGUgZnVuY3Rpb24gZG9lc24ndCBjaGFuZ2UgdGhlIHN0YXRlIHdoZW4gaW52b2tlZCwgdGhlbiB5b3Ugc2hvdWxkIHJldHVybiBhIHNpbXBsZSB2YWx1ZSBpbnN0ZWFkXG5cbiAgICAgICAgLy8gYXBwbHkgYmVjb21lcyByZWxldmFudCBiZWNhdXNlIGl0IGVuYWJsZXMgcmVzdCBwYXJhbWV0ZXJzIHRvIGJlIGRlY2xhcmVkXG4gICAgICAgIC8vIGRlY291cGxpbmcgdGhlIGZ1bmN0aW9uIGZyb20gYWx3YXlzIG5lZWRpbmcgcG9zaXRpb25hbCBhcmd1bWVudHNcbiAgICAgICAgLy8gdXNpbmcgbWFrZUVsZW1lbnQgd2l0aG91dCBhcmd1bWVudHMgaXMgZnJhZ2lsZSwgYnV0IHZhbmlsbGEganMgYWxsb3dzIGZvciBpdFxuXG4gICAgICAgIC8vIHZpc3VhbGlzZSBzaW1pbGFyIHBhdHRlcm5zLCB0cnkgdG8gYWJzdHJhY3QgaXQgdG8gaW5jcmVhc2UgcmVhZGFiaWxpdHlcblxuICAgICAgICBjb25zdCBjb25zdW1hYmxlTmFtZUVsZW1lbnQgPSBtYWtlRWxlbWVudCh7Y2xhc3M6ICduYW1lJywgdGV4dDogY29uc3VtYWJsZS5nZXROYW1lKCl9KTtcbiAgICAgICAgY29uc3QgY29uc3VtYWJsZURlc2NyaXB0aW9uRWxlbWVudCA9IG1ha2VFbGVtZW50KHtjbGFzczogJ2Rlc2NyaXB0aW9uJywgdGV4dDogY29uc3VtYWJsZS5nZXREZXNjcmlwdGlvbigpfSk7XG4gICAgICAgIGNvbnN0IGNvbnN1bWFibGVQcmljZUVsZW1lbnQgPSBtYWtlRWxlbWVudCh7Y2xhc3M6ICdwcmljZScsIHRleHQ6IGNvbnN1bWFibGUuZ2V0UHJpY2UoKX0pO1xuXG4gICAgICAgIHRvcENvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zdW1hYmxlTmFtZUVsZW1lbnQpO1xuICAgICAgICB0b3BDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc3VtYWJsZVByaWNlRWxlbWVudCk7XG4gICAgICAgIGJvdHRvbUNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zdW1hYmxlRGVzY3JpcHRpb25FbGVtZW50KTtcblxuICAgICAgICBjb25zdW1hYmxlRWxlbWVudC5hcHBlbmRDaGlsZCh0b3BDb250YWluZXIpO1xuICAgICAgICBjb25zdW1hYmxlRWxlbWVudC5hcHBlbmRDaGlsZChib3R0b21Db250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBjb25zdW1hYmxlRWxlbWVudDtcbiAgICB9XG5cbiAgICBjb25zdCBtYWtlSGVhZGluZyA9ICh0aXRsZSkgPT4ge1xuICAgICAgICBjb25zdCBoZWFkaW5nRWxlbWVudCA9IG1ha2VFbGVtZW50KHtjbGFzczogJ2NvdXJzZSd9KVxuICAgICAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICAgICAgaGVhZGluZy50ZXh0Q29udGVudCA9IHRpdGxlXG4gICAgICAgIGhlYWRpbmdFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRpbmcpXG4gICAgICAgIHJldHVybiBoZWFkaW5nRWxlbWVudFxuICAgIH1cblxuICAgIGNvbnN0IEhlYWRpbmdTdGFydGVyRWxlbWVudCA9IG1ha2VIZWFkaW5nKCdTdGFydGVyJyk7XG4gICAgY29uc3QgSGVhZGluZ01haW5FbGVtZW50ID0gbWFrZUhlYWRpbmcoJ01haW4nKTtcblxuICAgIHJldHVybiB7IGJ1aWxkQ29uc3VtYWJsZUVsZW1lbnQsIEhlYWRpbmdTdGFydGVyRWxlbWVudCwgSGVhZGluZ01haW5FbGVtZW50IH1cbn1cblxuY29uc3QgTWVudUNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBnZXRGb29kQ29sbGVjdGlvbiB9ID0gTWVudSgpO1xuICAgIGNvbnN0IHsgYnVpbGRDb25zdW1hYmxlRWxlbWVudCwgSGVhZGluZ1N0YXJ0ZXJFbGVtZW50LCBIZWFkaW5nTWFpbkVsZW1lbnQgfSA9IE1lbnVWaWV3KCk7XG5cbiAgICBjb25zdCBtZW51RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIGNvbnN0IGdldE1lbnVFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gbWVudUVsZW1lbnQ7XG4gICAgfVxuICAgIGNvbnN0IGJ1aWxkTWVudUVsZW1lbnQgPSAoKSA9PiB7XG4gICAgICAgIG1lbnVFbGVtZW50LmFwcGVuZENoaWxkKEhlYWRpbmdTdGFydGVyRWxlbWVudCk7XG4gICAgICAgIG1lbnVFbGVtZW50LmFwcGVuZENoaWxkKEhlYWRpbmdNYWluRWxlbWVudCk7XG5cbiAgICAgICAgZ2V0Rm9vZENvbGxlY3Rpb24oKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldENvdXJzZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnU3RhcnRlcic6XG4gICAgICAgICAgICAgICAgICAgIEhlYWRpbmdTdGFydGVyRWxlbWVudC5hcHBlbmRDaGlsZChidWlsZENvbnN1bWFibGVFbGVtZW50KGl0ZW0pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlICdNYWluJzpcbiAgICAgICAgICAgICAgICAgICAgSGVhZGluZ01haW5FbGVtZW50LmFwcGVuZENoaWxkKGJ1aWxkQ29uc3VtYWJsZUVsZW1lbnQoaXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7IGdldEZvb2RDb2xsZWN0aW9uLCBidWlsZENvbnN1bWFibGVFbGVtZW50LCBnZXRNZW51RWxlbWVudCwgYnVpbGRNZW51RWxlbWVudCB9XG59XG5cbmNvbnN0IENvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBidWlsZE1lbnVFbGVtZW50LCBnZXRNZW51RWxlbWVudCB9ID0gTWVudUNvbnRyb2xsZXIoKTtcbiAgICBjb25zdCB7IG1ha2VFbGVtZW50IH0gPSBodG1sTWl4aW4oKTtcblxuICAgIGxldCBjb250ZW50RWxlbWVudCA9IG1ha2VFbGVtZW50KHtpZDogJ2NvbnRlbnQnfSk7XG4gICAgY29uc3QgYWJvdXRDb250ZW50ID0gbWFrZUVsZW1lbnQoe3RleHQ6ICdhYm91dCd9KTtcbiAgICBjb25zdCBjb250YWN0Q29udGVudCA9IG1ha2VFbGVtZW50KHt0ZXh0OiAnY29udGFjdCd9KTtcblxuICAgIGNvbnN0IGdldENvbnRlbnRFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY29udGVudEVsZW1lbnRcbiAgICB9XG4gICAgY29uc3QgY3JlYXRlTmV3Q29udGVudEVsZW1lbnQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjb250ZW50RWxlbWVudCA9IG1ha2VFbGVtZW50KHtpZDogJ2NvbnRlbnQnfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzcGxheU1lbnVDb250ZW50ID0gKCkgPT4ge1xuICAgICAgICBnZXRDb250ZW50RWxlbWVudCgpLmFwcGVuZENoaWxkKGdldE1lbnVFbGVtZW50KCkpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChnZXRDb250ZW50RWxlbWVudCgpKTtcbiAgICB9XG5cbiAgICBjb25zdCBkaXNwbGF5QWJvdXRDb250ZW50ID0gKCkgPT4ge1xuICAgICAgICBnZXRDb250ZW50RWxlbWVudCgpLmFwcGVuZENoaWxkKGFib3V0Q29udGVudCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGdldENvbnRlbnRFbGVtZW50KCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlDb250YWN0Q29udGVudCA9ICgpID0+IHtcbiAgICAgICAgZ2V0Q29udGVudEVsZW1lbnQoKS5hcHBlbmRDaGlsZChjb250YWN0Q29udGVudCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGdldENvbnRlbnRFbGVtZW50KCkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgZ2V0Q29udGVudEVsZW1lbnQsIGNyZWF0ZU5ld0NvbnRlbnRFbGVtZW50LCBkaXNwbGF5QWJvdXRDb250ZW50LCBkaXNwbGF5Q29udGFjdENvbnRlbnQsIGJ1aWxkTWVudUVsZW1lbnQsIGRpc3BsYXlNZW51Q29udGVudCB9XG59XG5cbmNvbnN0IE5hdmlnYXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgICBnZXRDb250ZW50RWxlbWVudCxcbiAgICAgICAgY3JlYXRlTmV3Q29udGVudEVsZW1lbnQsXG4gICAgICAgIGJ1aWxkTWVudUVsZW1lbnQsXG4gICAgICAgIGRpc3BsYXlNZW51Q29udGVudCxcbiAgICAgICAgZGlzcGxheUFib3V0Q29udGVudCxcbiAgICAgICAgZGlzcGxheUNvbnRhY3RDb250ZW50LFxuICAgIH0gPSBDb250ZW50KCk7XG5cbiAgICBjb25zdCBpbml0aWFsaXNlTGFuZGluZ1BhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGJ1aWxkTWVudUVsZW1lbnQoKTtcbiAgICAgICAgZGlzcGxheU1lbnVDb250ZW50KCk7XG4gICAgfVxuICAgIGNvbnN0IGluaXRpYWxpc2VOYXZpZ2F0aW9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbmF2JylcbiAgICAgICAgY29uc3QgbmF2SXRlbXMgPSBuYXZFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpXG4gICAgICAgIG5hdkl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdldENvbnRlbnRFbGVtZW50KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgY3JlYXRlTmV3Q29udGVudEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbmF2aWdhdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21lbnUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRNZW51RWxlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU1lbnVDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdhYm91dCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5QWJvdXRDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjb250YWN0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlDb250YWN0Q29udGVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4geyBpbml0aWFsaXNlTGFuZGluZ1BhZ2UsIGluaXRpYWxpc2VOYXZpZ2F0aW9uIH1cbn1cblxuY29uc3QgbWFpbiA9ICgoKSA9PiB7XG4gICAgY29uc3QgbmF2ID0gTmF2aWdhdGlvbigpO1xuICAgIG5hdi5pbml0aWFsaXNlTGFuZGluZ1BhZ2UoKTtcbiAgICBuYXYuaW5pdGlhbGlzZU5hdmlnYXRpb24oKTtcblxuICAgIHJldHVybiB7fVxufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/food.json":
/*!***********************!*\
  !*** ./src/food.json ***!
  \***********************/
/***/ ((module) => {

module.exports = JSON.parse('[{"name":"Laksa Soup","description":"Coconut-based spicy soup","price":"20.80","course":"Main"},{"name":"Chicken Wing","description":"Deep fried specially made chicken wing","price":"9.80","course":"Starter"},{"name":"Mini Spring Roll","description":"Deep fried mini spring rolls, served with sweet chilli sauce","price":"10.80","course":"Starter"},{"name":"Malay Tofu","description":"Crispy yum nom tofu with cucumber, carrots, sesame, sweet chilli sauce. Crispy outside and soft inside","price":"12.80","course":"Starter"},{"name":"Hand-made Wonton","description":"Crunchy golden brown chicken prawn wonton","price":"10.80","course":"Starter"},{"name":"Satay Chicken","description":"Flavor-marinated chicken skewers with peanut sauce","price":"13.80","course":"Starter"}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;