export default function generateStore() {
    let data = {};
    data.keys = ["Width", "Height", "Operating Cost", "Throughput", "Capital Cost"];
    data.grid = {"Width":{"value":[0.0,100.0], "min":0.0, "max":100.0, "points":10},
                "Height":{"value":[0.0,100.0], "min":0.0, "max":100.0, "points":10}};
    data.gridKeys = ["Width", "Height"];
    data.weights = {"Width":0, "Height":0, "Operating Cost":0, "Throughput":0, "Capital Cost":0};
    data.pareto = [50, 50, 50];
    data.paretoSelected = 0;
    data.paretoKeys = ["Operating Cost", "Throughput", "Capital Cost"];
    data.direct = {"Width":50, "Height":50};
    data.axes = [0, 1];
    data.data = [{"Width":1.0, "Height":1.0, "Operating Cost":1.0, "Throughput":1.0, "Capital Cost":1.0}];
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