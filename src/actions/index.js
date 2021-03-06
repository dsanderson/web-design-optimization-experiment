export const UPDATE_SCATTERPLOT_CONTROLS = "UPDATE_SCATTERPLOT_CONTROLS";
export const SELECT_POINT = "SELECT_POINT";
export const SET_WEIGHT = "SET_WEIGHT";
export const UPDATE_GRID = "UPDATE_GRID";
export const UPDATE_PARETO_VALUES = "UPDATE_PARETO_VALUES";
export const UPDATE_PARETO_SELECTED = "UPDATE_PARETO_SELECTED";
export const SET_DIRECT = "SET_DIRECT";
export const FETCH_DESIGNS_THUNK = "FETCH_DESIGNS_THUNK";
export const FETCH_DESIGNS_SUCCESS = "FETCH_DESIGNS_SUCCESS";

export const selectPoint = (pointId) => ({
    type: SELECT_POINT,
    pointId: pointId
});

export const updateScatterplotControls = (xAxis, yAxis) => ({
    type: UPDATE_SCATTERPLOT_CONTROLS,
    xAxis: xAxis,
    yAxis: yAxis
});

export const setWeight = (key, weight) => ({
    type: SET_WEIGHT,
    key: key,
    weight: weight
})

export const updateGrid = (key, value, min, max, points) => ({
    type: UPDATE_GRID,
    key: key,
    value: value,
    min: min,
    max: max,
    points: points
})

export const updateParetoValues = (key, value) => ({
    type: UPDATE_PARETO_VALUES,
    key: key,
    value: value
})

export const updateParetoSelected = (value) => ({
    type: UPDATE_PARETO_SELECTED,
    value: value
})

export const setDirect = (key, value) => ({
    type: SET_DIRECT,
    key: key,
    value: value
})

export const fetchDesignsThunk = (state) => { return dispatch => {
    console.log("fetching designs");
    console.log(state);
    let url = '/designs'
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(state),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {return response.json()})
        .then(function (response) {
            dispatch({"type":FETCH_DESIGNS_SUCCESS, "data":response}) 
        })
}}