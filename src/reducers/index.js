import { UPDATE_SCATTERPLOT_CONTROLS, SELECT_POINT, SET_WEIGHT, UPDATE_GRID, UPDATE_PARETO_VALUES, UPDATE_PARETO_SELECTED, SET_DIRECT, FETCH_DESIGNS_SUCCESS } from '../actions';

const updateScatterplotControls = (state, action) => {
    let newState = {...state};
    const { xAxis, yAxis } = action;
    newState.axes = [xAxis, yAxis];
    //console.log(xAxis, yAxis)
    return newState
}

const selectPoint = (state, action) => {
    let newState = {...state};
    const { pointId } = action;
    newState.pointId = pointId;
    return newState
}

const setWeight = (state, action) => {
    let newState = {...state};
    const { key, weight } = action;
    newState.weights[key] = weight;
    return newState
}

const updateGrid = (state, action) => {
    let newState = {...state};
    const { key, value, min, max, points } = action;
    newState.grid[key] = {value:value, min:min, max:max, points:points};
    return newState
}

const updateParetoValues = (state, action) => {
    let newState = {...state};
    const { key, value } = action;
    newState.pareto[key] = value;
    return newState
}

const updateParetoSelected = (state, action) => {
    let newState = {...state};
    const { value } = action;
    newState.paretoSelected = value;
    return newState
}

const setDirect = (state, action) => {
    let newState = {...state};
    const { key, value } = action;
    newState.direct[key] = value;
    return newState
}

const fetchDesignsSuccess = (state, action) => {
    let newState = {...state};
    const { data } = action;
    newState.data = [...newState.data, ...data]
    return newState
}

export default (state={}, action) => {
    const { type } = action;
    switch (type) {
        case UPDATE_SCATTERPLOT_CONTROLS:
            return updateScatterplotControls(state, action)
        case SELECT_POINT:
            return selectPoint(state, action)
        case SET_WEIGHT:
            return setWeight(state, action)
        case UPDATE_GRID:
            return updateGrid(state, action)
        case UPDATE_PARETO_VALUES:
            return updateParetoValues(state, action)
        case UPDATE_PARETO_SELECTED:
            return updateParetoSelected(state, action)
        case FETCH_DESIGNS_SUCCESS:
            return fetchDesignsSuccess(state, action)
        case SET_DIRECT:
            return setDirect(state, action)
        default:
            return state
    }
}