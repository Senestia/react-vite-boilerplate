import { wizardHttp } from "~/shared/utils/http"
import { toHttpError } from "~/shared/utils/httpError"
import type { Spell } from "../types"

export interface SearchSpellsParams {
  search?: string
  type?: string
  pageSize?: number
}

async function searchSpells(params: SearchSpellsParams = {}): Promise<Spell[]> {
  try {
    const { search = "", type = "", pageSize } = params
    const path = "/Spells"

    const queryParams: Record<string, string | number> = {}
    if (search.trim()) queryParams["Name"] = search.trim()
    if (type.trim()) queryParams["Type"] = type.trim()
    if (typeof pageSize === "number" && pageSize > 0)
      queryParams["PageSize"] = pageSize

    const { data } = await wizardHttp.get<unknown>(path, {
      params: queryParams,
    })

    const list: unknown[] = Array.isArray(data) ? data : []

    return list
      .map((s) =>
        typeof s === "object" && s ? (s as Record<string, unknown>) : null,
      )
      .filter((s): s is Record<string, unknown> => s !== null)
      .map((s) => ({
        id: String(s["id"] ?? ""),
        name: String(s["name"] ?? ""),
        type: String(s["type"] ?? ""),
        effect: String(s["effect"] ?? ""),
        incantation: String(s["incantation"] ?? ""),
      }))
  } catch (error) {
    throw toHttpError(error)
  }
}

export const wizardRepository = {
  searchSpells,
}
