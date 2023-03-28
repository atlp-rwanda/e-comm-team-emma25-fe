import { sum, subtract, multiply } from "../calculator";
describe("Simple Calculation Tests", () => {
    it("It should return sum correctly", () => {
        expect(sum(2, 3)).toBe(5);
    });
    it("It should return product of given numbers correctly", () => {
        expect(multiply(2, 3)).toBe(6);
    });
    it("It should return difference of given numbers correctly", () => {
        expect(subtract(5,2)).toBe(3);
    });
});