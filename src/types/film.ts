import { FilmCardItem } from "@/services/film_api";

export type HomeFilmSection = {
  data: FilmCardItem[];
  endpoint: string;
  key: string;
  title: string;
};
