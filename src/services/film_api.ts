import axios from "@/config/axios";

export type FilmCardItem = {
  id: string;
  posterUrl: string | null;
  subtitle: string;
  title: string;
};

type FilmApiResponse = {
  data: unknown;
  error: null | string;
  message: string;
  success: boolean;
};

const toFilmCardItem = (
  item: Record<string, unknown>,
  index: number,
): FilmCardItem => {
  const title =
    String(
      item.name ??
        item.title ??
        item.origin_name ??
        item.movie_name ??
        item.slug ??
        `Film ${index + 1}`,
    ) || `Film ${index + 1}`;

  const subtitleParts = [
    item.year ? String(item.year) : null,
    item.quality ? String(item.quality) : null,
    item.lang ? String(item.lang) : null,
  ].filter(Boolean);

  const posterCandidate =
    item.poster_url ??
    item.thumb_url ??
    item.image ??
    item.poster ??
    item.thumb ??
    null;

  return {
    id: String(item._id ?? item.id ?? item.slug ?? `${title}-${index}`),
    posterUrl: posterCandidate ? String(posterCandidate) : null,
    subtitle: subtitleParts.join(" | "),
    title,
  };
};

const normalizeFilmItems = (payload: unknown): FilmCardItem[] => {
  if (Array.isArray(payload)) {
    return payload
      .filter(
        (item): item is Record<string, unknown> =>
          !!item && typeof item === "object",
      )
      .map(toFilmCardItem);
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const nestedArrayKeys = ["items", "movies", "movie", "results", "data"];

    for (const key of nestedArrayKeys) {
      const nestedValue = record[key];
      if (Array.isArray(nestedValue)) {
        return nestedValue
          .filter(
            (item): item is Record<string, unknown> =>
              !!item && typeof item === "object",
          )
          .map(toFilmCardItem);
      }
    }
  }

  return [];
};

export const getFilmCollection = async (
  path: string,
): Promise<FilmCardItem[]> => {
  const response = await axios.get<FilmApiResponse>(path);
  return normalizeFilmItems(response.data.data);
};
