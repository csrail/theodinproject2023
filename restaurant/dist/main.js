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

eval("// who: self\n// what: creating a webpage with three tabs which switches contents, does this all through javascript\n// when: now\n// where:  ./src/index.js and ./dist/index.html\n// why: handle data sent between objects, manage scope, develop project with webpack running in background,\n// how:\n// home page with about blurb\n// menu page with menu object + food + beverage\n// json data file to generate food and beverage objects\n// food objects have: type, course, name, description, price\n// beverage objects have: type, style, name, description, price\n// contact page with form object, fields and addresses\n\n// website object\n// displayController object\n// TODO make Order factory function shopping cart\n\n\n\nconst jsonConsumables = __webpack_require__ (/*! ./food.json */ \"./src/food.json\");\n\nconst Food = (obj = {}) => {\n    const course = obj['course']\n\n    const getCourse = () => { return course }\n    // TODO get pieces e.g. for spring rolls\n\n    return { getCourse };\n}\n\nconst Beverage = (obj = {}) => {\n    const style = obj['style'];\n\n    const getStyle = () => { return style }\n\n    return { getStyle };\n}\nconst Consumable = (obj = {}) => {\n    const name = obj['name'];\n    const description = obj['description'];\n    const price = obj['price'];\n    const { getCourse } = Food(obj);\n    const { getStyle } = Beverage(obj);\n    let type;\n\n    const getName = () => { return name }\n    const getDescription = () => { return description }\n    const getPrice = () => { return price}\n    const _setType = () => {\n        if ( getCourse() !== void(0) && getStyle() === void(0)) {\n            return type = \"Food\";\n        } else if ( getStyle() !== void(0) && getCourse() === void(0)) {\n            return type = \"Beverage\";\n        } else {\n            throw TypeError(\"Consumable is not a Food or Beverage.\");\n        }\n    }\n\n    const getType = () => {\n        type === void(0) ? _setType() : type\n        return type\n    }\n\n    return { getType, getName, getDescription, getPrice, getCourse, getStyle };\n}\n\nconst Menu = (consumables) => {\n    const foodCollection = [];\n    const beverageCollection = [];\n\n    const _collectConsumable = (consumable) => {\n        if (consumable.getType() === \"Food\") {\n            foodCollection.push(consumable)\n            console.log(\"Added consumable to foodCollection\")\n        } else if (consumable.getType() === \"Beverage\") {\n            beverageCollection.push(consumable)\n            console.log(\"Added consumable to beverageCollection\")\n        } else {\n            console.warn('Consumable is not a Food or Beverage.')\n        }\n    }\n\n    const _collectConsumables = () => {\n        consumables.forEach(food => {\n            _collectConsumable(Consumable(food));\n        })\n    }\n\n    const getFoodCollection = () => {\n        foodCollection.length === 0 ? _collectConsumables(consumables) : foodCollection\n        return foodCollection\n    }\n    const getBeverageCollection = () => { return beverageCollection }\n\n    return { getFoodCollection, getBeverageCollection }\n}\n\nconst MenuView = () => {\n    const { makeElement, makeHeading } = htmlMixin();\n    const { getFoodCollection } = Menu(jsonConsumables);\n\n    let courseElement\n    let consumablesElement\n    const HeadingStarterElement = makeHeading('Starter');\n    const HeadingMainElement = makeHeading('Main');\n\n    const initialiseConsumablesElement = () => {\n        return consumablesElement = makeElement({class: 'consumables'})\n    }\n\n    const initialiseCourseElement = () => {\n        return courseElement = makeElement({class: 'course'})\n    }\n\n    const getCourseElement = () => { return courseElement }\n\n    const getConsumablesElement = () => { return consumablesElement }\n\n    const getHeadingStarterElement = () => { return HeadingStarterElement }\n\n    const getHeadingMainElement = () => { return HeadingMainElement }\n\n    const buildConsumableElement = consumable => {\n        const consumableElement = makeElement({class: 'consumable'});\n        const topContainer = makeElement();\n        const bottomContainer = makeElement();\n\n        const consumableNameElement = makeElement({class: 'name', text: consumable.getName()});\n        const consumableDescriptionElement = makeElement({class: 'description', text: consumable.getDescription()});\n        const consumablePriceElement = makeElement({class: 'price', text: consumable.getPrice()});\n\n        topContainer.appendChild(consumableNameElement);\n        topContainer.appendChild(consumablePriceElement);\n        bottomContainer.appendChild(consumableDescriptionElement);\n\n        consumableElement.appendChild(topContainer);\n        consumableElement.appendChild(bottomContainer);\n\n        return consumableElement;\n    }\n\n    const buildConsumablesElement = (course) => {\n        initialiseConsumablesElement();\n        getFoodCollection().forEach( item => {\n            if (course === 'Starter' && item.getCourse() === 'Starter') {\n                getConsumablesElement().appendChild(buildConsumableElement(item));\n            } else if (course === 'Main' && item.getCourse() === 'Main') {\n                getConsumablesElement().appendChild(buildConsumableElement(item));\n            }\n        })\n    }\n\n    return {\n        getConsumablesElement,\n        buildConsumablesElement,\n        getHeadingStarterElement,\n        getHeadingMainElement,\n        getCourseElement,\n        initialiseCourseElement\n    }\n}\n\nconst MenuController = () => {\n    const {\n        getConsumablesElement,\n        buildConsumablesElement,\n        getHeadingStarterElement,\n        getHeadingMainElement,\n        getCourseElement,\n        initialiseCourseElement,\n    } = MenuView();\n\n    const menuElement = document.createDocumentFragment();\n\n    const getMenuElement = () => { return menuElement }\n\n    const buildMenuElement = () => {\n        initialiseCourseElement();\n        getMenuElement().appendChild(getCourseElement());\n        getCourseElement().appendChild(getHeadingStarterElement());\n        buildConsumablesElement('Starter');\n        getCourseElement().appendChild(getConsumablesElement());\n\n        initialiseCourseElement();\n        getMenuElement().appendChild(getCourseElement());\n        getCourseElement().appendChild(getHeadingMainElement());\n        buildConsumablesElement('Main');\n        getCourseElement().appendChild(getConsumablesElement())\n    }\n\n    return { buildConsumablesElement, getMenuElement, buildMenuElement }\n}\n\nconst Content = () => {\n    const { buildMenuElement, getMenuElement } = MenuController();\n    const { makeElement } = htmlMixin();\n\n    let contentElement = makeElement({id: 'content'});\n    const aboutContent = makeElement({text: 'about'});\n    const contactContent = makeElement({text: 'contact'});\n\n    const getContentElement = () => {\n        return contentElement\n    }\n    const createNewContentElement = () => {\n        return contentElement = makeElement({id: 'content'});\n    }\n\n    const displayMenuContent = () => {\n        getContentElement().appendChild(getMenuElement());\n        return document.body.append(getContentElement());\n    }\n\n    const getMenuContent = () => {\n        buildMenuElement();\n        displayMenuContent();\n    }\n\n    const displayAboutContent = () => {\n        getContentElement().appendChild(aboutContent);\n        return document.body.append(getContentElement());\n    }\n\n    const getAboutContent = () => {\n       return displayAboutContent();\n    }\n\n    const displayContactContent = () => {\n        getContentElement().appendChild(contactContent);\n        return document.body.append(getContentElement())\n    }\n\n    const getContactContent = () => {\n        return displayContactContent();\n    }\n\n    const resetContentElement = () => {\n        getContentElement().remove();\n        createNewContentElement();\n    }\n\n    const getContent = (content) => {\n        if (content === 'menu') {\n            getMenuContent();\n        } else if (content === 'about') {\n            getAboutContent();\n        } else if (content === 'contact') {\n            getContactContent()\n        }\n    }\n\n    const initialiseContent = () => {\n        getMenuContent();\n    }\n\n    return {\n        resetContentElement,\n        getContent,\n        initialiseContent,\n    }\n}\n\nconst Navigation = () => {\n    const {\n        resetContentElement,\n        getContent,\n        initialiseContent,\n    } = Content();\n\n    const initialiseLandingPage = () => {\n        initialiseContent();\n    }\n    const initialiseNavigation = () => {\n        const navElement = document.querySelector('nav')\n        const navItems = navElement.querySelectorAll('div')\n        navItems.forEach(item => {\n            item.addEventListener('click', () => {\n                resetContentElement();\n                getContent(item.getAttribute('data-navigation'))\n            })\n        })\n    }\n\n    return { initialiseLandingPage, initialiseNavigation }\n}\nconst htmlMixin = () => {\n\n    // makeElement currently only makes a div, but what if we want it to be dynamic\n    // and for it to accept any html element type and create that dynamically?\n\n    // well that got ugly fast, have to add a condition otherwise empty id and classes get assigned undefined\n    // this pattern is okay for handling objects with properties as undefined properties are truly undefined\n    // whereas DOM objects take 'undefined' as a string\n    const makeElement = (obj = {}) => {\n        const element = document.createElement('div');\n        obj['id'] === void(0) ? element.id : element.id = obj['id'];\n        obj['class'] === void(0) ?  element.classList : element.classList = obj['class'];\n        obj['text'] === void(0) ? element.textContent : element.textContent = obj['text'];\n        return element\n    }\n\n    const makeHeading = (title) => {\n        const headingElement = makeElement({class: 'heading'});\n        const heading = document.createElement('h1');\n        heading.textContent = title\n        headingElement.appendChild(heading)\n        return headingElement\n    }\n\n    return { makeElement, makeHeading }\n}\n\nconst main = (() => {\n    const nav = Navigation();\n    nav.initialiseLandingPage();\n    nav.initialiseNavigation();\n\n    return {}\n})();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gd2hvOiBzZWxmXG4vLyB3aGF0OiBjcmVhdGluZyBhIHdlYnBhZ2Ugd2l0aCB0aHJlZSB0YWJzIHdoaWNoIHN3aXRjaGVzIGNvbnRlbnRzLCBkb2VzIHRoaXMgYWxsIHRocm91Z2ggamF2YXNjcmlwdFxuLy8gd2hlbjogbm93XG4vLyB3aGVyZTogIC4vc3JjL2luZGV4LmpzIGFuZCAuL2Rpc3QvaW5kZXguaHRtbFxuLy8gd2h5OiBoYW5kbGUgZGF0YSBzZW50IGJldHdlZW4gb2JqZWN0cywgbWFuYWdlIHNjb3BlLCBkZXZlbG9wIHByb2plY3Qgd2l0aCB3ZWJwYWNrIHJ1bm5pbmcgaW4gYmFja2dyb3VuZCxcbi8vIGhvdzpcbi8vIGhvbWUgcGFnZSB3aXRoIGFib3V0IGJsdXJiXG4vLyBtZW51IHBhZ2Ugd2l0aCBtZW51IG9iamVjdCArIGZvb2QgKyBiZXZlcmFnZVxuLy8ganNvbiBkYXRhIGZpbGUgdG8gZ2VuZXJhdGUgZm9vZCBhbmQgYmV2ZXJhZ2Ugb2JqZWN0c1xuLy8gZm9vZCBvYmplY3RzIGhhdmU6IHR5cGUsIGNvdXJzZSwgbmFtZSwgZGVzY3JpcHRpb24sIHByaWNlXG4vLyBiZXZlcmFnZSBvYmplY3RzIGhhdmU6IHR5cGUsIHN0eWxlLCBuYW1lLCBkZXNjcmlwdGlvbiwgcHJpY2Vcbi8vIGNvbnRhY3QgcGFnZSB3aXRoIGZvcm0gb2JqZWN0LCBmaWVsZHMgYW5kIGFkZHJlc3Nlc1xuXG4vLyB3ZWJzaXRlIG9iamVjdFxuLy8gZGlzcGxheUNvbnRyb2xsZXIgb2JqZWN0XG4vLyBUT0RPIG1ha2UgT3JkZXIgZmFjdG9yeSBmdW5jdGlvbiBzaG9wcGluZyBjYXJ0XG5cblwidXNlIHN0cmljdFwiXG5cbmNvbnN0IGpzb25Db25zdW1hYmxlcyA9IHJlcXVpcmUgKCcuL2Zvb2QuanNvbicpO1xuXG5jb25zdCBGb29kID0gKG9iaiA9IHt9KSA9PiB7XG4gICAgY29uc3QgY291cnNlID0gb2JqWydjb3Vyc2UnXVxuXG4gICAgY29uc3QgZ2V0Q291cnNlID0gKCkgPT4geyByZXR1cm4gY291cnNlIH1cbiAgICAvLyBUT0RPIGdldCBwaWVjZXMgZS5nLiBmb3Igc3ByaW5nIHJvbGxzXG5cbiAgICByZXR1cm4geyBnZXRDb3Vyc2UgfTtcbn1cblxuY29uc3QgQmV2ZXJhZ2UgPSAob2JqID0ge30pID0+IHtcbiAgICBjb25zdCBzdHlsZSA9IG9ialsnc3R5bGUnXTtcblxuICAgIGNvbnN0IGdldFN0eWxlID0gKCkgPT4geyByZXR1cm4gc3R5bGUgfVxuXG4gICAgcmV0dXJuIHsgZ2V0U3R5bGUgfTtcbn1cbmNvbnN0IENvbnN1bWFibGUgPSAob2JqID0ge30pID0+IHtcbiAgICBjb25zdCBuYW1lID0gb2JqWyduYW1lJ107XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBvYmpbJ2Rlc2NyaXB0aW9uJ107XG4gICAgY29uc3QgcHJpY2UgPSBvYmpbJ3ByaWNlJ107XG4gICAgY29uc3QgeyBnZXRDb3Vyc2UgfSA9IEZvb2Qob2JqKTtcbiAgICBjb25zdCB7IGdldFN0eWxlIH0gPSBCZXZlcmFnZShvYmopO1xuICAgIGxldCB0eXBlO1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHsgcmV0dXJuIG5hbWUgfVxuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4geyByZXR1cm4gZGVzY3JpcHRpb24gfVxuICAgIGNvbnN0IGdldFByaWNlID0gKCkgPT4geyByZXR1cm4gcHJpY2V9XG4gICAgY29uc3QgX3NldFR5cGUgPSAoKSA9PiB7XG4gICAgICAgIGlmICggZ2V0Q291cnNlKCkgIT09IHZvaWQoMCkgJiYgZ2V0U3R5bGUoKSA9PT0gdm9pZCgwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPSBcIkZvb2RcIjtcbiAgICAgICAgfSBlbHNlIGlmICggZ2V0U3R5bGUoKSAhPT0gdm9pZCgwKSAmJiBnZXRDb3Vyc2UoKSA9PT0gdm9pZCgwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPSBcIkJldmVyYWdlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJDb25zdW1hYmxlIGlzIG5vdCBhIEZvb2Qgb3IgQmV2ZXJhZ2UuXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0VHlwZSA9ICgpID0+IHtcbiAgICAgICAgdHlwZSA9PT0gdm9pZCgwKSA/IF9zZXRUeXBlKCkgOiB0eXBlXG4gICAgICAgIHJldHVybiB0eXBlXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgZ2V0VHlwZSwgZ2V0TmFtZSwgZ2V0RGVzY3JpcHRpb24sIGdldFByaWNlLCBnZXRDb3Vyc2UsIGdldFN0eWxlIH07XG59XG5cbmNvbnN0IE1lbnUgPSAoY29uc3VtYWJsZXMpID0+IHtcbiAgICBjb25zdCBmb29kQ29sbGVjdGlvbiA9IFtdO1xuICAgIGNvbnN0IGJldmVyYWdlQ29sbGVjdGlvbiA9IFtdO1xuXG4gICAgY29uc3QgX2NvbGxlY3RDb25zdW1hYmxlID0gKGNvbnN1bWFibGUpID0+IHtcbiAgICAgICAgaWYgKGNvbnN1bWFibGUuZ2V0VHlwZSgpID09PSBcIkZvb2RcIikge1xuICAgICAgICAgICAgZm9vZENvbGxlY3Rpb24ucHVzaChjb25zdW1hYmxlKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBZGRlZCBjb25zdW1hYmxlIHRvIGZvb2RDb2xsZWN0aW9uXCIpXG4gICAgICAgIH0gZWxzZSBpZiAoY29uc3VtYWJsZS5nZXRUeXBlKCkgPT09IFwiQmV2ZXJhZ2VcIikge1xuICAgICAgICAgICAgYmV2ZXJhZ2VDb2xsZWN0aW9uLnB1c2goY29uc3VtYWJsZSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRkZWQgY29uc3VtYWJsZSB0byBiZXZlcmFnZUNvbGxlY3Rpb25cIilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQ29uc3VtYWJsZSBpcyBub3QgYSBGb29kIG9yIEJldmVyYWdlLicpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBfY29sbGVjdENvbnN1bWFibGVzID0gKCkgPT4ge1xuICAgICAgICBjb25zdW1hYmxlcy5mb3JFYWNoKGZvb2QgPT4ge1xuICAgICAgICAgICAgX2NvbGxlY3RDb25zdW1hYmxlKENvbnN1bWFibGUoZm9vZCkpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGdldEZvb2RDb2xsZWN0aW9uID0gKCkgPT4ge1xuICAgICAgICBmb29kQ29sbGVjdGlvbi5sZW5ndGggPT09IDAgPyBfY29sbGVjdENvbnN1bWFibGVzKGNvbnN1bWFibGVzKSA6IGZvb2RDb2xsZWN0aW9uXG4gICAgICAgIHJldHVybiBmb29kQ29sbGVjdGlvblxuICAgIH1cbiAgICBjb25zdCBnZXRCZXZlcmFnZUNvbGxlY3Rpb24gPSAoKSA9PiB7IHJldHVybiBiZXZlcmFnZUNvbGxlY3Rpb24gfVxuXG4gICAgcmV0dXJuIHsgZ2V0Rm9vZENvbGxlY3Rpb24sIGdldEJldmVyYWdlQ29sbGVjdGlvbiB9XG59XG5cbmNvbnN0IE1lbnVWaWV3ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbWFrZUVsZW1lbnQsIG1ha2VIZWFkaW5nIH0gPSBodG1sTWl4aW4oKTtcbiAgICBjb25zdCB7IGdldEZvb2RDb2xsZWN0aW9uIH0gPSBNZW51KGpzb25Db25zdW1hYmxlcyk7XG5cbiAgICBsZXQgY291cnNlRWxlbWVudFxuICAgIGxldCBjb25zdW1hYmxlc0VsZW1lbnRcbiAgICBjb25zdCBIZWFkaW5nU3RhcnRlckVsZW1lbnQgPSBtYWtlSGVhZGluZygnU3RhcnRlcicpO1xuICAgIGNvbnN0IEhlYWRpbmdNYWluRWxlbWVudCA9IG1ha2VIZWFkaW5nKCdNYWluJyk7XG5cbiAgICBjb25zdCBpbml0aWFsaXNlQ29uc3VtYWJsZXNFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY29uc3VtYWJsZXNFbGVtZW50ID0gbWFrZUVsZW1lbnQoe2NsYXNzOiAnY29uc3VtYWJsZXMnfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0aWFsaXNlQ291cnNlRWxlbWVudCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvdXJzZUVsZW1lbnQgPSBtYWtlRWxlbWVudCh7Y2xhc3M6ICdjb3Vyc2UnfSlcbiAgICB9XG5cbiAgICBjb25zdCBnZXRDb3Vyc2VFbGVtZW50ID0gKCkgPT4geyByZXR1cm4gY291cnNlRWxlbWVudCB9XG5cbiAgICBjb25zdCBnZXRDb25zdW1hYmxlc0VsZW1lbnQgPSAoKSA9PiB7IHJldHVybiBjb25zdW1hYmxlc0VsZW1lbnQgfVxuXG4gICAgY29uc3QgZ2V0SGVhZGluZ1N0YXJ0ZXJFbGVtZW50ID0gKCkgPT4geyByZXR1cm4gSGVhZGluZ1N0YXJ0ZXJFbGVtZW50IH1cblxuICAgIGNvbnN0IGdldEhlYWRpbmdNYWluRWxlbWVudCA9ICgpID0+IHsgcmV0dXJuIEhlYWRpbmdNYWluRWxlbWVudCB9XG5cbiAgICBjb25zdCBidWlsZENvbnN1bWFibGVFbGVtZW50ID0gY29uc3VtYWJsZSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnN1bWFibGVFbGVtZW50ID0gbWFrZUVsZW1lbnQoe2NsYXNzOiAnY29uc3VtYWJsZSd9KTtcbiAgICAgICAgY29uc3QgdG9wQ29udGFpbmVyID0gbWFrZUVsZW1lbnQoKTtcbiAgICAgICAgY29uc3QgYm90dG9tQ29udGFpbmVyID0gbWFrZUVsZW1lbnQoKTtcblxuICAgICAgICBjb25zdCBjb25zdW1hYmxlTmFtZUVsZW1lbnQgPSBtYWtlRWxlbWVudCh7Y2xhc3M6ICduYW1lJywgdGV4dDogY29uc3VtYWJsZS5nZXROYW1lKCl9KTtcbiAgICAgICAgY29uc3QgY29uc3VtYWJsZURlc2NyaXB0aW9uRWxlbWVudCA9IG1ha2VFbGVtZW50KHtjbGFzczogJ2Rlc2NyaXB0aW9uJywgdGV4dDogY29uc3VtYWJsZS5nZXREZXNjcmlwdGlvbigpfSk7XG4gICAgICAgIGNvbnN0IGNvbnN1bWFibGVQcmljZUVsZW1lbnQgPSBtYWtlRWxlbWVudCh7Y2xhc3M6ICdwcmljZScsIHRleHQ6IGNvbnN1bWFibGUuZ2V0UHJpY2UoKX0pO1xuXG4gICAgICAgIHRvcENvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zdW1hYmxlTmFtZUVsZW1lbnQpO1xuICAgICAgICB0b3BDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uc3VtYWJsZVByaWNlRWxlbWVudCk7XG4gICAgICAgIGJvdHRvbUNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25zdW1hYmxlRGVzY3JpcHRpb25FbGVtZW50KTtcblxuICAgICAgICBjb25zdW1hYmxlRWxlbWVudC5hcHBlbmRDaGlsZCh0b3BDb250YWluZXIpO1xuICAgICAgICBjb25zdW1hYmxlRWxlbWVudC5hcHBlbmRDaGlsZChib3R0b21Db250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBjb25zdW1hYmxlRWxlbWVudDtcbiAgICB9XG5cbiAgICBjb25zdCBidWlsZENvbnN1bWFibGVzRWxlbWVudCA9IChjb3Vyc2UpID0+IHtcbiAgICAgICAgaW5pdGlhbGlzZUNvbnN1bWFibGVzRWxlbWVudCgpO1xuICAgICAgICBnZXRGb29kQ29sbGVjdGlvbigpLmZvckVhY2goIGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGNvdXJzZSA9PT0gJ1N0YXJ0ZXInICYmIGl0ZW0uZ2V0Q291cnNlKCkgPT09ICdTdGFydGVyJykge1xuICAgICAgICAgICAgICAgIGdldENvbnN1bWFibGVzRWxlbWVudCgpLmFwcGVuZENoaWxkKGJ1aWxkQ29uc3VtYWJsZUVsZW1lbnQoaXRlbSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb3Vyc2UgPT09ICdNYWluJyAmJiBpdGVtLmdldENvdXJzZSgpID09PSAnTWFpbicpIHtcbiAgICAgICAgICAgICAgICBnZXRDb25zdW1hYmxlc0VsZW1lbnQoKS5hcHBlbmRDaGlsZChidWlsZENvbnN1bWFibGVFbGVtZW50KGl0ZW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRDb25zdW1hYmxlc0VsZW1lbnQsXG4gICAgICAgIGJ1aWxkQ29uc3VtYWJsZXNFbGVtZW50LFxuICAgICAgICBnZXRIZWFkaW5nU3RhcnRlckVsZW1lbnQsXG4gICAgICAgIGdldEhlYWRpbmdNYWluRWxlbWVudCxcbiAgICAgICAgZ2V0Q291cnNlRWxlbWVudCxcbiAgICAgICAgaW5pdGlhbGlzZUNvdXJzZUVsZW1lbnRcbiAgICB9XG59XG5cbmNvbnN0IE1lbnVDb250cm9sbGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgZ2V0Q29uc3VtYWJsZXNFbGVtZW50LFxuICAgICAgICBidWlsZENvbnN1bWFibGVzRWxlbWVudCxcbiAgICAgICAgZ2V0SGVhZGluZ1N0YXJ0ZXJFbGVtZW50LFxuICAgICAgICBnZXRIZWFkaW5nTWFpbkVsZW1lbnQsXG4gICAgICAgIGdldENvdXJzZUVsZW1lbnQsXG4gICAgICAgIGluaXRpYWxpc2VDb3Vyc2VFbGVtZW50LFxuICAgIH0gPSBNZW51VmlldygpO1xuXG4gICAgY29uc3QgbWVudUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBjb25zdCBnZXRNZW51RWxlbWVudCA9ICgpID0+IHsgcmV0dXJuIG1lbnVFbGVtZW50IH1cblxuICAgIGNvbnN0IGJ1aWxkTWVudUVsZW1lbnQgPSAoKSA9PiB7XG4gICAgICAgIGluaXRpYWxpc2VDb3Vyc2VFbGVtZW50KCk7XG4gICAgICAgIGdldE1lbnVFbGVtZW50KCkuYXBwZW5kQ2hpbGQoZ2V0Q291cnNlRWxlbWVudCgpKTtcbiAgICAgICAgZ2V0Q291cnNlRWxlbWVudCgpLmFwcGVuZENoaWxkKGdldEhlYWRpbmdTdGFydGVyRWxlbWVudCgpKTtcbiAgICAgICAgYnVpbGRDb25zdW1hYmxlc0VsZW1lbnQoJ1N0YXJ0ZXInKTtcbiAgICAgICAgZ2V0Q291cnNlRWxlbWVudCgpLmFwcGVuZENoaWxkKGdldENvbnN1bWFibGVzRWxlbWVudCgpKTtcblxuICAgICAgICBpbml0aWFsaXNlQ291cnNlRWxlbWVudCgpO1xuICAgICAgICBnZXRNZW51RWxlbWVudCgpLmFwcGVuZENoaWxkKGdldENvdXJzZUVsZW1lbnQoKSk7XG4gICAgICAgIGdldENvdXJzZUVsZW1lbnQoKS5hcHBlbmRDaGlsZChnZXRIZWFkaW5nTWFpbkVsZW1lbnQoKSk7XG4gICAgICAgIGJ1aWxkQ29uc3VtYWJsZXNFbGVtZW50KCdNYWluJyk7XG4gICAgICAgIGdldENvdXJzZUVsZW1lbnQoKS5hcHBlbmRDaGlsZChnZXRDb25zdW1hYmxlc0VsZW1lbnQoKSlcbiAgICB9XG5cbiAgICByZXR1cm4geyBidWlsZENvbnN1bWFibGVzRWxlbWVudCwgZ2V0TWVudUVsZW1lbnQsIGJ1aWxkTWVudUVsZW1lbnQgfVxufVxuXG5jb25zdCBDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgYnVpbGRNZW51RWxlbWVudCwgZ2V0TWVudUVsZW1lbnQgfSA9IE1lbnVDb250cm9sbGVyKCk7XG4gICAgY29uc3QgeyBtYWtlRWxlbWVudCB9ID0gaHRtbE1peGluKCk7XG5cbiAgICBsZXQgY29udGVudEVsZW1lbnQgPSBtYWtlRWxlbWVudCh7aWQ6ICdjb250ZW50J30pO1xuICAgIGNvbnN0IGFib3V0Q29udGVudCA9IG1ha2VFbGVtZW50KHt0ZXh0OiAnYWJvdXQnfSk7XG4gICAgY29uc3QgY29udGFjdENvbnRlbnQgPSBtYWtlRWxlbWVudCh7dGV4dDogJ2NvbnRhY3QnfSk7XG5cbiAgICBjb25zdCBnZXRDb250ZW50RWxlbWVudCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRFbGVtZW50XG4gICAgfVxuICAgIGNvbnN0IGNyZWF0ZU5ld0NvbnRlbnRFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY29udGVudEVsZW1lbnQgPSBtYWtlRWxlbWVudCh7aWQ6ICdjb250ZW50J30pO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlNZW51Q29udGVudCA9ICgpID0+IHtcbiAgICAgICAgZ2V0Q29udGVudEVsZW1lbnQoKS5hcHBlbmRDaGlsZChnZXRNZW51RWxlbWVudCgpKTtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuYXBwZW5kKGdldENvbnRlbnRFbGVtZW50KCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGdldE1lbnVDb250ZW50ID0gKCkgPT4ge1xuICAgICAgICBidWlsZE1lbnVFbGVtZW50KCk7XG4gICAgICAgIGRpc3BsYXlNZW51Q29udGVudCgpO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlBYm91dENvbnRlbnQgPSAoKSA9PiB7XG4gICAgICAgIGdldENvbnRlbnRFbGVtZW50KCkuYXBwZW5kQ2hpbGQoYWJvdXRDb250ZW50KTtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuYXBwZW5kKGdldENvbnRlbnRFbGVtZW50KCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGdldEFib3V0Q29udGVudCA9ICgpID0+IHtcbiAgICAgICByZXR1cm4gZGlzcGxheUFib3V0Q29udGVudCgpO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlDb250YWN0Q29udGVudCA9ICgpID0+IHtcbiAgICAgICAgZ2V0Q29udGVudEVsZW1lbnQoKS5hcHBlbmRDaGlsZChjb250YWN0Q29udGVudCk7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5LmFwcGVuZChnZXRDb250ZW50RWxlbWVudCgpKVxuICAgIH1cblxuICAgIGNvbnN0IGdldENvbnRhY3RDb250ZW50ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gZGlzcGxheUNvbnRhY3RDb250ZW50KCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzZXRDb250ZW50RWxlbWVudCA9ICgpID0+IHtcbiAgICAgICAgZ2V0Q29udGVudEVsZW1lbnQoKS5yZW1vdmUoKTtcbiAgICAgICAgY3JlYXRlTmV3Q29udGVudEVsZW1lbnQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRDb250ZW50ID0gKGNvbnRlbnQpID0+IHtcbiAgICAgICAgaWYgKGNvbnRlbnQgPT09ICdtZW51Jykge1xuICAgICAgICAgICAgZ2V0TWVudUNvbnRlbnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZW50ID09PSAnYWJvdXQnKSB7XG4gICAgICAgICAgICBnZXRBYm91dENvbnRlbnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZW50ID09PSAnY29udGFjdCcpIHtcbiAgICAgICAgICAgIGdldENvbnRhY3RDb250ZW50KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGluaXRpYWxpc2VDb250ZW50ID0gKCkgPT4ge1xuICAgICAgICBnZXRNZW51Q29udGVudCgpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc2V0Q29udGVudEVsZW1lbnQsXG4gICAgICAgIGdldENvbnRlbnQsXG4gICAgICAgIGluaXRpYWxpc2VDb250ZW50LFxuICAgIH1cbn1cblxuY29uc3QgTmF2aWdhdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIHJlc2V0Q29udGVudEVsZW1lbnQsXG4gICAgICAgIGdldENvbnRlbnQsXG4gICAgICAgIGluaXRpYWxpc2VDb250ZW50LFxuICAgIH0gPSBDb250ZW50KCk7XG5cbiAgICBjb25zdCBpbml0aWFsaXNlTGFuZGluZ1BhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGluaXRpYWxpc2VDb250ZW50KCk7XG4gICAgfVxuICAgIGNvbnN0IGluaXRpYWxpc2VOYXZpZ2F0aW9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbmF2JylcbiAgICAgICAgY29uc3QgbmF2SXRlbXMgPSBuYXZFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpXG4gICAgICAgIG5hdkl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc2V0Q29udGVudEVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBnZXRDb250ZW50KGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLW5hdmlnYXRpb24nKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgaW5pdGlhbGlzZUxhbmRpbmdQYWdlLCBpbml0aWFsaXNlTmF2aWdhdGlvbiB9XG59XG5jb25zdCBodG1sTWl4aW4gPSAoKSA9PiB7XG5cbiAgICAvLyBtYWtlRWxlbWVudCBjdXJyZW50bHkgb25seSBtYWtlcyBhIGRpdiwgYnV0IHdoYXQgaWYgd2Ugd2FudCBpdCB0byBiZSBkeW5hbWljXG4gICAgLy8gYW5kIGZvciBpdCB0byBhY2NlcHQgYW55IGh0bWwgZWxlbWVudCB0eXBlIGFuZCBjcmVhdGUgdGhhdCBkeW5hbWljYWxseT9cblxuICAgIC8vIHdlbGwgdGhhdCBnb3QgdWdseSBmYXN0LCBoYXZlIHRvIGFkZCBhIGNvbmRpdGlvbiBvdGhlcndpc2UgZW1wdHkgaWQgYW5kIGNsYXNzZXMgZ2V0IGFzc2lnbmVkIHVuZGVmaW5lZFxuICAgIC8vIHRoaXMgcGF0dGVybiBpcyBva2F5IGZvciBoYW5kbGluZyBvYmplY3RzIHdpdGggcHJvcGVydGllcyBhcyB1bmRlZmluZWQgcHJvcGVydGllcyBhcmUgdHJ1bHkgdW5kZWZpbmVkXG4gICAgLy8gd2hlcmVhcyBET00gb2JqZWN0cyB0YWtlICd1bmRlZmluZWQnIGFzIGEgc3RyaW5nXG4gICAgY29uc3QgbWFrZUVsZW1lbnQgPSAob2JqID0ge30pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBvYmpbJ2lkJ10gPT09IHZvaWQoMCkgPyBlbGVtZW50LmlkIDogZWxlbWVudC5pZCA9IG9ialsnaWQnXTtcbiAgICAgICAgb2JqWydjbGFzcyddID09PSB2b2lkKDApID8gIGVsZW1lbnQuY2xhc3NMaXN0IDogZWxlbWVudC5jbGFzc0xpc3QgPSBvYmpbJ2NsYXNzJ107XG4gICAgICAgIG9ialsndGV4dCddID09PSB2b2lkKDApID8gZWxlbWVudC50ZXh0Q29udGVudCA6IGVsZW1lbnQudGV4dENvbnRlbnQgPSBvYmpbJ3RleHQnXTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRcbiAgICB9XG5cbiAgICBjb25zdCBtYWtlSGVhZGluZyA9ICh0aXRsZSkgPT4ge1xuICAgICAgICBjb25zdCBoZWFkaW5nRWxlbWVudCA9IG1ha2VFbGVtZW50KHtjbGFzczogJ2hlYWRpbmcnfSk7XG4gICAgICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICBoZWFkaW5nLnRleHRDb250ZW50ID0gdGl0bGVcbiAgICAgICAgaGVhZGluZ0VsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGluZylcbiAgICAgICAgcmV0dXJuIGhlYWRpbmdFbGVtZW50XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgbWFrZUVsZW1lbnQsIG1ha2VIZWFkaW5nIH1cbn1cblxuY29uc3QgbWFpbiA9ICgoKSA9PiB7XG4gICAgY29uc3QgbmF2ID0gTmF2aWdhdGlvbigpO1xuICAgIG5hdi5pbml0aWFsaXNlTGFuZGluZ1BhZ2UoKTtcbiAgICBuYXYuaW5pdGlhbGlzZU5hdmlnYXRpb24oKTtcblxuICAgIHJldHVybiB7fVxufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/food.json":
/*!***********************!*\
  !*** ./src/food.json ***!
  \***********************/
/***/ ((module) => {

module.exports = JSON.parse('[{"name":"Chicken Wing","description":"Deep fried specially made chicken wing","price":"9.80","course":"Starter"},{"name":"Mini Spring Roll","description":"Deep fried mini spring rolls, served with sweet chilli sauce","price":"10.80","course":"Starter"},{"name":"Malay Tofu","description":"Crispy yum nom tofu with cucumber, carrots, sesame, sweet chilli sauce. Crispy outside and soft inside","price":"12.80","course":"Starter"},{"name":"Hand-made Wonton","description":"Crunchy golden brown chicken prawn wonton","price":"10.80","course":"Starter"},{"name":"Satay Chicken","description":"Flavor-marinated chicken skewers with peanut sauce","price":"13.80","course":"Starter"},{"name":"Golden Chips","description":"Yes, crispy golden chips","price":"5.00","course":"Starter"},{"name":"Roti Canai","description":"Selection of Curry Chicken/Vege/Lamb simmered in coconut-milk-based broth or Beef Rendang, a flavored rich dry curry cooked together with a spice paste and coconut milk, served with 2 pieces of roti.","price":"16.80","course":"Main"},{"name":"Laksa Soup","description":"Coconut-based spicy soup","price":"19.80","course":"Main"},{"name":"Maggi Mee Goreng","description":"Prawns or Chicken stir-fried spring noodles flavoured with Malayasian spices","price":"20.80","course":"Main"}]');

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