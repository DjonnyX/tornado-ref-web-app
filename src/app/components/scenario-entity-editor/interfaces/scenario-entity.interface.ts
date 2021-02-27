import { IScenario } from "@djonnyx/tornado-types";

export interface IScenarioEntity {
    active?: boolean;
    scenarios: Array<IScenario>;
}