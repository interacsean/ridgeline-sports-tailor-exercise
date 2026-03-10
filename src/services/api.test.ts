import { describe, it, expect, vi, beforeEach } from "vitest";
import { api } from "./api";

describe("api client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("makes a GET request and returns parsed JSON", async () => {
    const mockData = { id: "1", name: "Test" };

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await api.get("/test");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/test"),
      expect.objectContaining({ method: "GET" })
    );
    expect(result).toEqual(mockData);
  });

  it("throws the error body when response is not ok", async () => {
    const errorBody = {
      error: { code: "VALIDATION_ERROR", message: "Something went wrong" },
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      json: async () => errorBody,
    } as Response);

    await expect(api.get("/fail")).rejects.toEqual(errorBody);
  });
});
