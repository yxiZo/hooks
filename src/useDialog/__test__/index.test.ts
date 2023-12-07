import { expect, test, describe } from "bun:test";
import { act, renderHook } from "@testing-library/react";
import useDialog from "../index.ts";
test("2 + 2", () => {
    expect(2 + 2).toBe(4);
});
test("2 * 2", async () => {
    const result = await Promise.resolve(2 * 2);
    expect(result).toEqual(4);
});
describe("dsadas", () => {
    describe("arithmetic", () => {
        test("2 + 2", () => {
            expect(2 + 2).toBe(4);
        });

        test("2 * 2", () => {
            expect(2 * 2).toBe(4);
        });
    });
})
describe("useDialog", () => {
    test('数字加1', async () => {
        const { result } = renderHook(() => useDialog({
            visible: false
        }))

        expect(result.current.state).toEqual({ visible: false });
        //
        act(() => {
            result.current.open({})
        })
        //
        expect(result.current.state).toEqual({ visible: true })
    })
})