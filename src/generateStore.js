export default function generateStore() {
    let data = {};
    data.keys = ["Size", "Inlet Size", "Environmental Risk", "Capacity", "Cost"];
    data.grid = {"Size":{"value":[0.0,100.0], "min":0.0, "max":100.0, "points":10},
                "Inlet Size":{"value":[0.0,100.0], "min":0.0, "max":100.0, "points":10}};
    data.gridKeys = ["Size", "Inlet Size"];
    data.weights = {"Environmental Risk":0, "Capacity":0, "Cost":0};
    data.pareto = [50, 50, 50];
    data.paretoSelected = 0;
    data.paretoKeys = ["Environmental Risk", "Capacity", "Cost"];
    data.direct = {"Size":50, "Inlet Size":50};
    data.axes = [0, 1];
    data.data = [];//[{"Size":0, "Inlet Size":0, "Environmental Risk":0, "Capacity":0, "Cost":0}];
    const url = window.location.hash;
    console.log(url);
    let type = url.split("-")[0];
    if (type === "") {
        type = "#optimum";
    }
    data.type = type;
    data.id = url;
    return data
}