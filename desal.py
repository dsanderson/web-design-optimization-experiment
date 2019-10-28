from gpkit import Model, Variable, SignomialsEnabled, VarKey, units
import numpy as np
import copy

class Disal(Model):
    def setup(self):
        size = Variable("size", "m", "size")
        inlet_hole_size = Variable("inlet_hole_size", "m", "inlet_hole_size")
        capacity = size*inlet_hole_size
        cost = size/(0.5*inlet_hole_size)

        constraints = [inlet_hole_size>=0.0,
                        size>=inlet_hole_size,
                        inlet_hole_size<=size/100.0,
                        size<=100.0]
        
        return constraints

def optimum(target_danger, target_capacity, target_cost):
    size = Variable("size")
    inlet_hole_size = Variable("inlet_hole_size")
    capacity = size*inlet_hole_size
    danger = capacity*inlet_hole_size
    cost = size/(0.5*inlet_hole_size)

    constraints = [inlet_hole_size>=0.0001,
                    size>=inlet_hole_size,
                    size<=100.0]
    
    constraints += [danger <= target_danger,
                    capacity >= target_capacity,
                    cost <= target_cost]

    objective = 1/size

    m = Model(objective, constraints)

    #m.debug()

    sol = m.solve()

    sol_cap = sol["variables"]["size"]*sol["variables"]["inlet_hole_size"]

    res = {"size":sol["variables"]["size"],
     "inlet_hole_size":sol["variables"]["inlet_hole_size"],
     "danger": sol_cap*sol["variables"]["inlet_hole_size"],
     "capacity": sol_cap,
     "cost":sol["variables"]["size"]/(0.5*sol["variables"]["inlet_hole_size"])}

    return res

def direct(inlet_hole_size, size):
    capacity = size*inlet_hole_size
    danger = capacity*inlet_hole_size
    cost = size/(0.5*inlet_hole_size)

    res = {"size":size,
     "inlet_hole_size":inlet_hole_size,
     "danger": danger,
     "capacity": capacity,
     "cost":cost}

    return res

def grid(inlet_hole_sizes, sizes):
    ress = []
    for ihs in inlet_hole_sizes:
        for size in sizes:
            ress.append(direct(ihs, size))

    return ress

def pareto(dangers, capacities, costs):
    ress = []
    size = Variable("size")
    inlet_hole_size = Variable("inlet_hole_size")
    capacity = size*inlet_hole_size
    danger = capacity*inlet_hole_size
    cost = size/(0.5*inlet_hole_size)

    constraints = [inlet_hole_size>=0.0001,
                    size>=inlet_hole_size,
                    size<=100.0]
    
    npts = 10

    if len(dangers) == 1:
        constraints += [danger <= dangers[0]]
        objective = capacity/cost
        m = Model(objective, constraints)
        sols = m.sweep({"size": np.linspace(9.0,11.0,npts)})
    elif len(capacities) == 1:
        constraints += [capacity <= capacities[0]]
        objective = 1/(danger*cost)
        m = Model(objective, constraints)
        sols = m.sweep({"size": np.linspace(9.0,11.0,npts)})
    elif len(costs) == 1:
        constraints += [cost <= costs[0]]
        objective = capacity/danger
        m = Model(objective, constraints)
        sols = m.sweep({"size": np.linspace(9.0,11.0,npts)})
    for i in range(0,npts):
        sol_cap = sols["variables"]["size"][i]*sols["variables"]["inlet_hole_size"][i]

        res = {"size":sols["variables"]["size"][i],
        "inlet_hole_size":sols["variables"]["inlet_hole_size"][i],
        "danger": sol_cap*sols["variables"]["inlet_hole_size"][i],
        "capacity": sol_cap,
        "cost":sols["variables"]["size"][i]/(0.5*sols["variables"]["inlet_hole_size"][i])}
        ress.append(copy.deepcopy(res))
    
    return ress

if __name__ == '__main__':
    res = optimum(10.0, 10.0, 20.0)
    print("optimum: ", res)
    res = direct(1.0, 10.0)
    print("direct: ", res)
    res = grid([0.9,1.0,1.1],[9.0,10.0,11.0])
    print("grid: ", res)
    res = pareto([10.0], [9.0,11.0], [9.0, 11.0])
    print("pareto: ", res)