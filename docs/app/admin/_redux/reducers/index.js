
import { combineReducers } from 'redux';

/* imports */

import authenticated, * as fromAuthenticated from './authenticated';

import loader, * as fromLoader from './loading';

import buckets, * as fromBucketsForm from './buckets';

import languages, * as fromLanguagesForm from './languages';

import pages, * as fromPagesForm from './pages';

import menus, * as fromMenusForm from './menus';

import indications, * as fromIndicationsForm from './indications';

import regions, * as fromRegionsForm from './regions';

import users, * as fromUsersForm from './users';

import roles, * as fromRolesForm from './roles';

import clipboard, * as fromClipboard from './clipboard';

import materials, * as fromMaterialsForm from './materials';

import resources, * as fromResourcesForm from './resources';

import references, * as fromReferencesForm from './references';

import contactform, * as fromContactForm from './contactform';

import images, * as fromImagesForm from './images';

import categories, * as fromCategoriesForm from './categories';

import subcategories, * as fromSubcategories from './subcategories';

import hashes, * as fromHashesForm from './hashes';

import activitywall, * as fromActivityWallForm from './activitywall';

import supportGroups, * as fromSupportGroupsForm from './supportgroups';

import globalLogger, * as fromGlobalLogger from '../../components/notifications/notification-reducer';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

const node = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';

/* imports */

const reducers = {
    /* combine */
    pages,
    menus,
    loader,
    authenticated,

    globalLogger,

    buckets,
    languages,
    indications,
    regions,
    users,
    roles,
    materials,
    resources,
    references,
    images,
    categories,
    subcategories,
    hashes,
    activitywall,
    supportGroups,
    contactform,
    clipboard,
    /* combine */
};

if ( ! node ) {

    reducers.router = routerReducer;
}

export default combineReducers(reducers);




/* selectors */

export const getHasRole = (state, role) =>
    fromAuthenticated.getHasRole(state.authenticated, role)
;

export const getAuthenticated = state =>
    fromAuthenticated.getAuthenticated(state.authenticated)
;

export const getUser = state =>
    fromAuthenticated.getUser(state.authenticated)
;

export const getUsername = state =>
    fromAuthenticated.getUsername(state.authenticated)
;

/* clipboard */

export const getClipboard = state =>
    fromClipboard.getClipboard(state.clipboard)
;

/* references */

export const getReferences = state =>
    fromReferencesForm.getReferences(state.references)
;

/* roles */

export const getRoles = state =>
    fromRolesForm.getRoles(state.roles)
;

export const getRoleById = (state, id) =>
    fromRolesForm.getRoleById(state.roles, id)
;

export const getLoginError = state =>
    fromAuthenticated.getLoginError(state.authenticated)
;

export const getLoaderStatus = state =>
    fromLoader.getLoaderStatus(state.loader)
;

export const getLoading = state =>
    fromLoader.getLoading(state.loader)
;

export const getLoaderMsg = state =>
    fromLoader.getLoaderMsg(state.loader)
;

export const getLoaderButtonVisible = state =>
    fromLoader.getLoaderButtonVisible(state.loader)
;

// BUCKETS
export const getBuckets = state =>
    fromBucketsForm.getBuckets(state.buckets)
;

export const getBucketsForSelectField = state =>
    fromBucketsForm.getBucketsForSelectField(state.buckets)
;

export const getBucketsForSelectFieldEnabled = state =>
    fromBucketsForm.getBucketsForSelectFieldEnabled(state.buckets)
;

export const getBucketById = (state, id) =>
    fromBucketsForm.getBucketById(state.buckets, id)
;

export const getBucketsEdit = state =>
    fromBucketsForm.getBucketsEdit(state.buckets)
;

export const getBucketFiltersForSelectField = state =>
    fromBucketsForm.getBucketFiltersForSelectField(state.buckets)
;

export const getBucketsFormError = state =>
    fromBucketsForm.getBucketsFormError(state.buckets)
;

export const getBucketsStatus = state =>
    fromBucketsStatus.getBucketsStatus(state.bucketsStatus)
;

// LANGUAGES
export const getLanguages = state =>
    fromLanguagesForm.getLanguages(state.languages)
;

export const getLanguagesForSelectField = state =>
    fromLanguagesForm.getLanguagesForSelectField(state.languages)
;

export const getLanguageById = (state, id) =>
    fromLanguagesForm.getLanguageById(state.languages, id)
;

export const getLanguagesEdit = state =>
    fromLanguagesForm.getLanguagesEdit(state.languages)
;

export const getLanguagesFormError = state =>
    fromLanguagesForm.getLanguagesFormError(state.languages)
;

export const getLanguagesStatus = state =>
    fromLanguagesStatus.getLanguagesStatus(state.languagesStatus)
;

// PAGES
export const getPages = state =>
    fromPagesForm.getPages(state.pages)
;

export const getPagesForSelectField = state =>
    fromPagesForm.getPagesForSelectField(state.pages)
;

export const getPageById = (state, id) =>
    fromPagesForm.getPageById(state.pages, id)
;

export const getPagesEdit = state =>
    fromPagesForm.getPagesEdit(state.pages)
;

export const getPagesFormError = state =>
    fromPagesForm.getPagesFormError(state.pages)
;

export const getPagesStatus = state =>
    fromPagesStatus.getPagesStatus(state.pagesStatus)
;

// MENUS
export const getMenus = state =>
    fromMenusForm.getMenus(state.menus)
;

export const getMenuById = (state, id) =>
    fromMenusForm.getMenuById(state.menus, id)
;

export const getMenusEdit = state =>
    fromMenusForm.getMenusEdit(state.menus)
;

export const getMenusFormError = state =>
    fromMenusForm.getMenusFormError(state.menus)
;

// INDICATIONS
export const getIndications = state =>
    fromIndicationsForm.getIndications(state.indications)
;

export const getIndicationsForSelectField = state =>
    fromIndicationsForm.getIndicationsForSelectField(state.indications)
;

export const getIndicationById = (state, id) =>
    fromIndicationsForm.getIndicationById(state.indications, id)
;

export const getIndicationsEdit = state =>
    fromIndicationsForm.getIndicationsEdit(state.indications)
;

export const getIndicationsFormError = state =>
    fromIndicationsForm.getIndicationsFormError(state.indications)
;

// REGIONS
export const getRegions = state =>
    fromRegionsForm.getRegions(state.regions)
;

export const getRegionsForSelectField = state =>
    fromRegionsForm.getRegionsForSelectField(state.regions)
;

export const getRegionById = (state, id) =>
    fromRegionsForm.getRegionById(state.regions, id)
;

export const getRegionsEdit = state =>
    fromRegionsForm.getRegionsEdit(state.regions)
;

export const getRegionsFormError = state =>
    fromRegionsForm.getRegionsFormError(state.regions)
;

// USERS
export const getUsers = state =>
    fromUsersForm.getUsers(state.users)
;

export const getUserById = (state, id) =>
    fromUsersForm.getUserById(state.users, id)
;

export const getUsersEdit = state =>
    fromUsersForm.getUsersEdit(state.users)
;

export const getUsersFormError = state =>
    fromUsersForm.getUsersFormError(state.users)
;

export const getUsersStatus = state =>
    fromUsersStatus.getUsersStatus(state.usersStatus)
;

// MATERIALS
export const getMaterials = state =>
    fromMaterialsForm.getMaterials(state.materials)
;

export const getMaterialById = (state, id) =>
    fromMaterialsForm.getMaterialById(state.materials, id)
;

export const getMaterialsIdsInOrder = (state, id) =>
    fromMaterialsForm.getMaterialsIdsInOrder(state.materials, id)
;

export const getMaterialsEdit = state =>
    fromMaterialsForm.getMaterialsEdit(state.materials)
;

export const getMaterialsFormError = state =>
    fromMaterialsForm.getMaterialsFormError(state.materials)
;

export const getMaterialTypesForSelectField = state =>
    fromMaterialsForm.getMaterialTypesForSelectField(state.materials)
;

export const getMaterialsFiltersForSelectField = state =>
    fromMaterialsForm.getMaterialsFiltersForSelectField(state.materials)
;

export const getMaterialsStatus = state =>
    fromMaterialsStatus.getMaterialsStatus(state.materialsStatus)
;

// IMAGES
export const getImagesSavedFlag = state =>
    fromImagesForm.getImagesSavedFlag(state.images)
;

export const getImages = state =>
    fromImagesForm.getImages(state.images)
;

export const getImagesForSelectField = state =>
    fromImagesForm.getImagesForSelectField(state.images)
;

export const getImageById = (state, id) =>
    fromImagesForm.getImageById(state.images, id)
;

export const getImagesEdit = state =>
    fromImagesForm.getImagesEdit(state.images)
;

export const getImagesFormError = state =>
    fromImagesForm.getImagesFormError(state.images)
;



// RESOURCES
export const getResourcesSavedFlag = state =>
    fromResourcesForm.getResourcesSavedFlag(state.resources)
;

export const getResources = state =>
    fromResourcesForm.getResources(state.resources)
;

export const getResourcesForSelectField = state =>
    fromResourcesForm.getResourcesForSelectField(state.resources)
;

export const getResourceById = (state, id) =>
    fromResourcesForm.getResourceById(state.resources, id)
;

export const getResourcesEdit = state =>
    fromResourcesForm.getResourcesEdit(state.resources)
;

export const getResourcesFormError = state =>
    fromResourcesForm.getResourcesFormError(state.resources)
;

// CATEGORIES
export const getCategories = state =>
    fromCategoriesForm.getCategories(state.categories)
;

export const getCategoriesForSelectField = state =>
    fromCategoriesForm.getCategoriesForSelectField(state.categories)
;

export const getCategoryById = (state, id) =>
    fromCategoriesForm.getCategoryById(state.categories, id)
;

export const getCategoriesEdit = state =>
    fromCategoriesForm.getCategoriesEdit(state.categories)
;

export const getCategoriesFormError = state =>
    fromCategoriesForm.getCategoriesFormError(state.categories)
;

export const getCategoriesStatus = state =>
    fromCategoriesStatus.getCategoriesStatus(state.categoriesStatus)
;

export const getNotificationState = state =>
    fromGlobalLogger.getNotificationState(state.globalLogger)
;

// SUBCATEGORIES
export const getSubcategories = state =>
    fromSubcategories.getSubcategories(state.subcategories)
;

export const getSubcategoryById = (state, id) =>
    fromSubcategories.getSubcategoryById(state.subcategories, id)
;

export const getSubcategoriesEdit = state =>
    fromSubcategories.getSubcategoriesEdit(state.subcategories)
;

export const getSubcategoriesError = state =>
    fromSubcategories.getSubcategoriesError(state.subcategories)
;

export const getSubcategoriesStatus = state =>
    fromSubcategoriesStatus.getSubcategoriesStatus(state.subcategoriesStatus)
;

// HASHES
export const getHashes = state =>
    fromHashesForm.getHashes(state.hashes)
;

export const getHashById = (state, id) =>
    fromHashesForm.getHashById(state.hashes, id)
;

export const getHashesEdit = state =>
    fromHashesForm.getHashesEdit(state.hashes)
;

export const getHashesFormError = state =>
    fromHashesForm.getHashesFormError(state.hashes)
;

export const getHashesStatus = state =>
    fromHashesStatus.getHashesStatus(state.hashesStatus)
;

// ACTIVITYWALL
export const getActivityWall = state =>
    fromActivityWallForm.getActivityWall(state.activitywall)
;

// SUPPORTGROUPS
export const getSupportGroups = state =>
    fromSupportGroupsForm.getSupportGroups(state.supportGroups)
;

export const getSupportGroupById = (state, id) =>
    fromSupportGroupsForm.getSupportGroupById(state.supportGroups, id)
;

export const getSupportGroupsEdit = state =>
    fromSupportGroupsForm.getSupportGroupsEdit(state.supportGroups)
;

export const getSupportGroupsFormError = state =>
    fromSupportGroupsForm.getSupportGroupsFormError(state.supportGroups)
;

export const getSupportGroupsStatus = state =>
    fromSupportGroupsStatus.getSupportGroupsStatus(state.supportGroupsStatus)
;

// CONTACT FORM
export const getContactForm = state =>
    fromContactForm.getContactForm(state.contactform)
;

export const getContactFormCountUnred = state =>
    fromContactForm.getContactFormCountUnred(state.contactform)
;

export const getContactFormById = (state, id) =>
    fromContactForm.getContactFormById(state.contactform, id)
;

export const getContactFormEdit = state =>
    fromContactForm.getContactFormEdit(state.contactform)
;

export const getContactFormError = state =>
    fromContactForm.getContactFormError(state.contactform)
;

/* selectors */
